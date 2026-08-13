const { run, bench, group } = require("mitata");
const path = require("path");

const prismaRepo = require(path.join(__dirname, "../src/prisma/repo"));

const TOTAL_AMOSTRAS = 1000;
let contador = 0;

async function iniciar() {
  group("Operação: CREATE - 1 registro", () => {
    bench("Prisma v6", async () => {
      contador++;

      await prismaRepo.create({
        nome: "User Prisma",
        email: `bench_prisma_${Date.now()}_${contador}@test.com`,
        senha: "123",
      });
    });
  });

  await run({
    avg: true,
    json: false,
    colors: true,
    min_samples: TOTAL_AMOSTRAS,
  });

  await prismaRepo.disconnect();
}

iniciar().catch(console.error);
