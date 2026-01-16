const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const ClienteSequelize = sequelize.define('ClienteSequelize', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING
}, {
  tableName: 'ClienteSequelize',
  timestamps: false
});

module.exports = ClienteSequelize;
