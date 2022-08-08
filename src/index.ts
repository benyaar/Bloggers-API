import express from 'express'
import bodyParser from "body-parser";
import {bloggersRouter} from "./routers/bloggers-router";
import {postsRouter} from "./routers/post-router";
import {runDb} from "./repositories/db";
import cors from 'cors'
import {usersRouter} from "./routers/user-router";
import {authRouter} from "./routers/auth-Router";


const app = express()
const port = process.env.PORT || 3000



const parserMiddleware = bodyParser.json()
app.use(cors())
app.use(parserMiddleware)

app.use('/bloggers', bloggersRouter)

app.use('/posts', postsRouter)

app.use('/users', usersRouter)
app.use ('/auth', authRouter)

const  startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}

startApp()



