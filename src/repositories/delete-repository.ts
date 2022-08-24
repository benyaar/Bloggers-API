import {attemptsCollection, bloggersCollection, commentsCollection, db, postsCollection, usersCollection} from "./db";

export const deleteRepository = {

    async deleteAll(){
       await bloggersCollection.deleteMany({})
        await  postsCollection.deleteMany({})
        await usersCollection.deleteMany({})
        await commentsCollection.deleteMany({})
        await attemptsCollection.deleteMany({})
        return true
    }
}