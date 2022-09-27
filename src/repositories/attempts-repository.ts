import {attemptsModal} from "./db";


class AttemptsRepository {
    async getLastAttempts(ip: string, url: string, limitTime: Date) {

        return attemptsModal.countDocuments({
            userIP: ip,
            url: url,
            time: {$gt: limitTime}
        });
    }

    async addAttempt(userIP: string, url: string, time: Date){
        return  attemptsModal.insertMany({userIP, url, time})
    }
}

export const attemptsRepository = new AttemptsRepository()