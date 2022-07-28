import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {body} from "express-validator";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";
import {authMiddleware} from "../middleWare/authValidation";

export const bloggersRouter = Router({})


const nameValidation = body('name').trim().isLength({min: 1, max: 15}).trim()
const urlValidation = body('youtubeUrl').isURL().trim().isLength({min: 10, max: 100})

bloggersRouter.get('/',  async (req: Request, res: Response) => {
    const foundBloggers =  await bloggersRepository.findBloggers()
    res.send(foundBloggers)
})

bloggersRouter.post('/', authMiddleware,nameValidation, urlValidation, inputValidationMiddleWare, async (req: Request, res: Response) => {
    let name = req.body.name
    let youtubeUrl = req.body.youtubeUrl

    const newBlogger = await bloggersRepository.createBloggers(name, youtubeUrl)
    res.status(201).send(newBlogger)

})
bloggersRouter.get('/:id', async (req: Request, res: Response) => {
    const blogger = await bloggersRepository.findBloggersById(+req.params.id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }
})
bloggersRouter.put('/:id', authMiddleware, nameValidation, urlValidation, inputValidationMiddleWare,async (req: Request, res: Response) => {
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    const isUpdated = await bloggersRepository.updateBlogger(+req.params.id, name, youtubeUrl)
    if (isUpdated) {
        const blogger = await bloggersRepository.findBloggersById(+req.params.id)
        res.status(204).send(blogger)
    } else {
        res.send(404)
    }

})
bloggersRouter.delete('/:id',authMiddleware, async (req: Request, res: Response) => {
    const isDeleted = await bloggersRepository.deleteBloggers(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})