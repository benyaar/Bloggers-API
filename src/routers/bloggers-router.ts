import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {body} from "express-validator";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";

export const bloggersRouter = Router({})


const nameValidation = body('name').isLength({min: 1, max: 15})
const urlValidation = body('youtubeUrl').isURL().isLength({min: 10, max: 100})

bloggersRouter.get('/', (req: Request, res: Response) => {
    const foundBloggers = bloggersRepository.findBloggers(req.query.name ? req.query.name.toString() : null)
    res.send(foundBloggers)
})

bloggersRouter.post('/', nameValidation, urlValidation, inputValidationMiddleWare, (req: Request, res: Response) => {
        let name = req.body.name
        let youtubeUrl = req.body.youtubeUrl

        const newBlogger = bloggersRepository.createBloggers(name, youtubeUrl)
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
bloggersRouter.put('/:id', nameValidation, urlValidation, inputValidationMiddleWare,(req: Request, res: Response) => {
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
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