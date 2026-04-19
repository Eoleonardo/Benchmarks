const { run, bench, group } = require("mitata");
const mysql = require("mysql2/promise");
const path = require("path");

const pLimit = require("p-limit").default;

const limitarAsyncs = pLimit(500);

const prismaRepo = require(path.join(__dirname, "../src/prisma/repo"));

async function iniciar() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tcc",
  });

  group("Operação: CREATE (Single Insert)", () => {
    bench("Prisma v6", async () => {
      await Promise.all(
        Array.from({ length: 1000 }, (_, i) =>
          limitarAsyncs(() =>
            prismaRepo.create({
              nome: "User Pri",
              email: `prisma_${Math.random()}@test.com`,
              senha: "123",
            }),
          ),
        ),
      );
    });
  });

  await run({
    avg: true, // mostra a média
    json: false, // mantém a saída legível no console
    colors: true, // mantém as cores
    min_samples: 3, // garante no mínimo 3 coletas
  });
  await conn.end();
}

iniciar();
