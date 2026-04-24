const { PrismaClient } = require('@prisma/client');

// Instancia o ClientePrisma. O Prisma já saberá procurar o schema na pasta raiz /prisma
const prisma = new PrismaClient();

module.exports = {
  create: async (data) => {
    return await prisma.clientePrisma.create({ data });
  },

  read: async () => {
    return await prisma.clientePrisma.findMany();
  },

  update: async (id, nome) => {
    // Usamos 'update' para atualizar por ID único
    return await prisma.clientePrisma.update({
      where: { id: Number(id) }, // Garante que o ID seja um número
      data: { nome }
    });
  },

  delete: async () => {
    return await prisma.clientePrisma.deleteMany({
      where: {},
    });
  }
};