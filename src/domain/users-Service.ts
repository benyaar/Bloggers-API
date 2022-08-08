import {usersRepository} from "../repositories/users-repository";
import {UsersType} from "../repositories/db";
import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";


export const usersService = {
    async createUser (login: string, password: string){

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)
        const newUser: UsersType = {
                    id: new ObjectId().toString(),
                    login: login,
            passwordSalt,
            passwordHash,

                }
                return usersRepository.createUser(newUser)
    },
    async findUsers(pageSize:number, pageNumber:number) {

        return await usersRepository.findUsers(pageSize, pageNumber)
    },
    async getCount() {

        return await usersRepository.getCount()
    },
    async deleteUsers(id:string){

        return await usersRepository.deleteUsers(id)
    },

    async _generateHash(password: string, salt: string){
        return await bcrypt.hash(password, salt)
    },
    async checkCredentials(login: string, password: string){
        const user = await usersRepository.findLogin(login)
        if (!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        return user.passwordHash === passwordHash;

    }
}