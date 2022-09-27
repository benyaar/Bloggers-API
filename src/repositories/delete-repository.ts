import {attemptsModal, bloggersModal, commentsModal, postsModal, usersModal} from "./db";

class DeleteRepository{

    async deleteAll(){
       await bloggersModal.deleteMany({})
        await  postsModal.deleteMany({})
        await usersModal.deleteMany({})
        await commentsModal.deleteMany({})
        await attemptsModal.deleteMany({})
        return true
    }
}
export const deleteRepository = new DeleteRepository()