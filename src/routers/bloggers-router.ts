import {Request, Response, Router} from "express";
import {bloggersService} from "../domain/bloggers-service";
import {body} from "express-validator";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";
import {authMiddleware} from "../middleWare/authValidation";
import {toString} from "express-validator/src/utils";

export const bloggersRouter = Router({})


const nameValidation = body('name').trim().isLength({min: 1, max: 15}).trim()
const urlValidation = body('youtubeUrl').isURL().trim().isLength({min: 10, max: 100})

bloggersRouter.get('/', async (req: Request, res: Response) => {

    const pageSize: number = Number(req.query.PageSize) || 10
    const pageNumber: number = Number(req.query.PageNumber) || 1
    const searchNameTerm: string = toString(req.query.SearchNameTerm ) || ''


    const foundBloggers = await bloggersService.findBloggers(pageSize, pageNumber,searchNameTerm )
    const getCount = await bloggersService.getCount()


    res.send({
        "pagesCount": Math.ceil(getCount / pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": getCount,
        "items": foundBloggers
    })
})

bloggersRouter.post('/', authMiddleware, nameValidation, urlValidation, inputValidationMiddleWare, async (req: Request, res: Response) => {
    let name = req.body.name
    let youtubeUrl = req.body.youtubeUrl

    const newBlogger = await bloggersService.createBloggers(name, youtubeUrl)
    res.status(201).send(newBlogger)

})
bloggersRouter.get('/:id', async (req: Request, res: Response) => {
    const blogger = await bloggersService.findBloggersById(+req.params.id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }
})
bloggersRouter.put('/:id', authMiddleware, nameValidation, urlValidation, inputValidationMiddleWare, async (req: Request, res: Response) => {
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    const isUpdated = await bloggersService.updateBlogger(+req.params.id, name, youtubeUrl)
    if (isUpdated) {
        const blogger = await bloggersService.findBloggersById(+req.params.id)
        res.status(204).send(blogger)
    } else {
        res.send(404)
    }

})
bloggersRouter.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const isDeleted = await bloggersService.deleteBloggers(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})