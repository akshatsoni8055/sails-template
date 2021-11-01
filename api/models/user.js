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
    static associate({ Address, Business, Session }) {
      // define association here
      this.hasMany(Address, {foreignKey: 'user', as: 'addresses'});
      this.hasOne(Business, {foreignKey: 'owner'});
      this.hasMany(Session, {foreignKey: 'with'})
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: ['Business', 'Normal'],
      defaultValue: 'Normal',
      allowNull: false
    },
    pic: {
      type: DataTypes.STRING
    },
    contact: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await sails.helpers.passwords.hashPassword(user.password);
    user.password = hashedPassword;
  });
  return User;
};
