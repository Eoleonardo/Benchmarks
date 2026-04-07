const { run, bench, group } = require('mitata');
const mysql = require('mysql2/promise');
const path = require('path');

const seqRepo = require(path.join(__dirname, '../src/sequelize/repo'));

async function iniciar() {
  const conn = await mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'tcc' 
  });
  
  // 1. Busca IDs existentes (Aumente o LIMIT se for rodar muitas amostras)
  // Certifique-se que o nome da tabela aqui é o mesmo do seu banco (cliente ou clienteSequelize)
  const [rows] = await conn.execute('SELECT id FROM clienteSequelize LIMIT 5000');
  const ids = rows.map(r => r.id);
  
  // Controle de qual ID será o próximo a ser deletado
  let cursor = 0;

  group('• Operação: DELETE', () => {
    
    bench('Sequelize', async () => {
      // Pega o ID atual e move o cursor para o próximo
      const id = ids[cursor];
      
      if (id !== undefined) {
        await seqRepo.delete(id);
        cursor++;
      } else {
        // Se acabarem os IDs do array, o benchmark para de tentar deletar
        // Isso evita o erro de "undefined" no Sequelize
        return; 
      }
    });
  });

  await run({
    avg: true,
    min_samples: 1000, 
  });

  await conn.end();
}

iniciar();