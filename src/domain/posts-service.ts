import {postsRepository} from "../repositories/posts-repository";



export const postsService = {
    async findPosts(pageNumber: number, pageSize: number) {
        return await postsRepository.findPosts(pageNumber, pageSize)
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
        // @ts-ignore
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
}