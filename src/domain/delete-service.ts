import {deleteRepository} from "../repositories/delete-repository";


class DeleteService {
    async deleteAll () {
        return await deleteRepository.deleteAll()
    }
}
export const deleteService = new DeleteService()