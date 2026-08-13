const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("clientes", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const ClienteSequelize = sequelize.define(
  "clienteSequelize",
  {
    nome: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    senha: DataTypes.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "clienteSequelize",
  }
);

module.exports = {
  ClienteSequelize,

  create: async (data) => {
    return await ClienteSequelize.create(data);
  },

  read: async () => {
    return await ClienteSequelize.findAll();
  },

  update: async (id, nome) => {
    return await ClienteSequelize.update(
      { nome },
      {
        where: {
          id: Number(id),
        },
      }
    );
  },

  delete: async (id) => {
    return await ClienteSequelize.destroy({
      where: {
        id: Number(id),
      },
    });
  },

  disconnect: async () => {
    await sequelize.close();
  },
};
