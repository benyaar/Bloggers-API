import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {body} from "express-validator";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";
import {authMiddleware} from "../middleWare/authValidation";
import {bloggersService} from "../domain/bloggers-service";

const titleValidation = body('title').trim().isLength({min: 1, max: 30})
const shortDescriptionValidation = body('shortDescription').trim().isLength({min: 1, max: 100})
const contentValidation = body('content').trim().isLength({min: 1, max: 1000})

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const findPost = await postsRepository.findPosts()
    res.send(findPost)
})
postsRouter.post('/',authMiddleware, titleValidation, shortDescriptionValidation, contentValidation, inputValidationMiddleWare, async (req: Request, res: Response) => {

    let blogger = await bloggersService.findBloggersById(req.body.bloggerId)
    if (!blogger) {
        return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
    } else {
        const newPost = await postsRepository.createPost(
            +req.params.id,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerId)

        res.status(201).send(newPost)
    }
})
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const post = await postsRepository.findPostById(+req.params.id)

    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
})
postsRouter.put('/:id',authMiddleware,titleValidation, shortDescriptionValidation, contentValidation, inputValidationMiddleWare, async (req: Request, res: Response) => {

    let blogger = await bloggersService.findBloggersById(req.body.bloggerId)
    if (!blogger) {
        return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
    } else {
        const isUpdate = await postsRepository.updatePost(+req.params.id,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerId)
        if (isUpdate) {
            const post = await postsRepository.findPostById(+req.params.id)
            res.status(204).send({post})
        } else {
            res.send(404)
        }
    }

})
postsRouter.delete('/:id',authMiddleware, async (req: Request, res: Response) => {
    const isDeleted = await postsRepository.deletePosts(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})