module.exports = class RequestError extends Error {
    constructor(errorType, message, statusCode, path, body) {
        super(message);
        this.errorType = errorType;
        this.path = path;
        this.message = message;
        this.status = statusCode;
        this.name = "RequestError";
        this.body = body;
    }
};
