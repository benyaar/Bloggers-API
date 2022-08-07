import { usersCollection, UsersType} from "./db";

const options = {
    projection: {
        _id: 0,
    }
}

export const usersRepository = {

    async createUser(newUser: UsersType) {
     await usersCollection.insertOne(newUser)
        const {id, login} = newUser
        return{
            id, login
        }
    },
    async findUsers(pageSize:number, pageNumber:number) {
        return await usersCollection.find({}, options).skip((pageNumber-1)*pageSize).limit(pageSize).toArray()
    },
    async getCount(){
        return await usersCollection.countDocuments()
    },
    async deleteBloggers(id:string){
        const result = await usersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}