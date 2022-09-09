import {bloggersModal, BloggersType} from "./db";

const options = {
    projection: {
        _id: 0,
    }
}

export const bloggersRepository = {
    async findBloggers(pageSize:number, pageNumber:number, searchNameTerm:string): Promise <BloggersType>{
        return bloggersModal.find({name: {$regex: searchNameTerm}}, options).skip((pageNumber-1)*pageSize).limit(pageSize).lean()
    },


    async findBloggersById(id: string) {
        return bloggersModal.findOne({id: id}, options)

    },

    async createBloggers(newBlogger: BloggersType)   {

        await bloggersModal.insertMany([newBlogger])
        const {id, name, youtubeUrl} = newBlogger
        return {
            id, name, youtubeUrl
        }

    }
    ,
    async updateBlogger(id: string, name: string, youtubeUrl: string) {
        const result = await bloggersModal.updateOne({id: id}, {
            $set: {
                name: name,
                youtubeUrl: youtubeUrl
            }
        })
        return result.matchedCount === 1
    },
    async deleteBloggers(id: string) {

        const result = await bloggersModal.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async getCount(searchNameTerm: string) {
        return  bloggersModal.countDocuments({name: {$regex: searchNameTerm}})
    }


}