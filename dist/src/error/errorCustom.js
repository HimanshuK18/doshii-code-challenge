"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCustom = void 0;
class ErrorCustom extends Error {
    constructor(message, code) {
        super(message);
        this.name = message;
        this.code = code;
    }
}
exports.ErrorCustom = ErrorCustom;
//# sourceMappingURL=errorCustom.js.map