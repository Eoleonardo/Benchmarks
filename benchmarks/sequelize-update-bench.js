const { run, bench, group } = require("mitata");
const path = require("path");

const seqRepo = require(path.join(__dirname, "../src/sequelize/repo"));

const TOTAL_AMOSTRAS = 1000;

async function iniciar() {
  console.log("Preparando ambiente para o benchmark de UPDATE...");

  // Preparação fora da medição
  const tempUser = await seqRepo.create({
    nome: "User Original",
    email: `update_seq_${Date.now()}@test.com`,
    senha: "123",
  });

  group("Operação: UPDATE - 1 registro", () => {
    bench("Sequelize", async () => {
      await seqRepo.update(
        tempUser.id,
        "Novo Nome Sequelize"
      );
    });
  });

  await run({
    avg: true,
    json: false,
    colors: true,
    min_samples: TOTAL_AMOSTRAS,
  });

  await seqRepo.disconnect();

  console.log("Benchmark finalizado.");
}

iniciar().catch((err) => {
  console.error("Erro ao executar benchmark:", err);
  process.exit(1);
});
