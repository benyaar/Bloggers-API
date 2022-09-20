import {NewLikeStatus, newLikeStatusModal,} from "./db";

const defaultOptions = {
    _id: 0,
    __v: 0,
    parentId: 0,
    status: 0,
}

export const likeStatusRepository = {
    async createLikeStatus(parentId: string, status: string, id: string, login: string) {
        const newLikeStatus: NewLikeStatus = {
            parentId,
            addedAt: new Date(),
            status,
            userId: id,
            login
        }
        await newLikeStatusModal.findOneAndUpdate({parentId: parentId, userId: id}, {...newLikeStatus}, {upsert: true})
        return true

    },
    async getLastCountLikesByParentId(parentId: string) {
        const likes = await newLikeStatusModal.countDocuments({parentId: parentId, status: 'Like'})
        //const likes = await newLikeStatusModal.countDocuments({$and:[{parenId: parentId},{'likeStatus': 'Like'}]})
        return likes
    },

    async getLastCountDislikesByParentId(parentId: string) {
        const dislikes = await newLikeStatusModal.countDocuments({parentId: parentId, status: 'Dislike'})
        return dislikes
    },
    //TODO: check
    // async getLikesAndDislikesCountByParentId(parentId: string) {
    //     const likesAndDislikes = await newLikeStatusModal.countDocuments({$and: []})
    //     return likes
    // },

    async getLastLikesByParentId(parentId: string, lastLikesCount: number) {
        const likes = await newLikeStatusModal.find({
            parentId: parentId,
            status: 'Like'
        }, defaultOptions, {sort: {_id: -1}, limit: lastLikesCount})
        return likes
    },

    async getLastLikeStatusByParentAndUserId(parentId: string, userId: string) {
        const likeStatus = await newLikeStatusModal.findOne({parentId: parentId, userId: userId}, {_id: 0, __v: 0}).lean()
        return likeStatus
    }
}

