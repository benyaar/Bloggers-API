import {tokenBlackList, usersCollection, UsersDBType} from "./db";
import {WithId} from "mongodb";

export const authRepository = {
    async createUser(newUser: UsersDBType) {
        return await usersCollection.insertOne(newUser)
    },
    async checkExistEmail (email:string){
         return await usersCollection.findOne({email: email})
    },
    async checkExistLogin (login: string){
        return await usersCollection.find({login: login}).toArray()
    },
    async checkExistConfirmCode (code: string): Promise<WithId<UsersDBType> | null> {
        return await usersCollection.findOne({"emailConfirmation.confirmationCode": code})
    },
    async updateConfirmation (id:string){
         return await usersCollection.updateOne({id}, {$set: {'emailConfirmation.isConfirmed': true}})
    },
    async updateUnconfirmedEmailData(uptateEmailConfirm: UsersDBType){
        return await usersCollection.updateOne({email: uptateEmailConfirm.email},{$set:
                {'emailConfirmation.isConfirmed': uptateEmailConfirm.emailConfirmation.isConfirmed,
                    'emailConfirmation.expirationDate':uptateEmailConfirm.emailConfirmation.expirationDate,
                    'emailConfirmation.confirmationCode':uptateEmailConfirm.emailConfirmation.confirmationCode}})

    },
    async checkTokenInBlackList (refreshToken: string){
        return await tokenBlackList.findOne({refreshToken: refreshToken})
    },
    async addTokenInBlackList (refreshToken: string){
        return await tokenBlackList.insertOne({refreshToken})
    },

}