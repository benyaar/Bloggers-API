import {attemptsCollection} from "./db";


export const attemptsRepository = {
    async getLastAttempts(ip: string, url: string, limitTime: Date) {

        return await attemptsCollection.countDocuments({
            userIP: ip,
            url: url,
            time: {$gt: limitTime}
        })
    },

    async addAttempt(userIP: string, url: string, time: Date){
        return  attemptsCollection.insertOne({userIP, url, time})
    },
}