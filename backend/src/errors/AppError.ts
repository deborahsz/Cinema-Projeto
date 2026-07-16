/**
 * Erro de aplicação com status HTTP explícito. Lançar um AppError em
 * qualquer rota ou serviço é capturado pelo error handler global e
 * transformado numa resposta JSON consistente.
 */
export class AppError extends Error {
  readonly statusCode: number

  constructor(message: string, statusCode = 400) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
  }
}
