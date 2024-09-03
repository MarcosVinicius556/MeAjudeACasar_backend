export default class InvalidCredentialsException extends Error {
    constructor(id: Object) {
        super(`Credenciais inválidas. Credênciais: ${id}`);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}