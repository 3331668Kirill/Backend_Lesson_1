import {videos} from "./db";


export const videosRepository = {
    getVideos() {
        return videos
    },
    getVideoById(id: number) {
        return videos.find(t=>t.id === id)
    },
    deleteVideoById(id: number) {
        return videos.filter(t=>t.id === id)
    },
    updateVideoById(id: number, title: string) {
        const video = videos.find(v => v.id === id)
        if(video) {
            video.title = title;
            return true;
        } else return false
    },
    createVideo(title: string) {
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
        return newVideo
    }
}