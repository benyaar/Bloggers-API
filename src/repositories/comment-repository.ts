import {commentsModal} from "./db";



export const commentRepository = {
    async createComment(newComment: any) {
        await commentsModal.insertMany(newComment)
        const {id, content, userId, userLogin, addedAt} = newComment
        return {id, content, userId, userLogin, addedAt}
    },
    async findComment(id:string){
        return  commentsModal.findOne({id: id},  {_id:0, __v:0})
    },
    async findCommentWithPag(postId: string, pageSize:number, pageNumber:number){
        return  commentsModal.find({postId: postId},  {_id:0, __v:0}).skip((pageNumber-1)*pageSize).limit(pageSize)
    },
    async getCount(postId:string){
        return  commentsModal.count({postId: postId})
    },
    async deleteComment(id: string) {

        const result = await commentsModal.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async updateComment(content:string, id:string ){
        const result = await commentsModal.updateOne({id: id}, {
            $set: {
                content: content,
            }
        })
        return result.matchedCount === 1

    },
    async findUser(userId:string, commentId: string){
        return  commentsModal.findOne({userId: userId, id:commentId},  {_id:0, __v:0})
    },

}