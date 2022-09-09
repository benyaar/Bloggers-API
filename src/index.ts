import express from 'express'
import bodyParser from "body-parser";
import {bloggersRouter} from "./routers/bloggers-router";
import {postsRouter} from "./routers/post-router";
import {runDb} from "./repositories/db";
import cors from 'cors'
import {usersRouter} from "./routers/user-router";
import {authRouter} from "./routers/auth-Router";
import {commentsRouter} from "./routers/comments-router";
import {deleteAllRouter} from "./routers/deleteAll-router";
import cookieParser from 'cookie-parser'


const app = express()
const port = process.env.PORT || 3000



const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)
app.use(cors())

app.use(cookieParser())

app.use('/bloggers', bloggersRouter)

app.use('/posts', postsRouter)

app.use('/users', usersRouter)
app.use ('/auth', authRouter)
app.use ('/comments', commentsRouter)
app.use ('/testing', deleteAllRouter)
app.set('trust proxy', true)

const  startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}

startApp()



