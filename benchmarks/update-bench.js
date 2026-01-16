const { run, bench, group } = require('mitata');
const mysql = require('mysql2/promise');
const path = require('path');

// Importação dos repositórios
const sqlRepo = require(path.join(__dirname, '../src/sql/repo'));
const prismaRepo = require(path.join(__dirname, '../src/prisma/repo'));
const seqRepo = require(path.join(__dirname, '../src/sequelize/repo'));

async function iniciar() {
  // 1. Conexão com o MySQL do XAMPP (Ajustado para evitar ER_ACCESS_DENIED_ERROR)
  const conn = await mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'tcc' 
  });

  console.log('Preparando ambiente para o benchmark de UPDATE...');

  // 2. Criar um usuário fixo para servir de alvo nos testes
  // Isso evita o erro "No record was found for an update"
  const tempUser = await prismaRepo.create({ 
    nome: 'User Original', 
    email: `update_test_${Date.now()}@test.com`, 
    senha: '123' 
  });

  // 3. Início do Grupo de Benchmarks
  group('Operação: UPDATE (ID Fixo)', () => {
    
    bench('SQL Puro', async () => {
      // Passamos o ID gerado pelo Prisma no passo anterior
      await sqlRepo.update(conn, tempUser.id, 'Novo Nome SQL');
    });

    bench('Prisma v6', async () => {
      await prismaRepo.update(tempUser.id, 'Novo Nome Prisma');
    });

    bench('Sequelize', async () => {
      await seqRepo.update(tempUser.id, 'Novo Nome Seq');
    });
  });

  // 4. Execução com parâmetros para o TCC (mínimo de 1000 amostras)
  await run({
    avg: true,
    json: false,
    colors: true,
    min_samples: 1000
  });

  // Fechar conexão após o teste
  await conn.end();
  console.log('Benchmark finalizado.');
}

// Tratamento de erros na inicialização
iniciar().catch(err => {
  console.error('Erro ao iniciar benchmark:', err);
  process.exit(1);
});