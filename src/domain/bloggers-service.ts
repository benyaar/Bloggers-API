import {bloggersRepository} from "../repositories/bloggers-repository";


export const bloggersService = {
    async findBloggers(pageSize:number, pageNumber:number) {
        return await bloggersRepository.findBloggers(pageSize, pageNumber)
    },
    async findBloggersById(id: number) {
        return await bloggersRepository.findBloggersById(id)

    },
    async createBloggers(name: string, youtubeUrl: string) {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl,
        }
        // @ts-ignore
        return await bloggersRepository.createBloggers(newBlogger)
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string) {
        return await bloggersRepository.updateBlogger(id, name, youtubeUrl)
    },
    async deleteBloggers(id: number) {
        return await bloggersRepository.deleteBloggers(id)
    },
    async getCount() {
        return await bloggersRepository.getCount()
    },



}