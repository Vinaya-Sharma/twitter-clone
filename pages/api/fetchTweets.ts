// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import {Tweet} from '../../typings'
import {groq} from 'next-sanity'

type Data = {
  tweets: Tweet[]
}

const tweetQuery = groq`*[_type=='tweet' && !blockTweet]| order(_createdAt desc)`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const tweets: Tweet[] = await client.fetch(tweetQuery)
    res.status(200).json({tweets})
}
