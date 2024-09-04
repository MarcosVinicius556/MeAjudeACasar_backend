export default class StandardError<E extends Error> {

    statusCode: number;
    error: string;
    message: string;
    timestamp: Date;

    constructor(exception: E, statusCode: number) {
        this.error = exception.name;
        this.message = exception.message;
        this.statusCode = statusCode;
        this.timestamp = new Date();
    }

}