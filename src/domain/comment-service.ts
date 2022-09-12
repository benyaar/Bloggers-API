import {ObjectId} from "mongodb";

import {commentRepository} from "../repositories/comment-repository";
import {CommentsType} from "../repositories/db";

export const commentService = {
    async createComment (comment: string, userId: string, userLogin:string, postId:string){
        const newComment: CommentsType = {
            id: new ObjectId().toString(),
            content: comment,
            userId: userId,
            userLogin: userLogin,
            addedAt: new Date(),
            postId: postId,
            likesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: 'none'
            }
        }
        return await commentRepository.createComment(newComment)
    },
    async findComment (id: string){
        return await commentRepository.findComment(id)
    },
    async findCommentWithPag (postId: string, pageSize:number, pageNumber:number){
        return await commentRepository.findCommentWithPag(postId, pageSize, pageNumber)
    },
    async getCount(postId:string){
        return await commentRepository.getCount(postId)
    },
    async deleteComment(id:string){
        return await commentRepository.deleteComment(id)
    },
    async updateComment(content: string, id:string){
        return await commentRepository.updateComment(content, id)
    },
    async findUser(userId:string, commentId:string){
        return await commentRepository.findUser(userId, commentId)
    },

}