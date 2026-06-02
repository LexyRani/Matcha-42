import pool from '../database/connectionDb';

export interface User {
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	password_hash: string;
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

	// createUser:
	// Params: first_name (string), last_name (string), email (string), username (string), password_hash (string), birthdate (string), gender (string)
	// Description: CEtte méthode permet de créer un utilisateur avec les paramètres renseignés
	// Return: un objet utilisateur si créer, sinon null
	static async createUser(first_name: string, last_name: string, email: string, username: string, password_hash: string, birthdate: string, gender: string) {
		const result = await pool.query(
			'INSERT INTO "users" ("first_name", "last_name", "email", "username", "password_hash", "birthdate", "gender") \
			VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "user_id"',
			[first_name, last_name, email, username, password_hash, birthdate, gender]
		);
		return result.rows[0];
	}

	// userIsVerify:
	// Params: user_id (string)
	// Description: Cette méthode permet de mettre l'utilisateur renseigné en compte vérifié
	static async userIsVerify(user_id: string) {
		await pool.query(
			`UPDATE "users"
			SET is_verified = True
			WHERE user_id = $1`,
			[user_id]
		)
	}
}
