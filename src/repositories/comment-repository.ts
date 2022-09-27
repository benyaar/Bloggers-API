import {commentsModal} from "./db";

const options = {
    _id:0,
    __v:0,
    postId:0
}

class CommentRepository {
    async createComment(newComment: any) {
        await commentsModal.insertMany(newComment)
        const  newCommentCopy = {...newComment}
        delete newCommentCopy.postId
        return  newCommentCopy
    }
    async findComment(id:string){
        return  commentsModal.findOne({id: id}, options)
    }
    async findCommentWithPag(postId: string, pageSize:number, pageNumber:number){
        return  commentsModal.find({postId: postId}, options).skip((pageNumber-1)*pageSize).limit(pageSize)
    }
    async getCount(postId:string){
        return  commentsModal.count({postId: postId})
    }
    async deleteComment(id: string) {

        const result = await commentsModal.deleteOne({id: id})
        return result.deletedCount === 1
    }
    async updateComment(content:string, id:string ){
        const result = await commentsModal.updateOne({id: id}, {
            $set: {
                content: content,
            }
        })
        return result.matchedCount === 1

    }
    async findUser(userId:string, commentId: string){
        return  commentsModal.findOne({userId: userId, id:commentId}, options)
    }

}
export const commentRepository = new CommentRepository()
