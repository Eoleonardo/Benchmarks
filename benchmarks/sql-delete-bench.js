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

  console.log("Preparando ambiente para o benchmark de DELETE...");

  const [rows] = await conn.execute(
    "SELECT id FROM cliente LIMIT 1000"
  );

  const ids = rows.map((row) => row.id);

  let cursor = 0;

  group("Operação: DELETE - 1 registro", () => {
    bench("SQL Puro", async () => {
      const id = ids[cursor];

      if (id === undefined) {
        return;
      }

      await sqlRepo.delete(conn, id);

      cursor++;
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
