// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import {groq} from 'next-sanity'
import {Comment} from '../../typings'

type Data = {
  comments: Comment[]
}

export default async function handler(  
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {tweetId} = req.query
    const userQuery = groq`*[_type=='comment' && tweet._ref == '${tweetId}']`
    const comments: Comment[] = await client.fetch(userQuery)
    res.status(200).json({comments})
}
