import express, {Request, Response} from 'express'
import bodyParser from "body-parser";


const app = express()
const port = process.env.PORT || 3000
let bloggers = [
    {
        id: 1,
        name: 'study',
        youtubeUrl: 'backend'
    },
    {
        id: 2,
        name: 'work',
        youtubeUrl: 'node'
    },
    {
        id: 3,
        name: 'relax',
        youtubeUrl: 'html'
    },
]
let posts = [
    {
        id: 1,
        title: "All about JS",
        shortDescription: "JS",
        content: "post",
        bloggerId: 1,
        bloggerName: "Brendan Eich"
    }
]

const parserMiddleware = bodyParser()
app.use(parserMiddleware)


app.get('/', (req: Request, res: Response) => {

    res.send("Hello!")
})
app.get('/bloggers', (req: Request, res: Response) => {
    const name = req.query.name
    if (name) {
        let searchString = name.toString()
        res.send(bloggers.filter(v => v.name.indexOf(searchString) > -1))
    } else {
        res.send(bloggers)
    }
})
app.post('/bloggers', (req: Request, res: Response) => {
    // body('youtubeUrl').matches(/^https:\/\/([a-zA-Z\d_-]+\.)+[a-zA-Z\d_-]+(\/[a-zA-Z\d_-]+)*\/?$/).isLength({max:100}),
    // body('name').isLength({min:0,max:15}).not().isEmpty().trim(),
    //
    //     (req: Request, res: Response) => {
    //         const errors = validationResult(req);
    //         if (!errors.isEmpty()) {
    //             return res.status(400).send({
    //                 errorsMessages: errors.array().map(e => {
    //                     return {
    //                         message: e.msg,
    //                         field: e.param,
    //                     }
    //                 })
    //             });
    //         }
    //


    let errorsMessages: { message: string; field: string; }[] = []
   let pattern = /^https:\/\/([a-zA-Z\d_-]+\.)+[a-zA-Z\d_-]+(\/[a-zA-Z\d_-]+)*\/?$/

    if (!req.body.name || req.body.name.length > 15 || !req.body.name.trim()) {
        const error = {
        message: "invalid name", field: "name"
        }
        errorsMessages.push(error)
        }

    if (!req.body.youtubeUrl || req.body.youtubeUrl.length > 100 || !pattern.test(req.body.youtubeUrl)) {
        const error  = {
            message: "invalid youtubeUrl", field: "youtubeUrl"
        }
        errorsMessages.push(error)

    }
    if (errorsMessages.length > 0) {
        res.status(400).send({"errorsMessages": errorsMessages})
        return
    }
    const newBloggers = {
        id: +(new Date()),
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }
    bloggers.push(newBloggers)
    res.status(201).send(newBloggers)


})
app.get('/bloggers/:id', (req: Request, res: Response) => {
    let blogger = bloggers.find(b => b.id === +req.params.id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }
})
app.put('/bloggers/:id', (req: Request, res: Response) => {
    let errorsMessages: { message: string; field: string; }[] = []
    let pattern = /^https:\/\/([a-zA-Z\d_-]+\.)+[a-zA-Z\d_-]+(\/[a-zA-Z\d_-]+)*\/?$/

    if (!req.body.name || req.body.name.length > 15 || !req.body.name.trim()) {
        const error = {
            message: "invalid name", field: "name"
        }
        errorsMessages.push(error)
    }

    if (!req.body.youtubeUrl || req.body.youtubeUrl.length > 100 || !pattern.test(req.body.youtubeUrl)) {
        const error  = {
            message: "invalid youtubeUrl", field: "youtubeUrl"
        }
        errorsMessages.push(error)

    }
    if (errorsMessages.length > 0) {
        res.status(400).send({"errorsMessages": errorsMessages})
        return
    }


    let blogger = bloggers.find(b => b.id === +req.params.id)
    if (blogger) {
        blogger.name = req.body.name;
        blogger.youtubeUrl = req.body.youtubeUrl;
        res.status(204).send({blogger})
    } else {
        res.send(404)
    }

})
app.delete('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const newBloggers = bloggers.filter(b => b.id !== id)
    if (newBloggers.length < bloggers.length) {
        bloggers = newBloggers
        res.send(204)
    } else {
        res.send(404)
    }
})
app.get('/posts', (req: Request, res: Response) => {
    res.send(posts)
})
app.post('/posts', (req: Request, res: Response) => {
    let errorsMessages: { message: string; field: string; }[] = []

    if (!req.body.title || req.body.title.length > 30 || !req.body.title.trim()) {
        const error = {
            message: "invalid title", field: "title"
        }
        errorsMessages.push(error)
    }

    if (!req.body.shortDescription || !req.body.title.trim()) {
        const error  = {
            message: "invalid shortDescription", field: "shortDescription"
        }
        errorsMessages.push(error)
    }
    if (!req.body.content || req.body.title.content > 1000 || !req.body.content.trim()) {
        const error  = {
            message: "invalid content", field: "content"
        }
        errorsMessages.push(error)
    }
    if (errorsMessages.length > 0) {
        res.status(400).send({"errorsMessages": errorsMessages})
        return
    }
    const newPosts = {
        id: +(new Date()),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerId: req.body.bloggerId,
        bloggerName: "Brendan Eich"
    }
    posts.push(newPosts)
    res.status(201).send(newPosts)
})
app.get('/posts/:id', (req: Request, res: Response) => {
    let post = posts.find(p => p.id === +req.params.id)
    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
})
app.put('/posts/:id', (req: Request, res: Response) => {
    let errorsMessages: { message: string; field: string; }[] = []

    if (!req.body.title || req.body.title.length > 30 || !req.body.title.trim()) {
        const error = {
            message: "invalid name", field: "title"
        }
        errorsMessages.push(error)
    }

    if (!req.body.shortDescription || !req.body.title.trim()) {
        const error  = {
            message: "invalid youtubeUrl", field: "shortDescription"
        }
        errorsMessages.push(error)

    }
    if (errorsMessages.length > 0) {
        res.status(400).send({"errorsMessages": errorsMessages})
        return
    }

    let post = posts.find(p => p.id === +req.params.id)
    if (post) {
        post.title = req.body.title
        post.shortDescription = req.body.shortDescription
        post.content = req.body.content
        post.bloggerId = req.body.bloggerId
        res.send(204)
    } else {
        res.send(404)
    }
})
app.delete('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const newPosts = posts.filter(p => p.id !== id)
    if (newPosts.length < posts.length) {
        posts = newPosts
        res.send(204)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

