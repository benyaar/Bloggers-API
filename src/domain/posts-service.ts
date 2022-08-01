import {postsRepository} from "../repositories/posts-repository";
import {postsCollection} from "../repositories/db";
import {isNumberObject} from "util/types";




export const postsService = {
    async findPosts(pageSize:number, pageNumber:number) {
        return await postsRepository.findPosts(pageSize, pageNumber )
    },
    async findPostById(id: number) {
        return await postsRepository.findPostById(id)
    },
    async createPost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        const newPosts = {
            id: +(new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: "Brendan Eich"
        }
        return await postsRepository.createPost(newPosts)

    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        return await postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
    },
    async deletePosts(id: number) {
        return await postsRepository.deletePosts(id)
    },
    async getCount() {
        return await postsRepository.getCount()
    },
    async findBloggersPost(pageSize:number, pageNumber:number,bloggerId:number) {
        return await postsRepository.findBloggersPost(pageSize, pageNumber, bloggerId)
    },
    async getCountBloggerId(bloggerId: number) {
        return await postsRepository.getCountBloggerId(bloggerId)
    },
}