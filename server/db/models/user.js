'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Tea, Favorite}) {
      this.hasMany(Tea, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(Tea, {
        through: Favorite,    // Промежуточная таблица
        foreignKey: 'userId', // Поле в Favorite, ссылающееся на User
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};