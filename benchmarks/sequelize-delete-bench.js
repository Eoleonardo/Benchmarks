const { run, bench, group } = require("mitata");
const mysql = require("mysql2/promise");
const path = require("path");

const seqRepo = require(path.join(__dirname, "../src/sequelize/repo"));

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
    "SELECT id FROM clienteSequelize LIMIT 1000"
  );

  const ids = rows.map((row) => row.id);

  let cursor = 0;

  group("Operação: DELETE - 1 registro", () => {
    bench("Sequelize", async () => {
      const id = ids[cursor];

      if (id === undefined) {
        return;
      }

      await seqRepo.delete(id);

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
  await seqRepo.disconnect();

  console.log("Benchmark finalizado.");
}

iniciar().catch((err) => {
  console.error("Erro ao executar benchmark:", err);
  process.exit(1);
});
