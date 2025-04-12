const express = require('express');
const router = express.Router();
const { Favorite, User, Tea } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

// Добавить/удалить из избранного
router.post('/tea/:teaId/likes', verifyAccessToken, async (req, res) => {
  try {
    const { teaId } = req.params;
    const { id: userId } = res.locals.user;

    const [favorite, created] = await Favorite.findOrCreate({
      where: { userId, teaId },
      defaults: { userId, teaId }
    });

    if (!created) {
      await favorite.destroy();
      return res.status(200).json({ removed: true });
    }

    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
 
});

// Получить избранное пользователя
router.get('/my', verifyAccessToken, async (req, res) => {
  try {
    const { id: userId } = res.locals.user;

    const favorites = await Favorite.findAll({
      where: { userId },
      include: [{
        model: Tea,
        attributes: ['id', 'name', 'image', 'price']
      }]
    });

    res.status(200).json(favorites.map(f => f.Tea));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;