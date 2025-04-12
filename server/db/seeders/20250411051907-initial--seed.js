'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin123', 10); // Хешируем пароль
    
    // Создаём пользователя
    const [userId] = await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword, // Используем свежий хеш
      createdAt: new Date(),
      updatedAt: new Date()
    }], {
      returning: ['id']
    });

    // Теперь добавляем чаи с корректным userId
    await queryInterface.bulkInsert('Teas', [
      {
        name: 'Зеленый чай Сенча',
        type: 'Зеленый',
        description: 'Классический японский зеленый чай с освежающим вкусом.',
        compound: 'Чай зеленый Сенча.',
        userId: 1, // Используем полученный ID
        price: 150,
        image: 'tea1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Черный чай Эрл Грей',
        type: 'Черный',
        description: 'Ароматный черный чай с бергамотом.',
        compound: 'Чай черный, масло бергамота.',
        userId: 1, // ID пользователя-администратора
        price: 180,
        image: 'tea2.jpg',
        createdAt: new Date(), // Добавлено
        updatedAt: new Date()  // Добавлено
      },
      // ... остальные чаи
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {});
    await queryInterface.bulkDelete('Teas', null, {});
  }
};