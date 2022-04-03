import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from "body-parser";


const app = express();
const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/videos', (req: Request, res: Response ) => {
    res.send(videos)

})
app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello: World!..')

})
app.post('/videos', (req: Request, res: Response) => {

    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    if (req.body.title) {
        videos.push(newVideo)
        res.send(201)
    } else {
        res.send(400)
    }
})
app.put('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (req.body.title.length < 1) {
        res.send(204)
    } else if (!id || !video) {
        res.send(400)
    } else if (req.body.title.length > 40){
        res.send('title did not update, max length 40')
    }
    else {
        video.title = req.body.title
        res.send(video)
    }
})
app.delete('/videos/:id', (req: Request, res: Response ) => {
    const id = +req.params.id
    const el = videos.filter(t=>t.id === id)
    const ind = videos.indexOf(el[0])
    videos.splice(ind,1)
    if (el.length) {
        res.send({'deleted': el})
    } else {
        res.send(404)
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})



