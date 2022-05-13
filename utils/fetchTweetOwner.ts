import { User } from "../typings"

export const fetchTweetOwner = async(userId: string) => {
    const resp = await fetch(`http://localhost:3000/api/fetchTweetOwner?email=${userId}`)
    const data = await resp.json()
    const user:User = data.user
console.log(user)
    return (user)
}