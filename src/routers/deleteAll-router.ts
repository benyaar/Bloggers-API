import {Request, Response, Router} from "express";
import {deleteService} from "../domain/delete-service";

export const deleteAllRouter = Router({})

deleteAllRouter.delete('/all-data',
    async (req:Request, res:Response) =>{
        await deleteService.deleteAll()
        res.sendStatus(204)


    })