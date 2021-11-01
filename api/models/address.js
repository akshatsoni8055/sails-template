'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Business }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user' });
      this.belongsTo(Business, { foreignKey: 'user' });

    }
  };
  Address.init({
    apartmentNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    colony: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    landmark: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses'
  });
  return Address;
};