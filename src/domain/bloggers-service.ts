import {bloggersRepository} from "../repositories/bloggers-repository";
import {ObjectId} from "mongodb";
import {BloggersType} from "../repositories/db";


 class BloggersService {
    async findBloggers(pageSize:number, pageNumber:number, searchNameTerm:string): Promise<BloggersType> {
        return await bloggersRepository.findBloggers(pageSize, pageNumber, searchNameTerm)
    }
    async findBloggersById(id: string) {
        return await bloggersRepository.findBloggersById(id)
    }
    async createBloggers(name: string, youtubeUrl: string) {
        const newBlogger = new BloggersType (
            new ObjectId().toString(),
            name,
            youtubeUrl,
        )
        return await bloggersRepository.createBloggers(newBlogger)
    }
    async updateBlogger(id: string, name: string, youtubeUrl: string) {
        return await bloggersRepository.updateBlogger(id, name, youtubeUrl)
    }
    async deleteBloggers(id: string) {
        return await bloggersRepository.deleteBloggers(id)
    }
    async getCount(searchNameTerm:string) {
        return await bloggersRepository.getCount(searchNameTerm)
    }
}
export const bloggersService = new BloggersService()
  
