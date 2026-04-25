const { run, bench, group } = require("mitata");
const mysql = require("mysql2/promise");
const path = require("path");

const prismaRepo = require(path.join(__dirname, "../src/prisma/repo"));

async function iniciar() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tcc",
  });

  // Busca IDs para deletar
  const [rows] = await conn.execute("SELECT id FROM clienteprisma");
  const ids = rows.map((r) => r.id);

  let cont_sample = 1;
  group("Operação: DELETE", () => {
    bench("Prisma v6", async () => {
      limitarAsyncs(() => prismaRepo.delete(ids.pop()));
    });
  });

  await run({
    avg: true, // mostra a média
    json: false, // mantém a saída legível no console
    colors: true, // mantém as cores
  });
  await conn.end();
}

iniciar();
