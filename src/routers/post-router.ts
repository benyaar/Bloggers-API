import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";
import {authMiddleware} from "../middleWare/authValidation";
import {bloggersService} from "../domain/bloggers-service";
import {postsService} from "../domain/posts-service";


export const titleValidation = body('title').trim().isLength({min: 1, max: 30})
export const shortDescriptionValidation = body('shortDescription').trim().isLength({min: 1, max: 100})
export const contentValidation = body('content').trim().isLength({min: 1, max: 1000})

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {

    const pageSize: number = Number(req.query.PageSize) || 10
    const pageNumber: number = Number(req.query.PageNumber) || 1


    const findPost = await postsService.findPosts(pageSize, pageNumber)
    const getCount = await postsService.getCount()
    res.send({
        "pagesCount": Math.ceil(getCount/ pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": getCount,
        "items": findPost
    })
})
postsRouter.post('/', authMiddleware, titleValidation, shortDescriptionValidation, contentValidation, inputValidationMiddleWare, async (req: Request, res: Response) => {

    let blogger = await bloggersService.findBloggersById(req.body.bloggerId)
    if (!blogger) {
        return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
    } else {
        const newPost = await postsService.createPost(
            +req.params.id,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerId)

        res.status(201).send(newPost)
    }
})
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const post = await postsService.findPostById(+req.params.id)

    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
})
postsRouter.put('/:id', authMiddleware, titleValidation, shortDescriptionValidation, contentValidation, inputValidationMiddleWare, async (req: Request, res: Response) => {

    let blogger = await bloggersService.findBloggersById(req.body.bloggerId)
    if (!blogger) {
        return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
    } else {
        const isUpdate = await postsService.updatePost(+req.params.id,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerId)
        if (isUpdate) {
            const post = await postsService.findPostById(+req.params.id)
            res.status(204).send({post})
        } else {
            res.send(404)
        }
    }

})
postsRouter.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const isDeleted = await postsService.deletePosts(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})