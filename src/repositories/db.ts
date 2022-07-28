import {MongoClient} from "mongodb";


export type BloggersType = {
    id: number
    name: string
    youtubeUrl: string
}
export type PostsType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"

const client = new MongoClient(mongoUri)
const db = client.db("bloggersList")
export const bloggersCollection = db.collection<BloggersType>("bloggers")
export const postsCollection = db.collection<PostsType>("posts")

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