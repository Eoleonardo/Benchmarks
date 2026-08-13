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

  console.log("Preparando ambiente para o benchmark de UPDATE...");

  // Preparação fora da medição
  const [result] = await sqlRepo.create(conn, {
    nome: "User Original",
    email: `update_sql_${Date.now()}@test.com`,
    senha: "123",
  });

  const id = result.insertId;

  group("Operação: UPDATE - 1 registro", () => {
    bench("SQL Puro", async () => {
      await sqlRepo.update(
        conn,
        id,
        "Novo Nome SQL"
      );
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
