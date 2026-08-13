const { run, bench, group } = require("mitata");
const mysql = require("mysql2/promise");
const path = require("path");

const sqlRepo = require(path.join(__dirname, "../src/sql/repo"));

const TOTAL_AMOSTRAS = 1000;

async function iniciar() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clientes",
  });

  console.log("Benchmark: SQL Puro - READ");

  group("Operação: READ - Select All", () => {
    bench("SQL Puro", async () => {
      await sqlRepo.read(conn);
    });
  });

  await run({
    avg: true,
    json: false,
    colors: true,
    min_samples: TOTAL_AMOSTRAS,
  });

  await conn.end();

  console.log("Benchmark finalizado.");
}

iniciar().catch((err) => {
  console.error("Erro ao executar benchmark:", err);
  process.exit(1);
});
