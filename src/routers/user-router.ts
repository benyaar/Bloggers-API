import {Request, Response, Router} from "express";

import {usersService} from "../domain/users-Service";
import {loginValidation, passwordValidation} from "../validators/validators";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";
import {authMiddleware} from "../middleWare/authValidation";


export const usersRouter = Router({})

class UserController {
    async createNewUser(req: Request, res: Response) {
        const newUser = await usersService.createUser(req.body.login, req.body.password)
        res.status(201).send(newUser)
    }

    async getUsers(req: Request, res: Response) {

        const pageSize: number = Number(req.query.PageSize) || 10
        const pageNumber: number = Number(req.query.PageNumber) || 1
        const foundUsers = await usersService.findUsers(pageSize, pageNumber)
        const getCount = await usersService.getCount()

        res.send({
            "pagesCount": Math.ceil(getCount / pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": getCount,
            "items": foundUsers.map(e => {
                return {
                    id: e.id,
                    login: e.login
                }
            })
        })
    }

    async deleteUserById(req: Request, res: Response) {
        const isDeleted = await usersService.deleteUsers(req.params.id)
        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}

export const userControllerInstance = new UserController()


usersRouter.post('/', authMiddleware, loginValidation, passwordValidation, inputValidationMiddleWare, userControllerInstance.createNewUser)
usersRouter.get('/', userControllerInstance.getUsers)
usersRouter.delete('/:id', authMiddleware, userControllerInstance.deleteUserById)