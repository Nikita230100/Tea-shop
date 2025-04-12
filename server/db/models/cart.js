'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tea }) {
      this.belongsTo(User, {
        foreignKey: 'userId', 
      });
      this.belongsTo(Tea, {
        foreignKey: 'teaId',   
      });
    }
  }
  Cart.init({
    userId: DataTypes.INTEGER,
    teaId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    sum: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};