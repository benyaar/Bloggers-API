import {Request, Response, Router} from "express";

import {usersService} from "../domain/users-Service";
import {jwtService} from "../applicatioon/jwt-service";
import nodemailer from "nodemailer"
import {authService} from "../domain/auth-service";
import {emailValidation, loginValidation, passwordValidation} from "../validators/validators";
import {attemptsMiddleware} from "../middleWare/attemptsMiddleware";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";



export const authRouter = Router({})

authRouter.post('/login',
    async (req:Request, res:Response) =>{
    const user = await usersService.checkCredentials(req.body.login, req.body.password)
        if(user) {
            const token = await jwtService.createJWT(user)
            res.status(200).send({token: token})
        } else {
            res.sendStatus(401)
        }
    })

authRouter.post('/registration', loginValidation, passwordValidation, emailValidation,inputValidationMiddleWare, attemptsMiddleware,
    async (req:Request, res:Response) =>{
    const checkLoginExist = await authService.checkExistLogin(req.body.login)
        const checkEmailExist = await authService.checkExistEmail(req.body.email)

        if (checkEmailExist.length !== 0) {
            return res.status(400).send({errorsMessages: [{message: 'Invalid email', field: "email"}]})
        }
        if(checkLoginExist.length !== 0){
            return res.status(400).send({errorsMessages: [{message: 'Invalid login', field: "login"}]})
        }

        await authService.createUser(req.body.login, req.body.email, req.body.password)


        res.sendStatus(204)
    })
authRouter.post('/registration-confirmation', attemptsMiddleware,
    async (req:Request, res:Response) =>{
    const result = await authService.confirmEmail(req.body.code)
        if (result){
            res.sendStatus(204)
        } else {
            res.status(400).send({errorsMessages: [{message: "ErrorMessage", field: "code"}]})
        }
    })


// authRouter.post('/registration-email-resending',
//     emailValidation, inputValidationMiddleWare, attemptsMiddleware,
//     async (req: Request, res: Response) => {
//
//         const user = await authService.checkExistEmail(req.body.email)
//
//         if (user?.isConfirmed === true || !user) {
//
//             res.status(400).send({errorsMessages: [{message: "ErrorMessage", field: "email"}]})
//         } else {
//
//             const result = await authService.resendingEmailConfirm(req.body.email)
//             if (result) {
//                 res.sendStatus(204)
//             } else {
//                 res.sendStatus(400)
//             }
//         }
//
//     })