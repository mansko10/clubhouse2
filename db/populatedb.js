#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	username VARCHAR(50),
	password_hash VARCHAR,
	is_member BOOLEAN DEFAULT false,
	is_admin BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_id INTEGER,
	timestamp DATE,
	message_title VARCHAR(100),
	message_text VARCHAR(255)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
