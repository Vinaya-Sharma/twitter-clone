// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import {groq} from 'next-sanity'
import {User} from '../../typings'

type Data = {
  user: User
}

export default async function handler(  
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const {userId} = req.query
    const userQuery = groq`*[_type=='user' && _id=='${userId}'][0]`
    const user: User = await client.fetch(userQuery)
    res.status(200).json({user:user})
}
