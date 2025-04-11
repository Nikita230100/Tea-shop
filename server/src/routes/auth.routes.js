const express = require('express');
const authRouter = express.Router();
const AuthController = require('../controllers/authController');

// Регистрация
authRouter.post('/signup', AuthController.signUp);

// Вход
authRouter.post('/signin', AuthController.signIn);

// Выход
authRouter.get('/logout', AuthController.logout);

module.exports = authRouter;