const pool = require("./pool");

async function createUser(first_name, last_name, username, password_hash) {
  await pool.query(
    `INSERT INTO users
     (first_name, last_name, username, password_hash, is_member, is_admin)
     VALUES
     ($1, $2, $3, $4, false, false)
    `,
    [first_name, last_name, username, password_hash],
  );
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);

  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

  return rows[0];
}

async function createMessage(user_id, message_title, message_text) {
  await pool.query(
    `
      INSERT INTO messages
      (user_id, timestamp, message_title, message_text)
      VALUES
      ($1, NOW(), $2, $3);
    `,
    [user_id, message_title, message_text],
  );
}

async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT username, timestamp, message_title, message_text FROM messages LEFT JOIN users ON messages.user_id = users.id;`,
  );

  return rows;
}

async function makeAdmin(id) {
  await pool.query(
    `UPDATE users
     SET is_member = true
     WHERE id = $1;`,
    [id],
  );
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  createMessage,
  getAllMessages,
  makeAdmin,
};
