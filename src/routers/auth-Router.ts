import {Request, Response, Router} from "express";

import {usersService} from "../domain/users-Service";
import {jwtService} from "../applicatioon/jwt-service";
import nodemailer from "nodemailer"
import {authService} from "../domain/auth-service";
import {emailValidation, loginValidation, passwordValidation} from "../validators/validators";
import {attemptsMiddleware} from "../middleWare/attemptsMiddleware";



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

authRouter.post('/registration', loginValidation, passwordValidation, emailValidation, attemptsMiddleware,
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

        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "apitestblogger@gmail.com", // generated ethereal user
                pass: "lfommghhiouvpevu", // generated ethereal password
            },
        });

       await transport.sendMail({
            from: '"Artur" <apitestblogger@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Confirm Email", // Subject line
            html: "<div>https://somesite.com/confirm-email?code=your_confirmation_code</div>",
        });

        res.sendStatus(204)
    })