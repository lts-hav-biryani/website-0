class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statuscode = statusCode;
    }
};
module.exports = AppError;