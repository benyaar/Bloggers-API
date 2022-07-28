import {bloggersRepository} from "../repositories/bloggers-repository";


export const bloggersService = {
    async findBloggers() {
        return await bloggersRepository.findBloggers()
    },
    async findBloggersById(id: number) {
        return await bloggersRepository.findBloggersById(id)

    },
    async createBloggers(name: string, youtubeUrl: string) {

        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
       return await bloggersRepository.createBloggers(newBlogger)

    },
    async updateBlogger(id: number, name: string, youtubeUrl: string) {
        return await bloggersRepository.updateBlogger(id, name, youtubeUrl)
    },
    async deleteBloggers(id: number) {

        return await bloggersRepository.deleteBloggers(id)
    }


}