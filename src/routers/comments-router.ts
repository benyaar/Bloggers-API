import {Request, Response, Router} from "express";
import {commentService} from "../domain/comment-service";
import { authMiddlewareBearer} from "../middleWare/authValidation";
import {
    commentValidation,
} from "../validators/validators";
import {inputValidationMiddleWare} from "../middleWare/inputValidation";


export const commentsRouter = Router({})

commentsRouter.get('/:id', async (req: Request, res: Response) => {
    const comment = await commentService.findComment(req.params.id)
    if(comment){
        res.status(200).send(comment)
    } else {
        res.sendStatus(404)
    }

})
commentsRouter.delete('/:id', authMiddlewareBearer, async (req: Request, res: Response) => {
    const isDeleted = await commentService.deleteComment(req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
commentsRouter.put('/:commentId', commentValidation, inputValidationMiddleWare, authMiddlewareBearer, async (req: Request, res: Response) => {

    let comment = await commentService.findComment(req.params.commentId)
    if (!comment) {
        return res.status(400).send({errorsMessages: [{message: 'Invalid comment', field: "comment"}]})
    } else {
        const isUpdate = await commentService.updateComment(req.body.content, req.params.commentId)
        if (isUpdate) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }

})