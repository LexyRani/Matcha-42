import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB
});

async function connectDB() {
	try {
		const client = await pool.connect();
		console.log('Connected to the database successfully');
		client.release();
	} catch (error) {
		console.error('Error connecting to the database:', error);
		process.exit(1);
	}
}

connectDB();

export default pool;
