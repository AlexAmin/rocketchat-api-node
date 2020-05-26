module.exports = class RequestError extends Error {
    constructor(message, statusCode, path, body) {
        super(message);
        this.path = path;
        this.status = statusCode;
        this.name = "RequestError";
        this.body = body;
    }
};
