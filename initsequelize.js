 const seqRepo = require ("./src/sequelize/repo");

(async () => {
  await seqRepo.ClienteSequelize.sync();
  console.log("Tabela Criada (se não existia).");
  await seqRepo.create({ 
        nome: 'User Seq', email: `seq_${Math.random()}@test.com`, senha: '123' 
      });
})();

  

 

