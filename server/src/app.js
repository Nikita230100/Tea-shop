const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const corsConfig = require('./configs/cors.config');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const tokenRouter = require('./routes/tokenRouter');
const teaRouter = require('./routes/teaRouter');
const favoriteRoutes = require('./routes/favoriteRoutes')
const cartRouter = require('./routes/cartRouter')
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/teas', teaRouter);
app.use('/api/cart', cartRouter);

app.use('/api/favorites', favoriteRoutes);
module.exports = app;