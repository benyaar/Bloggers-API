import {postsRepository} from "../repositories/posts-repository";
import {ObjectId} from "mongodb";
import {PostsType} from "../repositories/db";




export const postsService = {
    async findPosts(pageSize:number, pageNumber:number) {
        return await postsRepository.findPosts(pageSize, pageNumber )
    },
    async findPostById(id: string) {
        return await postsRepository.findPostById(id)
    },
    async createPost(id: string, title: string, shortDescription: string, content: string, bloggerId: string) {
        const newPosts: PostsType = {
            id: new ObjectId().toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: "Brendan Eich",
            addedAt: new Date,
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                newestLikes: [
                    {
                    addedAt: new Date,
                    userId: "vasya",
                    login: "vasya",
                }
                ]
            }
        }
        return await postsRepository.createPost(newPosts)
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, bloggerId: string) {
        return await postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
    },
    async deletePosts(id: string) {
        return await postsRepository.deletePosts(id)
    },
    async getCount() {
        return await postsRepository.getCount()
    },
    async findBloggersPost(pageSize:number, pageNumber:number,bloggerId:string) {
        return await postsRepository.findBloggersPost(pageSize, pageNumber, bloggerId)
    },
    async getCountBloggerId(bloggerId: string) {
        return await postsRepository.getCountBloggerId(bloggerId)
    },
    async updateLikeStatus(postId: string, userId: string, login:string, likeStatus: string) {
        return await postsRepository.updateLikeStatus(postId, userId, login, likeStatus)
    },

}