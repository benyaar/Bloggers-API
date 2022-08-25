import {usersCollection, UsersDBType, UsersType} from "./db";
import {WithId} from "mongodb";

export const authRepository = {
    async createUser(newUser: UsersDBType) {
        return await usersCollection.insertOne(newUser)
    },
    async checkExistEmail (email:string){
         return await usersCollection.find({email: email}).toArray()
    },
    async checkExistLogin (login: string){
        return await usersCollection.find({login: login}).toArray()
    },
    async checkExistConfirmCode (code: string): Promise<WithId<UsersDBType> | null> {
        return await usersCollection.findOne({"emailConfirmation.confirmationCode": code})
    },
    async updateConfirmation (id:string){
         return await usersCollection.updateOne({id}, {$set: {'emailConfirmation.isConfirmed': true}})
    }
}