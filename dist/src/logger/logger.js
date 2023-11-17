"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
exports.log = {
    debugCallsBuffer: [],
    info(message, ...args) {
        console.log(message, ...args);
    },
    error(message, ...args) {
        console.error(message, ...args);
        console.log("Debug buffer");
        this.debugCallsBuffer.forEach((debugLogCall) => debugLogCall());
    },
    debug(message, ...args) {
        this.debugCallsBuffer.push(() => console.debug(message, ...args));
    },
    clear() {
        this.debugCallsBuffer = [];
    }
};
//# sourceMappingURL=logger.js.map