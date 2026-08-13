const { run, bench, group } = require("mitata");
const path = require("path");

const seqRepo = require(path.join(__dirname, "../src/sequelize/repo"));

const TOTAL_AMOSTRAS = 1000;

async function iniciar() {
  console.log("Benchmark: Sequelize - READ");

  group("Operação: READ - Select All", () => {
    bench("Sequelize", async () => {
      await seqRepo.read();
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
