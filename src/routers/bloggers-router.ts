import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";

export const bloggersRouter = Router ({})


bloggersRouter.get('/', (req: Request, res: Response) => {
  const foundBloggers = bloggersRepository.findBloggers(req.query.name ? req.query.name.toString(): null)
  res.send(foundBloggers)
})
bloggersRouter.post('/', (req: Request, res: Response) => {
    let name = req.body.name
    let youtubeUrl = req.body.youtubeUrl
    let errorsMessages: { message: string; field: string; }[] = []
    let pattern = /^https:\/\/([a-zA-Z\d_-]+\.)+[a-zA-Z\d_-]+(\/[a-zA-Z\d_-]+)*\/?$/

    if (!name|| name.length > 15 || !name.trim()) {
        const error = {
            message: "invalid name", field: "name"
        }
        errorsMessages.push(error)
    }

    if (!youtubeUrl || youtubeUrl.length > 100 || !pattern.test(youtubeUrl)) {
        const error = {
            message: "invalid youtubeUrl", field: "youtubeUrl"
        }
        errorsMessages.push(error)

    }
    if (errorsMessages.length > 0) {
        res.status(400).send({"errorsMessages": errorsMessages})
        return
    }
    const newBlogger = bloggersRepository.createBloggers(req.body.name, req.body.youtubeUrl)
    res.status(201).send({newBlogger})

})
bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const blogger = bloggersRepository.findBloggersById(+req.params.id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }
})
bloggersRouter.put('/:id', (req: Request, res: Response) => {
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    let errorsMessages: { message: string; field: string; }[] = []
    let pattern = /^https:\/\/([a-zA-Z\d_-]+\.)+[a-zA-Z\d_-]+(\/[a-zA-Z\d_-]+)*\/?$/

    if (!name || name.length > 15 || !name.trim()) {
        const error = {
            message: "invalid name", field: "name"
        }
        errorsMessages.push(error)
    }

    if (!youtubeUrl || youtubeUrl.length > 100 || !pattern.test(youtubeUrl)) {
        const error = {
            message: "invalid youtubeUrl", field: "youtubeUrl"
        }
        errorsMessages.push(error)
    }
    if (errorsMessages.length > 0) {
        res.status(400).send({"errorsMessages": errorsMessages})
        return
    }

    const isUpdated = bloggersRepository.updateBlogger(+req.params.id, name, youtubeUrl)
    if (isUpdated) {
        const blogger = bloggersRepository.findBloggersById(+req.params.id)
        res.status(204).send({blogger})
    }

})
bloggersRouter.delete('/:id', (req: Request, res: Response) => {
   const isDeleted = bloggersRepository.deleteBloggers(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})