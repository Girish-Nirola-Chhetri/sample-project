import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'postgres',
  password: process.env.PGPASSWORD || 'password',
  port: Number(process.env.PGPORT || 5432),
});

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export async function registerUser({ username, email, password }: RegisterUserInput) {
  const query = `
    INSERT INTO users (username, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, username, email;
  `;

  const result = await pool.query(query, [username, email, password]);
  return result.rows[0];
}

export async function createUsersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Example usage:
// createUsersTable().then(() => {
//   registerUser({
//     username: 'john_doe',
//     email: 'john@example.com',
//     password: 'securepassword123',
//   })
//     .then((user) => console.log('User registered:', user))
//     .catch((error) => console.error('Registration failed:', error));
// });
