import {usersCollection, UsersType} from "./db";

export const authRepository = {
    async createUser(newUser: UsersType) {
        return await usersCollection.insertOne(newUser)
    },
    async checkExistLoginOrEmail (login: string, email:string){
         return await usersCollection.find({$or: [{login: login}, {email: email}]}).toArray()
    }
}