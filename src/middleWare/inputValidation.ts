import {NextFunction, Response, Request} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({
            errorsMessages: errors.array({onlyFirstError: true}).map(e => {
                return {
                    message: e.msg,
                    field: e.param,
                }
            })
        });
    } else {
        next()
    }
}
