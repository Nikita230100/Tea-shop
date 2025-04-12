'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Favorite }) {
      this.belongsTo(User, {
        foreignKey: 'userId',  
      });
      this.belongsToMany(User, {
        through: Favorite,     // Промежуточная таблица
        foreignKey: 'teaId',   // Поле в Favorite, ссылающееся на Tea
      });
    }
  }
  Tea.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    compound: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    createdAt: DataTypes.DATE, 
    updatedAt: DataTypes.DATE  
  }, {
    sequelize,
    modelName: 'Tea',
     tableName: 'Teas'
  });
  return Tea;
};