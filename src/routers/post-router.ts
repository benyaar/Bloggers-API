import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import { bloggersRepository} from "../repositories/bloggers-repository";
import {body} from "express-validator";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";
import {authMiddleware} from "../middleWare/authValidation";

const titleValidation = body('title').isLength({min: 1, max: 30})
const shortDescriptionValidation = body('shortDescription').isLength({min: 1, max: 100})
const contentValidation = body('content').isLength({min: 1, max: 1000})

export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    const findPost = postsRepository.findPosts()
    res.send(findPost)
})
postsRouter.post('/',authMiddleware, titleValidation, shortDescriptionValidation, contentValidation, inputValidationMiddleWare, (req: Request, res: Response) => {

    let blogger = bloggersRepository.findBloggersById(req.body.bloggerId)
    if (!blogger) {
        return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
    } else {
        const newPost = postsRepository.createPost(
            +req.params.id,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerId)

        res.status(201).send(newPost)
    }
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const post = postsRepository.findPostById(+req.params.id)

    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
})
postsRouter.put('/:id',authMiddleware,titleValidation, shortDescriptionValidation, contentValidation, inputValidationMiddleWare, (req: Request, res: Response) => {

    let blogger = bloggersRepository.findBloggersById(req.body.bloggerId)
    if (!blogger) {
        return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
    } else {
        const isUpdate = postsRepository.updatePost(+req.params.id,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerId)
        if (isUpdate) {
            const post = postsRepository.findPostById(+req.params.id)
            res.status(204).send({post})
        }
    }

})
postsRouter.delete('//:id',authMiddleware, (req: Request, res: Response) => {
    const isDeleted = postsRepository.deletePosts(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})