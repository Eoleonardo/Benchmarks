const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("tcc", "root", "senhasenha", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const ClienteSequelize = sequelize.define(
  "clienteSequelize",
  {
    nome: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    senha: DataTypes.STRING,
  },
  { timestamps: false, freezeTableName: true, tableName: "clienteSequelize" },
);

module.exports = {
  create: async (d) => await ClienteSequelize.create(d),
  read: async () => await ClienteSequelize.findAll(),
  update: async (id, nome) =>
    await ClienteSequelize.update({ nome }, { where: { id } }),
  delete: async (id) => await ClienteSequelize.destroy({ where: { id } }),
  ClienteSequelize,
};
