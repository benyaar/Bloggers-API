import {Request, Response, Router} from "express";
import {bloggers} from "./bloggers-router";

let posts = [
    {
        id: 1,
        title: "All about JS",
        shortDescription: "JS",
        content: "post",
        bloggerId: 1,
        bloggerName: "Brendan Eich"
    }
]

export const postsRouter = Router ({})

postsRouter.get('/', (req: Request, res: Response) => {
    res.send(posts)
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
    const newPosts = {
        id: +(new Date()),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerId: req.body.bloggerId,
        bloggerName: "Brendan Eich"
    }
    posts.push(newPosts)
    res.status(201).send(newPosts)
})
postsRouter.get('//:id', (req: Request, res: Response) => {
    let post = posts.find(p => p.id === +req.params.id)
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

    let post = posts.find(p => p.id === +req.params.id)
    if (post) {
        post.title = req.body.title
        post.shortDescription = req.body.shortDescription
        post.content = req.body.content
        post.bloggerId = req.body.bloggerId
        res.send(204)
    } else {
        res.send(404)
    }
})
postsRouter.delete('//:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const newPosts = posts.filter(p => p.id !== id)
    if (newPosts.length < posts.length) {
        posts = newPosts
        res.send(204)
    } else {
        res.send(404)
    }
})