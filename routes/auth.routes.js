const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()

router.post('/register',
    [
        check('email', 'Некорректная почта!').isEmail(),
        check('password', 'Минимальная длина пароля - 8 символов!')
            .isLength({min: 8})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: errors.array(),
                    message: 'Не верно введены данные формы!'
                })
            }


            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь существует!'})
            }

            const salt = await bcrypt.genSalt(12)

            const hashedPassword = await bcrypt.hash(password, salt)

            const user = new User({email: email, password: hashedPassword})

            console.log(user)

            await user.save()

            res.status(201).json({message: 'Пользователь создан.'})

        } catch (error) {
            res.status(500).json({
                message: "Что произошло не так при регистрации!",
                detail: error.message
            })
        }
    })

router.post('/login',
    [
        check('email', 'Некорректная почта!').normalizeEmail().isEmail(),
        check('password', 'Введите пароль!').exists()
    ],
    async (req, response) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    error: errors.array(),
                    message: 'Не верно введены данные формы!'
                })
            }


            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return response.status(400).json({message: 'Данные введены не правильно!'})
            }


            await bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                    return response.status(500).json({message: err.message})
                }
                if (res) {

                    const token = jwt.sign(
                        {userId: user.id},
                        config.get('secret'),
                        {expiresIn: '1h'}
                    )

                    response.json({token: token, userId: user.id})
                } else {
                    return response.status(400).json({message: 'Данные введены не правильно!'})
                }
            })
        } catch (error) {
            response.status(500).json({
                message: "Что произошло не так при авторизации!"
            })
        }
    })

module.exports = router