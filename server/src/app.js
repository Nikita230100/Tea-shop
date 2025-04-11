const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

module.exports = app;