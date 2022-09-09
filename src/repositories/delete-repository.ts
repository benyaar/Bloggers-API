import {attemptsModal, bloggersModal, commentsModal, postsModal, usersModal} from "./db";

export const deleteRepository = {

    async deleteAll(){
       await bloggersModal.deleteMany({})
        await  postsModal.deleteMany({})
        await usersModal.deleteMany({})
        await commentsModal.deleteMany({})
        await attemptsModal.deleteMany({})
        return true
    }
}