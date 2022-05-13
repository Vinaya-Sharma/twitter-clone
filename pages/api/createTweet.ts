// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import {groq} from 'next-sanity'
import {Tweet, tweetBody} from '../../typings'

type Data = {
 message: string
}

export default async function handler(  
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const data= JSON.parse(req.body)
    const mutations = [{
        create: {
          _type: 'tweet',
          text: data.text,
          user: {_ref: data.userRef, _type:'reference'},
          image: data.image,
          blockTweet: data.blockTweet
        }
      }]

      const result = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${'production'}`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${process.env.SANITY_TOKEN}`
        },
        body: JSON.stringify({mutations})
        })  

        const json = await result.json()

    res.status(200).json({message:'added'})
}
