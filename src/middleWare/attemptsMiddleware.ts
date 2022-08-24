import {NextFunction, Request, Response} from "express";
import {attemptsRepository} from "../repositories/attempts-repository";

export const attemptsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const limitTime: Date  = new Date(new Date().getTime() - 9999)

    const countOfAttempts = await attemptsRepository.getLastAttempts(req.ip, req.url, limitTime)

    await attemptsRepository.addAttempt(req.ip, req.url, new Date())

    if(countOfAttempts < 5 ) {
        next()
    } else {
        res.sendStatus(429)
    }
}
