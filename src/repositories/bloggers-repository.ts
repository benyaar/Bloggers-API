import {bloggersCollection, BloggersType} from "./db";
const options = {
    projection: {
        _id: 0,
    }
}

export const bloggersRepository = {
    async findBloggers() {
        return await bloggersCollection.find({}, options).toArray()
    },
    async findBloggersById(id: number) {
        return await bloggersCollection.findOne({id: id}, options)

    },
    async createBloggers(newBlogger: BloggersType) {

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