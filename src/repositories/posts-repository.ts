import { postsModal, PostsType} from "./db";


export const postsRepository = {
    async findPosts(pageSize:number, pageNumber:number) {
        return  postsModal.find({}, {_id:0, __v:0}).skip((pageNumber-1)*pageSize).limit(pageSize)
    },
    async findPostById(id: string) {
        return  postsModal.findOne({id: id}, {_id:0, __v:0})
    },
    async createPost(newPosts: PostsType) {
        await postsModal.insertMany(newPosts)
        return newPosts

    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, bloggerId: string) {
        const result = await postsModal.updateOne({id: id}, {
            $set: {
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId,
            }
        })
        return result.matchedCount === 1
    },
    async deletePosts(id: string) {

        const result = await postsModal.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async getCount() {
        return  postsModal.count({})
    },
    async findBloggersPost(pageSize:number, pageNumber:number, bloggerId: string){
        return  postsModal.find({bloggerId: bloggerId},  {_id:0, __v:0}).skip((pageNumber-1)*pageSize).limit(pageSize)
    },
    async getCountBloggerId(bloggerId: string) {
        return  postsModal.count({bloggerId: bloggerId})
    },
}