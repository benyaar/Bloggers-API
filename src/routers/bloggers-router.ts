import {Request, Response, Router} from "express";
export let bloggers = [
    {
        id: 1,
        name: 'study',
        youtubeUrl: 'backend'
    },
    {
        id: 2,
        name: 'work',
        youtubeUrl: 'node'
    },
    {
        id: 3,
        name: 'relax',
        youtubeUrl: 'html'
    },
]
export const bloggersRouter = Router ({})


bloggersRouter.get('/', (req: Request, res: Response) => {
    const name = req.query.name
    if (name) {
        let searchString = name.toString()
        res.send(bloggers.filter(v => v.name.indexOf(searchString) > -1))
    } else {
        res.send(bloggers)
    }
})
bloggersRouter.post('/', (req: Request, res: Response) => {

    let errorsMessages: { message: string; field: string; }[] = []
    let pattern = /^https:\/\/([a-zA-Z\d_-]+\.)+[a-zA-Z\d_-]+(\/[a-zA-Z\d_-]+)*\/?$/

    if (!req.body.name || req.body.name.length > 15 || !req.body.name.trim()) {
        const error = {
            message: "invalid name", field: "name"
        }
        errorsMessages.push(error)
    }

    if (!req.body.youtubeUrl || req.body.youtubeUrl.length > 100 || !pattern.test(req.body.youtubeUrl)) {
        const error = {
            message: "invalid youtubeUrl", field: "youtubeUrl"
        }
        errorsMessages.push(error)

    }
    if (errorsMessages.length > 0) {
        res.status(400).send({"errorsMessages": errorsMessages})
        return
    }
    const newBloggers = {
        id: +(new Date()),
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }
    bloggers.push(newBloggers)
    res.status(201).send(newBloggers)


})
bloggersRouter.get('/:id', (req: Request, res: Response) => {
    let blogger = bloggers.find(b => b.id === +req.params.id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }
})
bloggersRouter.put('/:id', (req: Request, res: Response) => {
    let errorsMessages: { message: string; field: string; }[] = []
    let pattern = /^https:\/\/([a-zA-Z\d_-]+\.)+[a-zA-Z\d_-]+(\/[a-zA-Z\d_-]+)*\/?$/

    if (!req.body.name || req.body.name.length > 15 || !req.body.name.trim()) {
        const error = {
            message: "invalid name", field: "name"
        }
        errorsMessages.push(error)
    }

    if (!req.body.youtubeUrl || req.body.youtubeUrl.length > 100 || !pattern.test(req.body.youtubeUrl)) {
        const error = {
            message: "invalid youtubeUrl", field: "youtubeUrl"
        }
        errorsMessages.push(error)

    }
    if (errorsMessages.length > 0) {
        res.status(400).send({"errorsMessages": errorsMessages})
        return
    }

    let blogger = bloggers.find(b => b.id === +req.params.id)
    if (blogger) {
        blogger.name = req.body.name;
        blogger.youtubeUrl = req.body.youtubeUrl;
        res.status(204).send({blogger})
    } else {
        res.send(404)
    }
})
bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const newBloggers = bloggers.filter(b => b.id !== id)
    if (newBloggers.length < bloggers.length) {
        bloggers = newBloggers
        res.send(204)
    } else {
        res.send(404)
    }
})