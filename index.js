const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const comentsRouter = require('./routes/massage');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/coments', comentsRouter);

async function start () {
    try{
        await mongoose.connect('mongodb+srv://Fedir:12345@cluster0-4y9bx.mongodb.net/massage', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('run');
        })
    } catch (err) {
        console.log(err)
    }
}

start();
