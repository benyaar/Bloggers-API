import {Request, Response, Router} from "express";

import {usersService} from "../domain/users-Service";
import {jwtService} from "../applicatioon/jwt-service";
import {authService} from "../domain/auth-service";
import {emailValidation, loginValidation, passwordValidation} from "../validators/validators";
import {attemptsMiddleware} from "../middleWare/attemptsMiddleware";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";
import {authMiddlewareBearer} from "../middleWare/authValidation";


export const authRouter = Router({})

class AuthController {
    async checkLogin(req: Request, res: Response) {
        const user = await usersService.checkCredentials(req.body.login, req.body.password)
        if (user) {
            const jwtTokenPair = await jwtService.createJWTPair(user)
            res.cookie('refreshToken', jwtTokenPair.refreshToken, {httpOnly: true, secure: true})
            res.status(200).send({accessToken: jwtTokenPair.accessToken})
        } else {
            res.sendStatus(401)
        }
    }

    async registrationNewUser(req: Request, res: Response) {
        const checkLoginExist = await authService.checkExistLogin(req.body.login)
        const checkEmailExist = await authService.checkExistEmail(req.body.email)
        if (checkEmailExist) {
            return res.status(400).send({errorsMessages: [{message: 'Invalid email', field: "email"}]})
        }
        if (checkLoginExist.length !== 0) {
            return res.status(400).send({errorsMessages: [{message: 'Invalid login', field: "login"}]})
        }
        await authService.createUser(req.body.login, req.body.email, req.body.password)
        res.sendStatus(204)
    }

    async confirmRegistration(req: Request, res: Response) {
        const result = await authService.confirmEmail(req.body.code)
        if (result) {
            res.sendStatus(204)
        } else {
            res.status(400).send({errorsMessages: [{message: "ErrorMessage", field: "code"}]})
        }
    }

    async resendingEmail(req: Request, res: Response) {
        const user = await authService.checkExistEmail(req.body.email)
        if (user === null || !user || user.emailConfirmation.isConfirmed) {
            res.status(400).send({errorsMessages: [{message: "ErrorMessage", field: "email"}]})
        } else {
            await authService.resendingEmailConfirm(req.body.email);
            res.sendStatus(204)
        }
    }

    async createRefreshToken(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)
        const tokenTime = await jwtService.getTokenTime(refreshToken)
        if (!tokenTime) return res.sendStatus(401)
        const checkToken = await authService.checkTokenInBlackList(refreshToken)
        if (checkToken) return res.sendStatus(401)
        const userId = await jwtService.getUserIdByToken(refreshToken)
        const user = await usersService.findUsersById(userId)
        if (!user) return res.sendStatus(401)
        await authService.addTokenInBlackList(refreshToken)
        const jwtTokenPair = await jwtService.createJWTPair(user)
        res.cookie('refreshToken', jwtTokenPair.refreshToken, {httpOnly: true, secure: true})
        res.status(200).send({accessToken: jwtTokenPair.accessToken})
        return
    }

    async checkMyData(req: Request, res: Response) {
        const header = req.headers.authorization
        if (!header) return res.sendStatus(401)

        const token = header!.split(' ')[1]
        const userId = await jwtService.getUserIdByToken(token)
        const user = await usersService.findUsersById(userId)

        if (user) {
            res.status(200).send({
                email: user.email,
                login: user.login,
                userId: user.id,
            })
        } else {
            res.sendStatus(401)
        }
    }

    async logoutUser(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)
        const tokenTime = await jwtService.getTokenTime(refreshToken)
        if (!tokenTime) return res.sendStatus(401)
        const checkToken = await authService.checkTokenInBlackList(refreshToken)
        if (checkToken) return res.sendStatus(401)
        const userId = await jwtService.getUserIdByToken(refreshToken)
        const user = await usersService.findUsersById(userId)
        if (!user) return res.sendStatus(401)
        await authService.addTokenInBlackList(refreshToken)
        res.sendStatus(204)
        return
    }
}

export const authControllerInstance = new AuthController()
authRouter.post('/login', attemptsMiddleware, authControllerInstance.checkLogin)
authRouter.post('/registration', loginValidation, passwordValidation, emailValidation, inputValidationMiddleWare, attemptsMiddleware, authControllerInstance.registrationNewUser)
authRouter.post('/registration-confirmation', attemptsMiddleware, authControllerInstance.confirmRegistration)
authRouter.post('/registration-email-resending', emailValidation, inputValidationMiddleWare, attemptsMiddleware, authControllerInstance.resendingEmail)
authRouter.post('/refresh-token', authControllerInstance.createRefreshToken)
authRouter.get('/me', authMiddlewareBearer, authControllerInstance.checkMyData)
authRouter.post('/logout', authControllerInstance.logoutUser)
