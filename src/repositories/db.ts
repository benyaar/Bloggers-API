import {MongoClient} from "mongodb";
import mongoose from "mongoose";

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
    addedAt: Date,
    extendedLikesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: string,
        newestLikes:[
            {
            addedAt: Date,
            userId: string,
            login: string,
        }
        ]
    }
}
export type UsersType = {
    id: string
    login:string
    passwordHash: string
    passwordSalt: string
}
export type CommentsType = {
    id: string
    content: string
    userId: string,
    userLogin: string,
    addedAt: Date,
    postId: string,
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: string
    }
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
let dbName = process.env.mongoDBName || "bloggersList"

export const db = client.db("bloggersList")
//export const bloggersCollection = db.collection<BloggersType>("bloggers")
//export const postsCollection = db.collection<PostsType>("posts")
//export const usersCollection = db.collection<UsersDBType>("users")
//export const commentsCollection = db.collection<CommentsType>("comments")
//export const attemptsCollection = db.collection<AttemptType>("attempts")
//export const tokenBlackList = db.collection<TokenBlackList>("tokenBlackList")

const bloggersScheme = new mongoose.Schema<BloggersType>({
    id: String,
    name: String,
    youtubeUrl: String
})
const postsScheme  = new mongoose.Schema<PostsType>({
    id: String,
    title: String,
    shortDescription: String,
    content: String,
    bloggerId: String,
    bloggerName: String,
    addedAt: Date,
    extendedLikesInfo: {
        likesCount: Number,
        dislikesCount: Number,
        myStatus: String,
        newestLikes:[{
            addedAt: Date,
            userId: String,
            login: String,
        }]
    }

}, {_id : false})
const userScheme = new mongoose.Schema<UsersDBType>({
    id: String,
    login:String,
    email: String,
    createdDat: Date,
    passwordHash: String,
    passwordSalt: String,
    emailConfirmation:
        {confirmationCode: String,
        expirationDate: Date,
        isConfirmed: Boolean}
})
const commentsScheme = new mongoose.Schema<CommentsType>({
    id: String,
    content: String,
    userId: String,
    userLogin: String,
    addedAt: Date,
    postId: String,
    likesInfo: {
        likesCount: Number,
        dislikesCount: Number,
        myStatus: String
    }
}, {_id : false})
const attemptsScheme = new mongoose.Schema<AttemptType>({
    userIP: String,
    url: String,
    time: Date
})
const tokenBlackListScheme = new mongoose.Schema<TokenBlackList>({
    refreshToken: String
})


export const bloggersModal = mongoose.model("bloggers", bloggersScheme)
export const postsModal = mongoose.model("posts", postsScheme)
export const usersModal = mongoose.model("users", userScheme)
export const commentsModal = mongoose.model("comments", commentsScheme)
export const attemptsModal = mongoose.model("attempts", attemptsScheme)
export const tokenBlackListModal = mongoose.model("tokenBlackList", tokenBlackListScheme)


export async function  runDb() {

    try {
       await mongoose.connect(mongoUri)
        console.log("Connected successfully to mongoose server")
    }
    catch{
        await mongoose.disconnect()
    }
}