const { run, bench, group } = require("mitata");
const mysql = require("mysql2/promise");
const path = require("path");

const sqlRepo = require(path.join(__dirname, "../src/sql/repo"));

const TOTAL_AMOSTRAS = 1000;
let contador = 0;

async function iniciar() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clientes",
  });

  console.log("Benchmark: SQL Puro - CREATE");

  group("Operação: CREATE - 1 registro", () => {
    bench("SQL Puro", async () => {
      contador++;

      await sqlRepo.create(conn, {
        nome: "User SQL",
        email: `bench_sql_${Date.now()}_${contador}@test.com`,
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

  await conn.end();

  console.log("Benchmark finalizado.");
}

iniciar().catch((err) => {
  console.error("Erro ao executar benchmark:", err);
  process.exit(1);
});
