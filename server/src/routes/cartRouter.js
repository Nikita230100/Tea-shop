const express = require('express');
const router = express.Router();
const { Tea, Cart } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

// Добавление/увеличение количества товара
router.post('/tea/:teaId', verifyAccessToken, async (req, res) => {
  try {
    const { teaId } = req.params;
    const { id: userId } = res.locals.user;
    
    const tea = await Tea.findByPk(teaId);
    if (!tea) return res.status(404).json({ message: 'Tea not found' });

    const [cartItem, created] = await Cart.findOrCreate({
      where: { userId, teaId },
      defaults: { 
        userId, 
        teaId, 
        quantity: 1, 
        sum: tea.price // Используем sum вместо priceAtAddition
      }
    });

    if (!created) {
      cartItem.quantity += 1;
      cartItem.sum = tea.price; // Обновляем сумму при каждом добавлении
      await cartItem.save();
    }

    res.status(200).json(cartItem);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Удаление/уменьшение количества товара
router.delete('/tea/:teaId', verifyAccessToken, async (req, res) => {
    try {
      const { teaId } = req.params;
      const { id: userId } = res.locals.user;
      const { completeRemoval = false } = req.body;
  
      const cartItem = await Cart.findOne({ where: { userId, teaId } });
      
      if (!cartItem) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      if (completeRemoval) {
        // Полное удаление товара
        await cartItem.destroy();
      } else {
        // Уменьшение количества
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
          await cartItem.save();
        } else {
          // Если количество = 1, удаляем запись
          await cartItem.destroy();
        }
      }
  
      res.status(200).json({ message: 'Item updated' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Получение корзины
router.get('/', verifyAccessToken, async (req, res) => {
  try {
    const { id: userId } = res.locals.user;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: {
        model: Tea,
        attributes: ['id', 'name', 'image', 'price']
      }
    });

    const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.sum), 0);

    res.status(200).json({
      items: cartItems,
      total
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/tea/:teaId', verifyAccessToken, async (req, res) => {
    try {
      const { teaId } = req.params;
      const { id: userId } = res.locals.user;
      const { quantity } = req.body;
  
      const cartItem = await Cart.findOne({ 
        where: { userId, teaId },
        include: [Tea]
      });
      
      if (!cartItem) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
  
      res.status(200).json(cartItem);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;