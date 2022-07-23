export let bloggers = [
    {
        id: 1,
        name: 'study',
        youtubeUrl: 'backend'
    },
    {
        id: 2,
        name: 'work',
        youtubeUrl: 'node'
    },
    {
        id: 3,
        name: 'relax',
        youtubeUrl: 'html'
    },
]

export const bloggersRepository = {
    findBloggers(){
            return bloggers
    },
    findBloggersById(id:number){
        return bloggers.find(b => b.id === id)

    },
    createBloggers(name: string, youtubeUrl: string) {

        const newBloggers = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBloggers)
        return newBloggers
    },
    updateBlogger(id: number, name:string, youtubeUrl:string){
        let blogger = bloggers.find(b => b.id === id)
        if (blogger) {
            blogger.name = name;
            blogger.youtubeUrl = youtubeUrl;
            return true
        } else{
            return false
        }
    },
    deleteBloggers(id: number){

        const newBloggers = bloggers.filter(b => b.id !== id)
        if (newBloggers.length < bloggers.length) {
            bloggers = newBloggers
            return true
        }
    }


}