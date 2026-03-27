// DTO sert à définir la structure des données attendues lors de l'inscription d'un utilisateur. Il inclut les champs nécessaires tels que le profil picture, l'email, le nom d'utilisateur, le mot de passe, ainsi que les champs optionnels pour le prénom et le nom de famille.

export interface RegisterDTO {
	first_name: string;
	last_name: string; 
	biography?: string;
	email: string; // OK
	username: string; // OK
	password: string;
	birthdate: string;
	gender: string;
	sexual_preference?: string;
	profile_picture?: string;
}
