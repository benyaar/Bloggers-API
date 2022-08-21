import {usersCollection, UsersType} from "./db";

export const authRepository = {
    async createUser(newUser: UsersType) {
        await usersCollection.insertOne(newUser)
    },
}