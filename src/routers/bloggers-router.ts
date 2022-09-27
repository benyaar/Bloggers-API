import {Request, Response, Router} from "express";
import {bloggersService} from "../domain/bloggers-service";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";
import {authMiddleware, checkTokenMiddleware} from "../middleWare/authValidation";
import {toString} from "express-validator/src/utils";
import {postsService} from "../domain/posts-service";
import {
    nameValidation,
    urlValidation,
    contentValidation,
    shortDescriptionValidation,
    titleValidation
} from "../validators/validators";


export const bloggersRouter = Router({})

class BloggersController {
    async getBloggers(req: Request, res: Response) {
        const pageSize: number = Number(req.query.PageSize) || 10
        const pageNumber: number = Number(req.query.PageNumber) || 1
        const searchNameTerm = toString(req.query.SearchNameTerm)
        const foundBloggers = await bloggersService.findBloggers(pageSize, pageNumber, searchNameTerm)
        const getCount = await bloggersService.getCount(searchNameTerm)

        res.send({
            "pagesCount": Math.ceil(getCount / pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": getCount,
            "items": foundBloggers
        })
    }

    async createBlogger(req: Request, res: Response) {
        let name = req.body.name
        let youtubeUrl = req.body.youtubeUrl

        const newBlogger = await bloggersService.createBloggers(name, youtubeUrl)
        res.status(201).send(newBlogger)
    }

    async getBlogger(req: Request, res: Response) {
        const blogger = await bloggersService.findBloggersById(req.params.id)
        if (blogger) {
            res.send(blogger)
        } else {
            res.send(404)
        }
    }
    async updateBlogger(req: Request, res: Response) {
        const name = req.body.name
        const youtubeUrl = req.body.youtubeUrl
        const isUpdated = await bloggersService.updateBlogger(req.params.id, name, youtubeUrl)
        if (!isUpdated) return res.send(404)
            const blogger = await bloggersService.findBloggersById(req.params.id)
            res.status(204).send(blogger)
    }

    async deleteBlogger(req: Request, res: Response) {
        const isDeleted = await bloggersService.deleteBloggers(req.params.id)
        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    }

    async createBloggerPost(req: Request, res: Response) {
        let blogger = await bloggersService.findBloggersById(req.params.bloggerId)
        if (!blogger) {
            return res.status(404).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
        } else {
            const newPost = await postsService.createPost(
                req.params.id,
                req.body.title,
                req.body.shortDescription,
                req.body.content,
                req.params.bloggerId)

            res.status(201).send(newPost)
        }
    }
    async getBloggerPosts(req: Request, res: Response) {
        const blogger = await bloggersService.findBloggersById(req.params.bloggerId)
        if (!blogger) return res.sendStatus(404)
        const pageSize: number = Number(req.query.PageSize) || 10
        const pageNumber: number = Number(req.query.PageNumber) || 1
        const bloggerPostsWithLikes = await postsService.findBloggersPostWithLikes(pageSize, pageNumber, blogger.id, req.user?.id)
        return res.send(bloggerPostsWithLikes)
    }
}

export const bloggersControllerInstance = new BloggersController()

bloggersRouter.get('/', bloggersControllerInstance.getBloggers)
bloggersRouter.post('/', authMiddleware, nameValidation, urlValidation, inputValidationMiddleWare,bloggersControllerInstance.createBlogger)
bloggersRouter.get('/:id', bloggersControllerInstance.getBlogger)
bloggersRouter.put('/:id', authMiddleware, nameValidation, urlValidation, inputValidationMiddleWare, bloggersControllerInstance.updateBlogger)
bloggersRouter.delete('/:id', authMiddleware, bloggersControllerInstance.deleteBlogger)
bloggersRouter.post('/:bloggerId/posts', authMiddleware, titleValidation, shortDescriptionValidation, contentValidation, inputValidationMiddleWare, bloggersControllerInstance.createBloggerPost)
bloggersRouter.get('/:bloggerId/posts', checkTokenMiddleware, bloggersControllerInstance.getBloggerPosts)

