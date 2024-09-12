export default class DatabaseException extends Error {
    constructor(message: string) {
        super(`Ocorreu um erro ao tentar efetuar a operação no banco de dados! Motivo: ${message}`);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}