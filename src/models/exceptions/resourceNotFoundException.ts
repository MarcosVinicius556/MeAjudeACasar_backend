export default class ResourceNotFoundException extends Error {
    constructor(id: Object) {
        super(`Não foi encontrado nenhum recurso com o ID ${id}`);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}