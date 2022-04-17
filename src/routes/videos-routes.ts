import {Request, Response, Router} from 'express'
import {videosRepository} from "../repositories/videos-repository";
import {videos} from "../repositories/db";
import {body} from "express-validator";
import {inputValidatorMiddleware} from "../middlewares/input-validator-middleware";
//import {authMiddleware} from "../middlewares/auth-middleware";


export const videosRouter = Router({})


videosRouter.get('/', (req: Request, res: Response ) => {
    const videos = videosRepository.getVideos()
    res.send(videos)

})
videosRouter.get('/:videoId',
    //authMiddleware,
    (req: Request, res: Response) => {

    const id = +req.params.videoId
    const video = videosRepository.getVideoById(id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})

videosRouter.post('/',
    body('title').isString().withMessage('Name should be a string')
        .trim().not().isEmpty().withMessage('Name should be not empty'),
    inputValidatorMiddleware,
    //authMiddleware,
    (req: Request, res: Response) => {
    const newVideo = videosRepository.createVideo(req.body.title)
    res.sendStatus(201).send(newVideo)

})
videosRouter.put('/:videoId',
    body('title').isString().withMessage('Name should be a string')
        .trim().not().isEmpty().withMessage('Name should be not empty'),
    inputValidatorMiddleware,
   // authMiddleware,
    (req: Request, res: Response) => {
    const id = +req.params.videoId
    const isUpdatedVideo = videosRepository.updateVideoById(id, req.body.title)

    if (isUpdatedVideo) {
        res.send(201)
    }
    else {
        res.send(404)
    }
})
videosRouter.delete('/:id', (req: Request, res: Response ) => {
    const id = +req.params.id
    const el = videosRepository.deleteVideoById(id)
    const ind = videos.indexOf(el[0])
    videos.splice(ind,1)
    if (el.length) {
        res.send({'deleted': el})
    } else {
        res.send(404)
    }

})
