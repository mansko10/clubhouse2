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

module.exports = { createUser };
