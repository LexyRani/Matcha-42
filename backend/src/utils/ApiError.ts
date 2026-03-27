// ApiError va être utilisé pour créer des erreurs personnalisées avec un code de statut HTTP
// et un message d'erreur.

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
