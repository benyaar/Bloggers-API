import {MongoClient} from "mongodb";
import mongoose from "mongoose";

export class BloggersType {
    constructor(
        public id: string,
        public name: string,
        public youtubeUrl: string) {
    }
}

export class PostsType {
    constructor(
        public id: string,
        public title: string,
        public shortDescription: string,
        public content: string,
        public bloggerId: string,
        public bloggerName: string,
        public addedAt: Date,
        public extendedLikesInfo: {
            likesCount: number,
            dislikesCount: number,
            myStatus: string,
            newestLikes: []
        }
    ) {
    }
}

export class CommentsType {
    constructor(
        public id: string,
        public content: string,
        public userId: string,
        public userLogin: string,
        public addedAt: Date,
        public postId: string,
        public likesInfo: {
            likesCount: number,
            dislikesCount: number,
            myStatus: string
        }
    ) {
    }
}

export class UsersDBType {
    constructor(
        public id: string,
        public login: string,
        public email: string,
        public createdDat: Date,
        public passwordHash: string,
        public passwordSalt: string,
        public emailConfirmation: {
            confirmationCode: string,
            expirationDate: Date,
            isConfirmed: boolean,
        }) {
    }
}

export class AttemptType {
    constructor(
        public userIP: string,
        public url: string,
        public time: Date,
    ) {
    }
}

export class TokenBlackList {
    constructor(
        public refreshToken: string) {
    }
}

export class NewLikeStatus {
    constructor(
        public parentId: string,
        public addedAt: Date,
        public status: string,
        public userId: string,
        public login: string) {
    }

}

const mongoUri = process.env.mongoURI || "mongodb+srv://admin:admin@cluster0.9zvor.mongodb.net/bloggersList?retryWrites=true&w=majority"

const client = new MongoClient(mongoUri)


export const db = client.db("bloggersList")

const bloggersScheme = new mongoose.Schema<BloggersType>({
    id: String,
    name: String,
    youtubeUrl: String
})
const postsScheme = new mongoose.Schema<PostsType>({
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
        newestLikes: []
    }

}, {_id: false})
const userScheme = new mongoose.Schema<UsersDBType>({
    id: String,
    login: String,
    email: String,
    createdDat: Date,
    passwordHash: String,
    passwordSalt: String,
    emailConfirmation:
        {
            confirmationCode: String,
            expirationDate: Date,
            isConfirmed: Boolean
        }
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
}, {_id: false})
const attemptsScheme = new mongoose.Schema<AttemptType>({
    userIP: String,
    url: String,
    time: Date
})
const tokenBlackListScheme = new mongoose.Schema<TokenBlackList>({
    refreshToken: String
})
const newLikeStatusScheme = new mongoose.Schema<NewLikeStatus>({
    parentId: String,
    addedAt: Date,
    status: String,
    userId: String,
    login: String
})

export const bloggersModal = mongoose.model("bloggers", bloggersScheme)
export const postsModal = mongoose.model("posts", postsScheme)
export const usersModal = mongoose.model("users", userScheme)
export const commentsModal = mongoose.model("comments", commentsScheme)
export const attemptsModal = mongoose.model("attempts", attemptsScheme)
export const tokenBlackListModal = mongoose.model("tokenBlackList", tokenBlackListScheme)
export const newLikeStatusModal = mongoose.model("newLikeStatus", newLikeStatusScheme)

export async function runDb() {

    try {
        await mongoose.connect(mongoUri)
        console.log("Connected successfully to mongoose server")
    } catch {
        await mongoose.disconnect()
    }
}