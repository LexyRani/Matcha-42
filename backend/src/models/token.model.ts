import pool from '../database/connectionDb';

export interface Token {
	user_id: string;
	type_token: string;
	token: string;
	expires_at: string;
}

export class TokenModel {

	// createVerificationToken:
	// Params: user_id (string), token (string)
	// Description: Cette méthode permet de sauvegarder un token pour un utilisateur dans la bdd
	// 				en utilisant son user_id
	static async createVerificationToken(user_id: number, token: string) {
		await pool.query(
			'INSERT INTO "tokens" ("user_id", "type_token", "token", "expires_at") \
			VALUES ($1, $2, $3, NOW() + INTERVAL \'24 hours\')',
			[user_id, 'verification', token]
		);
	}

	// findValidVerificationToken:
	// Params: token(string)
	// Description:	Cette méthode permet de rechercher un token et de récupérer les infos depuis
	// 				user depuis ce token
	static async findValidVerificationToken(token: string) {
		const result = await pool.query(
			`SELECT u.user_id, u.email, u.is_verified
			FROM tokens t
			JOIN users u ON t.user_id = u.user_id
			WHERE t.token = $1
			AND t.type_token = 'email_verification'
			AND t.expires_at > NOW()
			AND u.is_verified = false`,
			[token]
		)
		return result.rows[0] || null;
	}
}
