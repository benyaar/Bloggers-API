import {postsCollection, PostsType} from "./db";

const options = {
    projection: {
        _id: 0,
    }
}
export const postsRepository = {
    async findPosts() {
        return await postsCollection.find({}, options).toArray()
    },
    async findPostById(id: number) {
        return await postsCollection.findOne({id: id}, options)
    },
    async createPost(newPosts: PostsType) {
        await postsCollection.insertOne(newPosts)
        return newPosts
    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        const result = await postsCollection.updateOne({id: id}, {
            $set: {
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId,
            }
        })
        return result.matchedCount === 1
    },
    async deletePosts(id: number) {

        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}