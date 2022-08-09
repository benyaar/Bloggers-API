import {commentsCollection} from "./db";

const options = {
    projection: {
        _id: 0,
    }
}

export const commentRepository = {
    async createComment(newComment: any) {
        await commentsCollection.insertOne(newComment)
        const {id, content, userId, userLogin, addedAt} = newComment
        return {id, content, userId, userLogin, addedAt}
    },
    async findComment(id:string){
        return await commentsCollection.findOne({id: id}, options)
    }
}