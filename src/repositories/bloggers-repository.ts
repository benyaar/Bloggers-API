import {bloggersCollection, BloggersType} from "./db";

const options = {
    projection: {
        _id: 0,
    }
}

export const bloggersRepository = {
    async findBloggers(pageSize:number, pageNumber:number, searchNameTerm:string | null) {
        let filter = {}

        if(searchNameTerm) {
            filter = {$regex: searchNameTerm}
        }

        return await bloggersCollection.find({name: filter}, options).skip((pageNumber-1)*pageSize).limit(pageSize).toArray()
    },


    async findBloggersById(id: number) {
        return await bloggersCollection.findOne({id: id}, options)

    },

    async createBloggers(newBlogger: BloggersType) {

        await bloggersCollection.insertOne(newBlogger)
        const {id, name, youtubeUrl} = newBlogger
        return {
            id, name, youtubeUrl
        }

    }
    ,
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
    },
    async getCount(searchNameTerm: string | null) {
        return await bloggersCollection.countDocuments({name: {$regex: searchNameTerm}})
    }


}