async function create(conn, data) {
  return await conn.execute(
    "INSERT INTO cliente (nome, email, senha) VALUES (?, ?, ?)",
    [data.nome, data.email, data.senha]
  );
}

async function read(conn) {
  return await conn.execute(
    "SELECT * FROM cliente"
  );
}

async function update(conn, id, nome) {
  return await conn.execute(
    "UPDATE cliente SET nome = ? WHERE id = ?",
    [nome, id]
  );
}

async function deleteRecord(conn, id) {
  return await conn.execute(
    "DELETE FROM cliente WHERE id = ?",
    [id]
  );
}

module.exports = {
  create,
  read,
  update,
  delete: deleteRecord,
};
