import {Request, Response, Router} from "express";
import {commentService} from "../domain/comment-service";

export const commentsRouter = Router({})

commentsRouter.get('/:id', async (req: Request, res: Response) => {
    const comment = await commentService.findComment(req.params.id)
    if(comment){
        res.status(200).send(comment)
    } else {
        res.sendStatus(404)
    }

})
commentsRouter.delete('id',async (req: Request, res: Response) => {


})