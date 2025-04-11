const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const corsConfig = require('./configs/cors.config');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const tokenRouter = require('./routes/tokenRouter');


const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());

// Регистрация
app.use('/api/auth', authRouter)
app.use('/api/tokens', tokenRouter);


module.exports = app;