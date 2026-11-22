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

module.exports = { createUser, getUserByUsername, getUserById };
