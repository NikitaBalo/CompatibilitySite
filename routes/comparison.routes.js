const {Router} = require('express')
const {check, validationResult} = require("express-validator");
const compareAnimal = require("../functions/compatibility.table");
const getAnimal = require("../functions/animal.table");
const router = Router()

router.post('/compatibility/human',
    [
        check('date1', 'Дата введена некорректно! 1').exists(),
        check('date2', 'Дата введена некорректно! 2').exists()
    ],
    async (req, response) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    error: errors.array(),
                    message: 'Отправленные данные не прощли проверку!'
                })
            }

            const {date1, date2} = req.body

            const humanFirst = getAnimal(parseInt(date1))
            const humanSecond = getAnimal(parseInt(date2))

            if (!humanFirst) {
                return response.status(500).json({message: "На сервере произошла ошибка!"})
            }
            if (!humanSecond) {
                return response.status(500).json({message: "На сервере произошла ошибка!"})
            }

            const compatible = compareAnimal(humanFirst, humanSecond)

            response.json({
                compatibility: compatible,
            })
        } catch (error) {
            return response.status(500).json({message: error.message})
        }
    })

module.exports = router