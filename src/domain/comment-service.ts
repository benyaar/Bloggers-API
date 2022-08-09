import {ObjectId} from "mongodb";
import {postsRepository} from "../repositories/posts-repository";
import {commentRepository} from "../repositories/comment-repository";

export const commentService = {
    async createComment (comment: string, userId: string, userLogin:string){
        const newComment:any = {
            id: new ObjectId().toString(),
            content: comment,
            userId: userId,
            userLogin: userLogin,
            addedAt: new Date()
        }
        return await commentRepository.createComment(newComment)

    }
}