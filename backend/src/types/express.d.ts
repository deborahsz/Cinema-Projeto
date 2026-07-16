export {}

declare global {
  namespace Express {
    interface Request {
      /** Preenchido pelo middleware `authenticate` a partir do token JWT. */
      userId?: string
    }
  }
}
