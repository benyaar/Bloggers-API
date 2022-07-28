import {bloggersCollection} from "./db";



export const bloggersRepository = {
    async findBloggers() {
        const result = await bloggersCollection.find().toArray()
        return result
    },
    async findBloggersById(id: number) {
        return await bloggersCollection.findOne({id: id})

    },
    async createBloggers(name: string, youtubeUrl: string) {

        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        await bloggersCollection.insertOne(newBlogger)
        return newBlogger
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string) {
        const result = await bloggersCollection.updateOne({id: id}, {
            $set: {
                name: name,
                youtubeUrl: youtubeUrl
            }
        })
        return result.matchedCount === 1
    },
    async deleteBloggers(id: number) {

        const result = await bloggersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }


}