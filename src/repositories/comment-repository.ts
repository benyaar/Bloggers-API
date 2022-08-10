import {commentsCollection} from "./db";

const options = {
    projection: {
        _id: 0,
        postId: 0
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
    },
    async findCommentWithPag(postId: string, pageSize:number, pageNumber:number){
        return await commentsCollection.find({postId: postId}, options).skip((pageNumber-1)*pageSize).limit(pageSize).toArray()
    },
    async getCount(postId:string){
        return await commentsCollection.count({postId: postId})
    },
    async deleteComment(id: string) {

        const result = await commentsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
}