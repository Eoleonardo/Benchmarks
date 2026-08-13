const { Sequelize } = require('sequelize');

module.exports = new Sequelize('clientes', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});
