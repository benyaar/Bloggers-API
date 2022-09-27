import {usersRepository} from "../repositories/users-repository";
import {UsersDBType} from "../repositories/db";
import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";
import add from "date-fns/add";


class UsersService  {
    async createUser(login: string, password: string) {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)
        const newUser = new UsersDBType(
            new ObjectId().toString(),
            login,
            "test",
            new Date(),
            passwordSalt,
            passwordHash,
            {
                confirmationCode: "test",
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3,
                }),
                isConfirmed: false,
            }
        )
        return usersRepository.createUser(newUser)
    }
    async findUsers(pageSize: number, pageNumber: number) {

        return await usersRepository.findUsers(pageSize, pageNumber)
    }
    async getCount() {

        return await usersRepository.getCount()
    }
    async deleteUsers(id: string) {

        return await usersRepository.deleteUsers(id)
    }

    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    }
    async checkCredentials(login: string, password: string) {
        const user = await usersRepository.findLogin(login)
        if (!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            return false
        }
        return user

    }
    async findUsersById(userId: string) {
        return await usersRepository.findUsersById(userId)
    }
}
export const usersService = new UsersService()