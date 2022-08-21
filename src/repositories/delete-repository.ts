import {bloggersCollection, commentsCollection, postsCollection, usersCollection} from "./db";

export const deleteRepository = {

    async deleteAll(){
          await usersCollection.drop()
          await bloggersCollection.drop()
          await postsCollection.drop()
          await commentsCollection.drop()
        return
    }
}