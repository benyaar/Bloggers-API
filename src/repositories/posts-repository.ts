
let posts = [
    {
        id: 1,
        title: "All about JS",
        shortDescription: "JS",
        content: "post",
        bloggerId: 1,
        bloggerName: "Brendan Eich"
    }
]

export const postsRepository = {
    findPosts(){
        return posts
    },
    findPostById(id:number){
        let post = posts.find(p => p.id === id)
        if (post) {
            return post
        }
    },
    createPost(id:number, title:string,shortDescription:string, content:string, bloggerId:number){
        const newPosts = {
            id: +(new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: "Brendan Eich"
        }
        posts.push(newPosts)
        return newPosts
    },
    updatePost(id:number, title:string,shortDescription:string, content:string, bloggerId:number) {
        let post = posts.find(b => b.id === id)
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.bloggerId = bloggerId
            return true
        } else {
            return false
        }
    },
    deletePosts(id: number){

        const newPost = posts.filter(p => p.id !== id)
        if (newPost.length < posts.length) {
            posts = newPost
            return true
        }
    }
}