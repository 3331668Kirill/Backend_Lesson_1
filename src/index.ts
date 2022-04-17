import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {videosRouter} from "./routes/videos-routes";


const app = express();
const port = process.env.PORT || 5006
app.use(cors())
app.use(bodyParser.json())




app.get('/', (req: Request, res: Response ) => {
    res.send('Hello: World!..')

})
app.use('/videos', videosRouter)

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})



