import {NewLikeStatus, newLikeStatusModal,} from "./db";

const defaultOptions = {
    _id: 0,
    __v: 0,
    parentId: 0,
    status: 0,
}

class LikeStatusRepository {
    async createLikeStatus(parentId: string, status: string, id: string, login: string) {
        const newLikeStatus = new NewLikeStatus(
            parentId,
            new Date(),
            status,
            id,
            login
        )
        await newLikeStatusModal.findOneAndUpdate({parentId: parentId, userId: id}, {...newLikeStatus}, {upsert: true})
        return true

    }
    async getLastCountLikesByParentId(parentId: string) {
        //const likes = await newLikeStatusModal.countDocuments({$and:[{parenId: parentId},{'likeStatus': 'Like'}]})
        return newLikeStatusModal.countDocuments({parentId: parentId, status: 'Like'})
    }

    async getLastCountDislikesByParentId(parentId: string) {
        return  newLikeStatusModal.countDocuments({parentId: parentId, status: 'Dislike'})
    }

    async getLastLikesByParentId(parentId: string, lastLikesCount: number) {
        return  newLikeStatusModal.find({
            parentId: parentId,
            status: 'Like'
        }, defaultOptions, {sort: {_id: -1}, limit: lastLikesCount})
    }

    async getLastLikeStatusByParentAndUserId(parentId: string, userId: string) {
        return  newLikeStatusModal.findOne({parentId: parentId, userId: userId}, {
            _id: 0,
            __v: 0
        }).lean()
    }
}
export const likeStatusRepository = new LikeStatusRepository()
