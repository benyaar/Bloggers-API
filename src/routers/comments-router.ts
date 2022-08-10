import {Request, Response, Router} from "express";
import {commentService} from "../domain/comment-service";
import {authMiddlewareBearer} from "../middleWare/authValidation";

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