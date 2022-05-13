import { Comment } from "../typings"

export const fetchComments = async(tweetId:string) => {
    const resp = await fetch(`http://localhost:3000/api/fetchComments?tweetId=${tweetId}`)
    const data = await resp.json()
    const comments: Comment[] = data.comments
    return (comments)
}