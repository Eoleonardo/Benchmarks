const { Sequelize } = require('sequelize');

module.exports = new Sequelize('tcc', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});
