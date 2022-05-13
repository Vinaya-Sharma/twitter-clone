
export interface Comment extends commentBody {
    _id: string
    _createdAt: string
    _updatedAt: string, 
    _rev:string, 
    _type:'comment'
}

export type commentBody = {
    comment: string, 
    tweet: {
        _ref:string 
        _type:'tweet'
    },
    username:string,
    profilePic:string
}

export interface Tweet extends tweetBody {
    _id: string
    _createdAt: string
    _updatedAt: string, 
    _rev:string, 
    _type:'tweet'
    blockTweet: boolean
    user: {
        _ref:string,
        _type:'reference'
    }
}

export type tweetBody =  {
    text:string
    image:string 
}

export interface User {
    _id: string
    name:string, 
    profilePic:string,
    username:string
    email:string
}