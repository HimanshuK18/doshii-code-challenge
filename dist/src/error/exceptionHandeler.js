"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandelException = void 0;
const mssql_1 = require("mssql");
function HandelException(error) {
    const exception = { code: 500, message: "Interner server error" };
    if (error instanceof mssql_1.RequestError) {
        if (error.code === 'EREQUEST' && error.number === 2627) {
            exception.code = 400;
            exception.message = "Email id is not unique";
        }
        if (error.code === 'EREQUEST' && error.number === 547) {
            exception.code = 400;
            exception.message = "Either member id or reward id is not found";
        }
        else if (error.code === 'ELOGIN') {
            exception.code = 401;
            exception.message = "un authorized";
        }
    }
    return exception;
}
exports.HandelException = HandelException;
//# sourceMappingURL=exceptionHandeler.js.map