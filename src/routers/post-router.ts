import {Request, Response, Router} from "express";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";
import {authMiddleware, authMiddlewareBearer, checkTokenMiddleware} from "../middleWare/authValidation";
import {bloggersService} from "../domain/bloggers-service";
import {postsService} from "../domain/posts-service";
import {
    commentValidation,
    contentValidation, likeValidator,
    shortDescriptionValidation,
    titleValidation
} from "../validators/validators";
import {commentService} from "../domain/comment-service";



export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {

    const pageSize: number = Number(req.query.PageSize) || 10
    const pageNumber: number = Number(req.query.PageNumber) || 1


    const findPost = await postsService.findPosts(pageSize, pageNumber)
    const getCount = await postsService.getCount()
    res.send({
        "pagesCount": Math.ceil(getCount / pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": getCount,
        "items": findPost
    })
})
postsRouter.post('/', authMiddleware, titleValidation, shortDescriptionValidation, contentValidation, inputValidationMiddleWare, async (req: Request, res: Response) => {

    let blogger = await bloggersService.findBloggersById(req.body.bloggerId)
    if (!blogger) {
        return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
    } else {
        const newPost = await postsService.createPost(
            req.params.id,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerId)

        res.status(201).send(newPost)
    }
})
postsRouter.get('/:id', checkTokenMiddleware,  async (req: Request, res: Response) => {
    //console.log('post router, get post with likes, userId:', req.user!.id)
    const post = await postsService.findPostByIdWithLikes(req.params.id, req.user?.id)
    if (!post) return res.sendStatus(404)
     res.send(post)


})
postsRouter.put('/:id', authMiddleware, titleValidation, shortDescriptionValidation, contentValidation, inputValidationMiddleWare, async (req: Request, res: Response) => {

    let blogger = await bloggersService.findBloggersById(req.body.bloggerId)
    if (!blogger) {
        return res.status(400).send({errorsMessages: [{message: 'Invalid bloggerId', field: "bloggerId"}]})
    } else {
        const isUpdate = await postsService.updatePost(req.params.id,
            req.body.title,
            req.body.shortDescription,
            req.body.content,
            req.body.bloggerId)
        if (isUpdate) {
            const post = await postsService.findPostById(req.params.id)
            res.status(204).send({post})
        } else {
            res.send(404)
        }
    }

})
postsRouter.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const isDeleted = await postsService.deletePosts(req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
postsRouter.post('/:postId/comments',authMiddlewareBearer, commentValidation, inputValidationMiddleWare,  async (req: Request, res: Response) => {
        const post = await postsService.findPostById(req.params.postId)

        if (post) {
            const newComment = await commentService.createComment(req.body.content, req.user!.id, req.user!.login, req.params.postId)
            res.status(201).send(newComment)
        } else {
            res.send(404)
        }
    }
)
postsRouter.get('/:postId/comments', async (req: Request, res: Response) => {
    const pageSize: number = Number(req.query.PageSize) || 10
    const pageNumber: number = Number(req.query.PageNumber) || 1

    const findPost = await postsService.findPostById(req.params.postId)
    if (findPost) {
        const findComment = await commentService.findCommentWithPag(req.params.postId, pageSize, pageNumber)
        const getCount = await commentService.getCount(req.params.postId)
        const result = {
            "pagesCount": Math.ceil(getCount / pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": getCount,
            "items": findComment
        }
        res.send(result)
    } else {
        res.sendStatus(404)
    }
})
postsRouter.put('/:postId/like-status',authMiddlewareBearer,likeValidator, inputValidationMiddleWare, async (req: Request, res: Response) => {
    const findPost = await postsService.findPostById(req.params.postId)
    if(findPost){
        const createLikeStatus = await postsService.createLikeStatus(req.params.postId,req.body.likeStatus,req.user!.id, req.user!.login )

        // const isUpdate = await postsService.updateLikeStatus(req.params.postId, req.user!.id, req.user!.login, req.body.likeStatus)
        res.status(204).send(createLikeStatus)
    }else {
        res.sendStatus(404)
    }



})