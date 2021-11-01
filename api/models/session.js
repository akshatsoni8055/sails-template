'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Business}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'with'});
      this.belongsTo(Business, {foreignKey: 'whom'});

    }
  }
  Session.init({
    with: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    whom: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Session',
    tableName: 'sessions'
  });
  return Session;
};
