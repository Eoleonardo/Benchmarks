const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  create: async (data) => {
    return await prisma.clientePrisma.create({ data });
  },

  read: async () => {
    return await prisma.clientePrisma.findMany();
  },

  update: async (id, nome) => {
    return await prisma.clientePrisma.update({
      where: { id: Number(id) },
      data: { nome },
    });
  },

  delete: async (id) => {
    return await prisma.clientePrisma.delete({
      where: { id: Number(id) },
    });
  },

  disconnect: async () => {
    await prisma.$disconnect();
  },
};
