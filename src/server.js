const express = require('express')

const app = express()

app.get('/', (req, res) => {
    console.log('hello express')
    res.status(200)
    res.json({message: 'hello from inner get /'})
})

module.exports = app;