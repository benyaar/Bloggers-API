import {bloggersCollection, commentsCollection, db, postsCollection, usersCollection} from "./db";

export const deleteRepository = {

    async deleteAll(){
       await bloggersCollection.deleteMany({})
        await  postsCollection.deleteMany({})
        await usersCollection.deleteMany({})
        await commentsCollection.deleteMany({})
        return true
    }
}