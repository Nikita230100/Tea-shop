'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      email: 'admin@example.com',
      password: '$2a$10$X8z5s7nR9uD2vJ1kQYhZf.5Yz3bA1cB2dC3eF4gH5iJ6kL7mN8oP9qR', // Хеш пароля "admin123"
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    // Удаляем пользователя по email (для отката)
    await queryInterface.bulkDelete('Users', {
      email: 'admin@example.com'
    }, {});
  }
};
