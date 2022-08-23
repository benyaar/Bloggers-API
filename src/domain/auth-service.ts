import bcrypt from "bcrypt";
import {UsersDBType} from "../repositories/db";
import {ObjectId} from "mongodb";
import {authRepository} from "../repositories/auth-repository";

export const authService = {
    async createUser (login: string,email:string, password: string){

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)
        const newUser: UsersDBType = {
            id: new ObjectId().toString(),
            login: login,
            email: email,
            passwordSalt,
            passwordHash,
        }
        return authRepository.createUser(newUser)
    },
    async _generateHash(password: string, salt: string){
        return await bcrypt.hash(password, salt)
    },
    async checkExistEmail (email:string){
        return await authRepository.checkExistEmail(email)
    },
    async checkExistLogin (login: string){
        return await authRepository.checkExistLogin(login)
    }
 }