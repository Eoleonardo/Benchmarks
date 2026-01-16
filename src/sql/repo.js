const mysql = require('mysql2/promise');

async function getConn() {
  return await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'tcc' });
}

module.exports = {
  create: async (conn, d) => await conn.execute('INSERT INTO cliente (nome, email, senha) VALUES (?, ?, ?)', [d.nome, d.email, d.senha]),
  read: async (conn) => await conn.execute('SELECT * FROM cliente'),
  update: async (conn, id, nome) => await conn.execute('UPDATE cliente SET nome = ? WHERE id = ?', [nome, id]),
  delete: async (conn, id) => await conn.execute('DELETE FROM cliente WHERE id = ?', [id])
};