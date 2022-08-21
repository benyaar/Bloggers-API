import {Request, Response, Router} from "express";

import {usersService} from "../domain/users-Service";
import {jwtService} from "../applicatioon/jwt-service";
import nodemailer from "nodemailer"
import {authService} from "../domain/auth-service";
import {emailValidation, loginValidation, passwordValidation} from "../validators/validators";



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

// authRouter.post('/registration',
//     async (req:Request, res:Response) =>{
//         let transport = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "apitestblogger@gmail.com", // generated ethereal user
//                 pass: "lfommghhiouvpevu", // generated ethereal password
//             },
//         });
//
//         let info = await transport.sendMail({
//             from: '"Artur" <apitestblogger@gmail.com>', // sender address
//             to: req.body.email, // list of receivers
//             subject: req.body.subject, // Subject line
//             html: req.body.message, // html body
//         });
//         res.status(200).send(info)
//
//     })

authRouter.post('/registration', loginValidation, passwordValidation, emailValidation,
    async (req:Request, res:Response) =>{
            const newUser = await authService.createUser(req.body.login, req.body.email, req.body.password)
            res.sendStatus(204)
    })