import {postsRepository} from "../repositories/posts-repository";
import {ObjectId} from "mongodb";
import {CommentsType, PostsType} from "../repositories/db";
import {likeStatusRepository} from "../repositories/likeStatus-repository";




export const postsService = {
    // async findPosts(pageSize:number, pageNumber:number) {
    //     return await postsRepository.findPosts(pageSize, pageNumber )
    // },
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
    async findBloggersPostWithLikes(pageSize:number, pageNumber:number,bloggerId:string, userId: string | undefined) {
        const posts = await postsRepository.findBloggersPost(pageSize, pageNumber, bloggerId)
        let postsWithLikesInfo: PostsType[] = []
        for await (let post of posts) {
            const postWithLikesInfo = await this.findLikesInfoForPost(post.id, userId, post)
            postsWithLikesInfo.push(postWithLikesInfo)
        }
        const count = postsWithLikesInfo.length
        return {
            "pagesCount": Math.ceil(count / pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": count,
            "items": postsWithLikesInfo
        }

    },
    async createLikeStatus(parentId:string,status:string, id:string, login:string){
        return await likeStatusRepository.createLikeStatus(parentId,status, id, login)
    },

    async getCountBloggerId(bloggerId: string) {
        return await postsRepository.getCountBloggerId(bloggerId)
    },

    async findPostsWithLikes(pageSize:number, pageNumber:number, userId: string | undefined) {
        const posts =  await postsRepository.findPosts(pageSize, pageNumber)
        //if (!posts) return null
        let postsWithLikesInfo: PostsType[] = []
        for await (let post of posts) {
            const postWithLikesInfo = await this.findLikesInfoForPost(post.id, userId, post)
            postsWithLikesInfo.push(postWithLikesInfo)
        }
        const count = postsWithLikesInfo.length
        return {
            "pagesCount": Math.ceil(count / pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": count,
            "items": postsWithLikesInfo
        }
    },
    async findPostByIdWithLikes (parentId: string, userId: string | undefined){

        const post =  await postsRepository.findPostById(parentId)
        if (!post) return false
        const postWithLikesInfo = await this.findLikesInfoForPost(parentId, userId, post)
        return postWithLikesInfo
    },

    async findLikesInfoForPost (parentId: string, userId: string | undefined, post: PostsType | CommentsType){
        let myLikeStatus = 'None'
        if (userId) {
            const isUserLiked = await likeStatusRepository.getLastLikeStatusByParentAndUserId(parentId, userId)
            if (isUserLiked) {
                myLikeStatus = (JSON.parse(JSON.stringify(isUserLiked))).status
            }
        }
        const findLikeStatus = await likeStatusRepository.getLastLikesByParentId(parentId, 3)
        const postCopy = JSON.parse(JSON.stringify(post))
        postCopy.extendedLikesInfo.myStatus = myLikeStatus
        const like = await likeStatusRepository.getLastCountLikesByParentId(parentId)
        const dislike = await likeStatusRepository.getLastCountDislikesByParentId(parentId)

        const postWithLikes = {...postCopy, extendedLikesInfo: {...postCopy.extendedLikesInfo, likesCount: like,  dislikesCount:dislike, newestLikes: findLikeStatus}}

        return postWithLikes
    },


}