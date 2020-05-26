module.exports = class RequestError extends Error {
    constructor(body, statusCode, path) {
        super(body);
        this.path = path;
        this.status = statusCode;
        this.name = "RequestError";
    }
};
