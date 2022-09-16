import {NewLikeStatus, newLikeStatusModal, } from "./db";
const defaultOptions = {
    _id:0,
    __v: 0,
    parentId:0,
    status:0,
}

export const likeStatusRepository = {
    async createLikeStatus(parentId:string,status:string, id:string, login:string){
        const newLikeStatus:NewLikeStatus = {
            parentId: parentId,
            addedAt: new Date(),
            status: status,
            userId: id,
            login: login
        }
        return await newLikeStatusModal.insertMany(newLikeStatus)

    },
    async findLikeStatus(parentId:string){

        return newLikeStatusModal.find({parentId: parentId}, defaultOptions);
    },
    async getLastCountLikesByParentId(parentId: string){
        const likes = await newLikeStatusModal.countDocuments({parenId: parentId, status: 'Like'})
        //const likes = await newLikeStatusModal.countDocuments({$and:[{parenId: parentId},{'likeStatus': 'Like'}]})
       return likes
    },
        async getLastCountDislikesByParentId(parentId: string){
            const dislikes = await newLikeStatusModal.countDocuments({parenId: parentId, status: 'Dislike'})
            return dislikes
        },

    async getLastLikesByParentId(parentId: string,lastLikesCount: number){
        const likes = await newLikeStatusModal.find({parentId: parentId, status: 'Like'},defaultOptions,{sort: {_id: -1}, limit: lastLikesCount})
    return likes
}
}