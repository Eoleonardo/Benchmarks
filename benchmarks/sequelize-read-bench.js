const { run, bench, group } = require('mitata');
const mysql = require('mysql2/promise');

// Importando os Repositórios (Lógica isolada)

const seqRepo = require('../src/sequelize/repo');

async function iniciarBenchmark() {
  // Setup da conexão para o SQL Puro (necessário para o repo de SQL)
  const conn = await mysql.createConnection({ 
    host: 'localhost', user: 'root', password: '', database: 'tcc' 
  });

  console.log("📊 [BENCHMARK] Operação: READ (Select All)");
  console.log("--------------------------------------------");

  group('', () => {
    
    bench('Sequelize', async () => {
      await seqRepo.read();
    });
  });

  await run();

  // Fechando conexões
  await conn.end();
}

iniciarBenchmark().catch(console.error);