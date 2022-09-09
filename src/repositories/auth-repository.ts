import {tokenBlackListModal, usersModal, UsersDBType} from "./db";
import {WithId} from "mongodb";

export const authRepository = {
    async createUser(newUser: UsersDBType) {
        return  usersModal.insertMany(newUser)
    },
    async checkExistEmail (email:string){
         return  usersModal.findOne({email: email})
    },
    async checkExistLogin (login: string){
        return  usersModal.find({login: login})
    },
    async checkExistConfirmCode (code: string): Promise<WithId<UsersDBType> | null> {
        return  usersModal.findOne({"emailConfirmation.confirmationCode": code})
    },
    async updateConfirmation (id:string){
         return  usersModal.updateOne({id}, {$set: {'emailConfirmation.isConfirmed': true}})
    },
    async updateUnconfirmedEmailData(updateEmailConfirm: UsersDBType){
        return  usersModal.updateOne({email: updateEmailConfirm.email},{$set:
                {'emailConfirmation.isConfirmed': updateEmailConfirm.emailConfirmation.isConfirmed,
                    'emailConfirmation.expirationDate':updateEmailConfirm.emailConfirmation.expirationDate,
                    'emailConfirmation.confirmationCode':updateEmailConfirm.emailConfirmation.confirmationCode}})

    },
    async checkTokenInBlackList (refreshToken: string){
        return  tokenBlackListModal.findOne({refreshToken: refreshToken})
    },
    async addTokenInBlackList (refreshToken: string){
        return  tokenBlackListModal.insertMany({refreshToken})
    },

}