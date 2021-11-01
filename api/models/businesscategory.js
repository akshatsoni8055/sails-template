'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Business }) {
      // define association here
      this.hasMany(Business, { foreignKey: 'category' });
    }
  }
  BusinessCategory.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'BusinessCategory',
    tableName: 'business_categories'
  });
  return BusinessCategory;
};
