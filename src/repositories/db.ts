import {MongoClient} from "mongodb";
import add from "date-fns/add";


export type BloggersType = {
    id: string
    name: string
    youtubeUrl: string
}

export type PostsType = {
    id: string
    title: string
    shortDescription: string
    content: string
    bloggerId: string
    bloggerName: string
}
export type UsersType = {
    id: string
    login:string
    passwordHash: string
    passwordSalt: string
}
export type CommentsType = {
    id: string
    content:string
}
export type UsersDBType = {
    id: string
    login:string
    email: string
    createdDat: Date
    passwordHash: string
    passwordSalt: string
    emailConfirmation:  EmailConfirmationType
}
export type  EmailConfirmationType = {
        confirmationCode: string ,
        expirationDate: Date,
         isConfirmed: boolean
}

export type AttemptType = {
    userIP: string
    url: string
    time: Date
}

export type TokenBlackList = {
   refreshToken: string
}

const mongoUri = process.env.mongoURI || "mongodb+srv://admin:admin@cluster0.9zvor.mongodb.net/bloggersList?retryWrites=true&w=majority"

const client = new MongoClient(mongoUri)
export const db = client.db("bloggersList")
export const bloggersCollection = db.collection<BloggersType>("bloggers")
export const postsCollection = db.collection<PostsType>("posts")
export const usersCollection = db.collection<UsersDBType>("users")
export const commentsCollection = db.collection<CommentsType>("comments")
export const attemptsCollection = db.collection<AttemptType>("attempts")
export const tokenBlackList = db.collection<TokenBlackList>("tokenBlackList")

export async function  runDb() {

    try {
        await client.connect()
        await client.db("bloggersList").command({ping:1})
        console.log("Connected successfully to mongo server")
    }
    catch{
        await client.close()
    }
}