import { Tweet } from "../typings"

export const fetchTweets = async() => {
    const resp = await fetch('http://localhost:3000/api/fetchTweets')
    const data = await resp.json()
    const tweets: Tweet[] = data.tweets

    return (tweets)
}