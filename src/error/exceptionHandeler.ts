import { RequestError } from 'mssql';


export interface ExceptionMessage {
    code: number,
    message: string
}
export function HandelException(error: unknown): ExceptionMessage {

    const exception: ExceptionMessage = { code: 500, message: "Interner server error" };
    if (error instanceof RequestError) {
        if (error.code === 'EREQUEST' && error.number === 2627) {
            exception.code = 400;
            exception.message = "Email id is not unique";
        }
        if (error.code === 'EREQUEST' && error.number === 547) {
            exception.code = 400;
            exception.message = "Either member id or reward id is not found";
        } else if (error.code === 'ELOGIN') {
            exception.code = 401;
            exception.message = "un authorized";
        }
    }
    return exception;
}