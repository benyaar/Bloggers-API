import express, {Request, Response} from 'express'
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 3000
let bloggers = [
    {id: 1, name: 'study', youtubeUrl: 'backend'},
    {id: 2, name: 'work', youtubeUrl: 'node'},
    {id: 3, name: 'relax', youtubeUrl: 'html'},
]

const parserMiddleware = bodyParser()
app.use(parserMiddleware)


app.get('/', (req:Request, res:Response) => {

    res.send("Hello!")
})

app.get('/bloggers', (req:Request, res:Response) => {
   const name =  req.query.name
   if(name){
       let searchString = name.toString()
       res.send(bloggers.filter(v=> v.name.indexOf(searchString) > -1))
   } else {
       res.send(bloggers)
   }
})
app.post('/bloggers', (req:Request, res:Response) => {
     let name = req.body.name && req.body.youtubeUrl

     if (!name || typeof name !== 'string' || !name.trim() || name.length > 40){
         res.status(400).send({
             errorsMessages: [
             {
                 message: "Incorrect title",
                 field: "title"
             }
         ]
     })
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

 app.get('/bloggers/:id', (req:Request, res:Response) => {
   let blogger = bloggers.find(b => b.id === +req.params.id)
     if (blogger) {
         res.send(blogger)
     } else {
         res.send(404)
     }
})
 app.put('/bloggers/:id', (req:Request, res:Response) => {
     let name = req.body.name && req.body.youtubeUrl
     if (!name || typeof name !== 'string' || !name.trim() || name.length > 40){
         res.status(400).send({
             errorsMessages: [
                 {
                     message: "Incorrect title",
                    field: "title"
                 }
             ]
        })
         return
    }
     let blogger = bloggers.find(b => b.id === +req.params.id)
     if (blogger) {
         blogger.name = req.body.name;
         blogger.youtubeUrl = req.body.youtubeUrl;
         res.send(204)
     } else {
         res.send(404)
     }

 })
 app.delete('/bloggers/:id', (req:Request, res:Response) => {
     const id = +req.params.id
     const newBloggers = bloggers.filter(b => b.id !== id)
     if (newBloggers.length < bloggers.length) {
         bloggers = newBloggers
         res.send(204)
     } else {
         res.send(404)
     }
 })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})