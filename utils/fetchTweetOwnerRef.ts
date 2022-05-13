import { User } from "../typings"

export const fetchOwnerRef = async(userId: string) => {
    const resp = await fetch(`http://localhost:3000/api/fetchOwnerRef?userId=${userId}`)
    const data = await resp.json()
    const user:User = data.user

    return (user)
}