import {postsRepository} from "../repositories/posts-repository";
import {ObjectId} from "mongodb";
import {PostsType} from "../repositories/db";
import {likeStatusRepository} from "../repositories/likeStatus-repository";




export const postsService = {
    async findPosts(pageSize:number, pageNumber:number) {
        return await postsRepository.findPosts(pageSize, pageNumber )
    },
    async findPostById(id: string) {
        return await postsRepository.findPostById(id)
    },
    async createPost(id: string, title: string, shortDescription: string, content: string, bloggerId: string) {
        const newPosts: PostsType = {
            id: new ObjectId().toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: "Brendan Eich",
            addedAt: new Date,
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                newestLikes: []
            }
        }
        return await postsRepository.createPost(newPosts)
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, bloggerId: string) {
        return await postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
    },
    async deletePosts(id: string) {
        return await postsRepository.deletePosts(id)
    },
    async getCount() {
        return await postsRepository.getCount()
    },
    async findBloggersPost(pageSize:number, pageNumber:number,bloggerId:string) {
        return await postsRepository.findBloggersPost(pageSize, pageNumber, bloggerId)
    },
    async createLikeStatus(parentId:string,status:string, id:string, login:string){
        return await likeStatusRepository.createLikeStatus(parentId,status, id, login)
    },

    async getCountBloggerId(bloggerId: string) {
        return await postsRepository.getCountBloggerId(bloggerId)
    },
    async findPostByIdWithLikes (parentId: string){
        const post =  await postsRepository.findPostById(parentId)
        const findLikeStatus = await likeStatusRepository.getLastLikesByParentId(parentId, 3)
        //const findLikeStatus = await likeStatusRepository.findLikeStatus(parentId)
        const postCopy = JSON.parse(JSON.stringify(post))
        const like = await likeStatusRepository.getLastCountLikesByParentId(parentId)
        const dislike = await likeStatusRepository.getLastCountDislikesByParentId(parentId)
        const postWithLikes = {...postCopy, extendedLikesInfo: {...postCopy.extendedLikesInfo, likesCount: like, dislikesCount:dislike, newestLikes: findLikeStatus}}
        // const postWithLikes = {...postCopy, extendedLikesInfo: {...postCopy.extexdedLikesInfo, newestLikes: [findLikeStatus]}
        //
                // const newPosts: PostsType = {
        //     id: new ObjectId().toString(),
        //     title: title,
        //     shortDescription: shortDescription,
        //     content: content,
        //     bloggerId: bloggerId,
        //     bloggerName: "Brendan Eich",
        //     addedAt: new Date,
        //     extendedLikesInfo: {
        //         likesCount: 0,
        //         dislikesCount: 0,
        //         myStatus: "None",
        //         newestLikes: []
        //     }
        // }
        return postWithLikes
    },


    // if (postAPI) {
    //     const findLikes = await likeStatusService.findLikeStatus(req.params.id)
    //    const postCopy = JSON.parse(JSON.stringify(postAPI))
    //     const postLOL = {...postCopy, extendedLikesInfo: {...postCopy.extexdedLikesInfo, newestLikes: findLikes}}
    //     res.send(postLOL)
    // } else {
    //     res.sendStatus(404)
    // }



    // TODO: start from this point
    // async updateLikeStatus(postId: string, userId: string, login:string, likeStatus: string) {
    //     return await postsRepository.updateLikeStatus(postId, userId, login, likeStatus)
    // },
    async getPostByIdWithLikes(parentId:string){
         await postsRepository.findPostById(parentId)
       //await  likeStatusRepository.getLastLikesByParentId()
    }

}