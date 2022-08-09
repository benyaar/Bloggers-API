import {commentsCollection} from "./db";


export const commentRepository = {
    async createComment(newComment: any) {
        await commentsCollection.insertOne(newComment)
        const {id, content, userId, userLogin, addedAt} = newComment
        return {id, content, userId, userLogin, addedAt}
    },
}