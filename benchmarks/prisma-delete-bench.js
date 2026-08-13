const { run, bench, group } = require("mitata");
const mysql = require("mysql2/promise");
const path = require("path");

const prismaRepo = require(path.join(__dirname, "../src/prisma/repo"));

async function iniciar() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clientes",
  });

  const [rows] = await conn.execute("SELECT id FROM clienteprisma");
  const ids = rows.map((r) => r.id);

  group("Operação: DELETE", () => {
    bench("Prisma v6", async () => {
      await prismaRepo.delete(ids.pop());
    });
  });

  await run({
    avg: true,
    json: false,
    colors: true,
  });

  await conn.end();
}

iniciar();
