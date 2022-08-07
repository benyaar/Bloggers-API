
import {usersRepository} from "../repositories/users-repository";
import {UsersType} from "../repositories/db";
import {ObjectId} from "mongodb";




export const usersService = {
    async createUser (login: string){
       const newUser: UsersType = {
           id: new ObjectId().toString(),
           login: login,
       }
       return await usersRepository.createUser(newUser)

    },
    async findUsers(pageSize:number, pageNumber:number) {

        return await usersRepository.findUsers(pageSize, pageNumber)
    },
    async getCount() {

        return await usersRepository.getCount()
    },
    async deleteUsers(id:string){

        return await usersRepository.deleteBloggers(id)
    }

}