import {deleteRepository} from "../repositories/delete-repository";


export const deleteService = {
    async deleteAll () {
        return await deleteRepository.deleteAll()
    }
}