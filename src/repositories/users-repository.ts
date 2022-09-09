import {usersModal, UsersDBType} from "./db";


const options = {
    projection: {
        _id: 0,
        passwordHash: 0,
        passwordSalt: 0
    },
}

export const usersRepository = {

    async createUser(newUser: UsersDBType) {
     await usersModal.insertMany(newUser)
        const {id, login} = newUser
        return{
            id, login
        }
    },
    async findUsers(pageSize:number, pageNumber:number) {
        return  usersModal.find({}, options).skip((pageNumber-1)*pageSize).limit(pageSize)
    },
    async getCount(){
        return  usersModal.countDocuments()
    },
    async deleteUsers(id:string){
        const result = await usersModal.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async findLogin(login:string){
        return  usersModal.findOne({login: login})
    },
    async findUsersById(userId:string){
        return  usersModal.findOne({id: userId})
    }
}