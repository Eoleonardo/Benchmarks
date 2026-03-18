const { run, bench, group } = require('mitata');
const mysql = require('mysql2/promise');
const path = require('path');


const seqRepo = require(path.join(__dirname, '../src/sequelize/repo'));

async function iniciar() {
  const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'tcc' });

  group('Operação: CREATE (Single Insert)', () => {
    bench('Sequelize', async () => {
      await seqRepo.create({ 
        nome: 'User Seq', email: `seq_${Math.random()}@test.com`, senha: '123' 
      });
    });
  });

  await run({
  avg: true, // mostra a média
  json: false, // mantém a saída legível no console
  colors: true, // mantém as cores
  min_samples: 1000, // garante no mínimo 1.000 coletas
});
  await conn.end();
}

iniciar();