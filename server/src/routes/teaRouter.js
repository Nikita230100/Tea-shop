const { verifyAccessToken } = require('../middlewares/verifyToken');
const teaRouter = require('express').Router();
const TeaController = require('../controllers/teaController');

// Получить все чаи
teaRouter.get('/', TeaController.getAll);

// Получить один чай по ID
teaRouter.get('/:id', TeaController.getOne);


teaRouter.put('/:id', verifyAccessToken, TeaController.update);


// Получить несколько чаёв по ID (через запятую)
teaRouter.get('/favorites/:ids', TeaController.getFavs);

// Создать новый чай (с проверкой авторизации)
teaRouter.post('/', verifyAccessToken, TeaController.create);

// Удалить чай (с проверкой авторизации)
teaRouter.delete('/:id', verifyAccessToken, TeaController.delete);

module.exports = teaRouter;