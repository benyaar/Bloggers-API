import {Request, Response, Router} from "express";
import {commentService} from "../domain/comment-service";
import {authMiddlewareBearer, checkTokenMiddleware} from "../middleWare/authValidation";
import {
    commentValidation, likeValidator,
} from "../validators/validators";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";
import {postsService} from "../domain/posts-service";



export const commentsRouter = Router({})

commentsRouter.get('/:id', checkTokenMiddleware, async (req: Request, res: Response) => {
    const comment =  await commentService.findCommentByIdWithLikes(req.params.id, req.user?.id)
    if (!comment) return res.sendStatus(404)
    res.send(comment)


})
commentsRouter.delete('/:id', authMiddlewareBearer, async (req: Request, res: Response) => {
    let comment = await commentService.findComment(req.params.id)
    let user = await commentService.findUser(req.user!.id, req.params.id)
    if (!comment){
        res.sendStatus(404)
    }

    if(user){
        const isDeleted = await commentService.deleteComment(req.params.id)
        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    }else{
        res.sendStatus(403)
    }
})
commentsRouter.put('/:commentId',authMiddlewareBearer, commentValidation, inputValidationMiddleWare, async (req: Request, res: Response) => {
    let comment = await commentService.findComment(req.params.commentId)
    let user = await commentService.findUser(req.user!.id, req.params.commentId)
    if (!comment) {
        return res.status(404).send({errorsMessages: [{message: 'Invalid comment', field: "comment"}]})
        }
    if (user){
        const isUpdate = await commentService.updateComment(req.body.content, req.params.commentId)
        if (isUpdate) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    } else {
        res.sendStatus(403)
    }


})
commentsRouter.put('/:commentId/like-status',authMiddlewareBearer,likeValidator, inputValidationMiddleWare, async (req: Request, res: Response) => {
    const findComment = await commentService.findComment(req.params.commentId)
    if (findComment) {
        const createLikeStatus = await postsService.createLikeStatus(req.params.commentId, req.body.likeStatus, req.user!.id, req.user!.login)

        res.status(204).send(createLikeStatus)
    } else {
        res.sendStatus(404)
    }
})