import express from 'express'
import bodyParser from "body-parser";
import {bloggersRouter} from "./routers/bloggers-router";
import {postsRouter} from "./routers/post-router";


const app = express()
const port = process.env.PORT || 3000



const parserMiddleware = bodyParser()
app.use(parserMiddleware)

app.use('/bloggers', bloggersRouter)

app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

