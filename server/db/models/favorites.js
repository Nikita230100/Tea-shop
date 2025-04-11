'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tea }) {
      this.belongsTo(User, {
        foreignKey: 'userId',  // Поле в Favorite, ссылающееся на User
      });
      this.belongsTo(Tea, {
        foreignKey: 'teaId',   // Поле в Favorite, ссылающееся на Tea
      });
    }
  }
  Favorites.init({
    userId: DataTypes.INTEGER,
    teaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorites;
};