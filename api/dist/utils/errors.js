"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.NotFoundError = exports.ValidationError = void 0;
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
class NotFoundError extends Error {
}
exports.NotFoundError = NotFoundError;
const handleError = (err, req, res, next) => {
    console.error(err);
    if (err instanceof ValidationError) {
        res.status(400).json({ message: err.message });
    }
    if (err instanceof NotFoundError) {
        res.status(404).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: 'Sorry, please try again later.' });
    }
};
exports.handleError = handleError;
//
//
// export class HttpError extends Error {
//     code: number;
//     constructor(code: number, message: string) {
//         super(message);
//         this.code = code;
//     }
// }
//
// export const handleError = (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): void => {
//     console.error(err);
//
//     if (err instanceof HttpError) {
//         res.status(err.code).json({ message: err.message });
//     } else {
//         res.status(500).json({ message: 'Sorry, please try again later.' });
//     }
// };
//# sourceMappingURL=errors.js.map