
export const log = {
    debugCallsBuffer: [] as (() => void)[],
    info(message: string, ...args: unknown[]) {
        console.log(message, ...args);
    },
    error(message: string, ...args: unknown[]) {
        console.error(message, ...args);
        console.log("Debug buffer");
        this.debugCallsBuffer.forEach((debugLogCall) => debugLogCall());
    },
    debug(message: string, ...args: unknown[]) {
        this.debugCallsBuffer.push(() => console.debug(message, ...args));
    },
    clear() {
        this.debugCallsBuffer = []
    }
};
