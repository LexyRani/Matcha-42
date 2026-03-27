import pool from '../database/connectionDb';

export interface User {
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	password: string;
	birthdate: string;
	gender: string;
}

export class UserModel {

	// findByEmail:
	// Params: email (string)
	// Description: Cette méthode permet de rechercher un utilisateur dans la bdd
	// 				en utilisant son adresse e-mail
	// Return: un objet utilisateur si trouvé, sinon null
	static async findByEmail(email: string) {
		const result = await pool.query(
			'SELECT * FROM users WHERE email = $1',
			[email]
		);
		return result.rows[0];
	}

	// findByUsername:
	// Params: username (string)
	// Description: Cette méthode permet de rechercher un utilisateur dans la bdd
	// 				en utilisant son nom d'utilisateur
	// Return: un objet utilisateur si trouvé, sinon null
	static async findByUsername(username: string) {
		const result = await pool.query(
			'SELECT * FROM users WHERE username = $1',
			[username]
		);
		return result.rows[0];
	}

	static async createUser(first_name: string, last_name: string, username: string, email: string, password: string, birthdate: string, gender: string) {
		const result = await pool.query(
			'INSERT INTO "users" ("first_name", "last_name", "email", "username", "password_hash", "birthdate", "gender") \
			VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "user_id"',
			[first_name, last_name, email, username, password, birthdate, gender]
		);
		return result.rows[0];
	}
}
