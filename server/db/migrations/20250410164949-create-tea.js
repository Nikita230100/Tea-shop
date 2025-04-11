'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      compound: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      userId: {
        allowNull:  false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      image: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      createdAt: {
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teas');
  }
};