import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

async function verifyTables() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();
        console.log('Connected to database successfully.');

        const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

        if (res.rows.length === 0) {
            console.log('No tables found in the public schema.');
        } else {
            console.log('Tables found in the public schema:');
            res.rows.forEach(row => console.log(`- ${row.table_name}`));
        }
    } catch (err) {
        console.error('Error connecting or querying:', err);
    } finally {
        await client.end();
    }
}

verifyTables();
