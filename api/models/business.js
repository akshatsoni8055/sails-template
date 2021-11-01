'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, BusinessCategory, Session}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'owner'});
      this.belongsTo(BusinessCategory, {foreignKey: 'category'});
      this.hasMany(Session, {foreignKey: 'whom'});
    }
  }
  Business.init({
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pic: {
      type: DataTypes.STRING
    },
    cover: {
      type: DataTypes.STRING
    },
    timing: {
      type: DataTypes.JSON,
      defaultValue: {
        mon: '9:00 AM-6:00 PM',
        tue: '9:00 AM-6:00 PM',
        wed: '9:00 AM-6:00 PM',
        thu: '9:00 AM-6:00 PM',
        fri: '9:00 AM-6:00 PM',
        sat: null,
        sun: null,
      }
    }
  }, {
    sequelize,
    modelName: 'Business',
    tableName: 'businesses'
  });
  return Business;
};
