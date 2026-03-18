const { run, bench, group } = require('mitata');
const mysql = require('mysql2/promise');
const path = require('path');

const sqlRepo = require(path.join(__dirname, '../src/sql/repo'));


async function iniciar() {
  const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'tcc' });
  
  // Busca IDs para deletar
  const [rows] = await conn.execute('SELECT id FROM cliente LIMIT 1000');
  const ids = rows.map(r => r.id);
  let i = 0;

  group('Operação: DELETE', () => {
    bench('SQL Puro', async () => {
      await sqlRepo.delete(conn, ids[i % ids.length]);
      i++;
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