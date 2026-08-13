const { run, bench, group } = require("mitata");
const path = require("path");

const seqRepo = require(path.join(__dirname, "../src/sequelize/repo"));

const TOTAL_AMOSTRAS = 1000;
let contador = 0;

async function iniciar() {
  console.log("Benchmark: Sequelize - CREATE");

  group("Operação: CREATE - 1 registro", () => {
    bench("Sequelize", async () => {
      contador++;

      await seqRepo.create({
        nome: "User Sequelize",
        email: `bench_seq_${Date.now()}_${contador}@test.com`,
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

  await seqRepo.disconnect();

  console.log("Benchmark finalizado.");
}

iniciar().catch((err) => {
  console.error("Erro ao executar benchmark:", err);
  process.exit(1);
});
