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
//
// app.get('/videos/:id', (req:Request, res:Response) => {
//     let video = videos.find(v => v.id === +req.params.id)
//     if (video) {
//         res.send(video)
//     } else {
//         res.send(404)
//     }
//
// })
// app.put('/videos/:id', (req:Request, res:Response) => {
//     let title = req.body.title
//     if (!title || typeof title !== 'string' || !title.trim() || title.length > 40){
//         res.status(400).send({
//             errorsMessages: [
//                 {
//                     message: "Incorrect title",
//                     field: "title"
//                 }
//             ]
//         })
//         return
//     }
//
//     let video = videos.find(v => v.id === +req.params.id)
//     if (video) {
//         video.title = req.body.title
//         res.send(204)
//     } else {
//         res.send(404)
//     }
//
// })
// app.delete('/videos/:id', (req:Request, res:Response) => {
//     const id = +req.params.id
//     const newVideos = videos.filter(v => v.id !== id)
//     if (newVideos.length < videos.length) {
//         videos = newVideos
//         res.send(204)
//     } else {
//         res.send(404)
//     }
// })
//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})