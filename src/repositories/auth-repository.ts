import {usersCollection, UsersType} from "./db";

export const authRepository = {
    async createUser(newUser: UsersType) {
        return await usersCollection.insertOne(newUser)
    },
    async checkExistEmail (email:string){
         return await usersCollection.find({email: email}).toArray()
    },
    async checkExistLogin (login: string){
        return await usersCollection.find({login: login}).toArray()
    }
}