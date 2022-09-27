import {Request, Response, Router} from "express";
import {deleteService} from "../domain/delete-service";

export const deleteAllRouter = Router({})

class DeleteAllController {
    async deleteALl (req:Request, res:Response) {
    await deleteService.deleteAll()
    res.sendStatus(204)


}
}
export const deleteAllInstance = new DeleteAllController()

deleteAllRouter.delete('/all-data', deleteAllInstance.deleteALl)