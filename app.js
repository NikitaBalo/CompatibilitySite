const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const locale = require('dayjs/locale/ru')
const dayjs = require("dayjs");
dayjs().locale(locale)

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешаем доступ с любых источников
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Разрешаем определенные HTTP-методы
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешаем определенные заголовки
    next();
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/comparison', require('./routes/comparison.routes'))


const PORT = config.get('port') || 5000

const start = async () => {
    try {
        await mongoose.connect(config.get('databaseURI')).then(() => {
            console.log("Connected to MongoDB");
        }).catch(err => {
            console.error("Error connecting to MongoDB", err);
        });

        app.listen(PORT, () => {
            console.log(`App started on port ${PORT}`)
        })
    } catch (error) {
        console.error('Server ERROR ', error.message)
        process.exit(1)
    }
}

start().then(r => {})

