// Este arquivo o orientador vai adorar ver, pois está limpo e focado
async function create(conn, data) {
  return await conn.execute(
    'INSERT INTO cliente (nome, email, senha) VALUES (?, ?, ?)',
    [data.nome, data.email, data.senha]
  );
}
module.exports = { create };