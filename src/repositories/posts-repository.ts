import { postsCollection} from "./db";


export const postsRepository = {
   async findPosts(){
       return await postsCollection.find().toArray()
    },
   async findPostById(id:number){
    return await postsCollection.findOne({id: id})
    },
    async createPost(id:number, title:string,shortDescription:string, content:string, bloggerId:number){
        const newPosts = {
            id: +(new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: "Brendan Eich"
        }
        await postsCollection.insertOne(newPosts)
        return newPosts
    },
   async updatePost(id:number, title:string,shortDescription:string, content:string, bloggerId:number) {
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
   async deletePosts(id: number){

        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}