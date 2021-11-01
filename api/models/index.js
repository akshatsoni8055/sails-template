'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env =  'development';
const config = require(__dirname + `/../../config/datastores`)[env];

function parseDbUrl(url) {
  const pattern = /^(?:([^:\/?#\s]+):\/{2})?(?:([^@\/?#\s]+)@)?([^\/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/;
  const matches = url.match(pattern);

  return {
    dialect: matches[1],
    username: matches[2] !== undefined ? matches[2].split(':')[0] : undefined,
    password: matches[2] !== undefined ? matches[2].split(':')[1] : undefined,
    host: matches[3] !== undefined ? matches[3].split(/:(?=\d+$)/)[0] : undefined,
    port: matches[3] !== undefined ? matches[3].split(/:(?=\d+$)/)[1] : undefined,
    database: matches[4] !== undefined ? matches[4].split('/')[0] : undefined,
  };
}

const db = {};
let sequelize;
if (config.use_env_variable) {
  const dbo = parseDbUrl(process.env[config.use_env_variable]);
  sequelize = new Sequelize(dbo.database, dbo.username, dbo.password, { ...dbo, ...config });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
