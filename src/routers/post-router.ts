import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {bloggers} from "../repositories/bloggers-repository";




export const postsRouter = Router ({})

postsRouter.get('/', (req: Request, res: Response) => {
    const findPost = postsRepository.findPosts()
    res.send(findPost)
})
postsRouter.post('/', (req: Request, res: Response) => {
    let errorsMessages: { message: string; field: string; }[] = []

    if (!req.body.title || req.body.title.length > 30 || !req.body.title.trim()) {
        const error = {
            message: "invalid title", field: "title"
        }
        errorsMessages.push(error)
    }
    const bloggersID = bloggers.find(b => b.id === +req.body.bloggerId)
    if (!req.body.bloggerId || !bloggersID) {
        const error = {
            message: "invalid bloggerId", field: "bloggerId"
        }
        errorsMessages.push(error)
    }

    if (!req.body.shortDescription || req.body.shortDescription.length > 100 || !req.body.shortDescription.trim()) {
        const error = {
            message: "invalid shortDescription", field: "shortDescription"
        }
        errorsMessages.push(error)
    }
    if (!req.body.content || req.body.content.length > 1000 || !req.body.content.trim()) {
        const error = {
            message: "invalid content", field: "content"
        }
        errorsMessages.push(error)
    }
    if (errorsMessages.length > 0) {
        res.status(400).send({"errorsMessages": errorsMessages})
        return
    }

    const newPost = postsRepository.createPost(
        +req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.bloggerId)

    res.status(201).send(newPost)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const post = postsRepository.findPostById(+req.params.id)

    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
})
postsRouter.put('//:id', (req: Request, res: Response) => {
    let errorsMessages: { message: string; field: string; }[] = []

    if (!req.body.title || req.body.title.length > 30 || !req.body.title.trim()) {
        const error = {
            message: "invalid title", field: "title"
        }
        errorsMessages.push(error)
    }
    const bloggersID = bloggers.find(b => b.id === +req.body.bloggerId)
    if (!req.body.bloggerId || !bloggersID) {
        const error = {
            message: "invalid bloggerId", field: "bloggerId"
        }
        errorsMessages.push(error)
    }

    if (!req.body.shortDescription || req.body.shortDescription.length > 100 || !req.body.shortDescription.trim()) {
        const error = {
            message: "invalid shortDescription", field: "shortDescription"
        }
        errorsMessages.push(error)
    }
    if (!req.body.content || req.body.content.length > 1000 || !req.body.content.trim()) {
        const error = {
            message: "invalid content", field: "content"
        }
        errorsMessages.push(error)
    }
    if (errorsMessages.length > 0) {
        res.status(400).send({"errorsMessages": errorsMessages})
        return
    }
    const isUpdate = postsRepository.updatePost(+req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.bloggerId)
    if (isUpdate) {
        const post = postsRepository.findPostById(+req.params.id)
        res.status(204).send({post})
    }

})
postsRouter.delete('//:id', (req: Request, res: Response) => {
    const isDeleted = postsRepository.deletePosts(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})