import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import { Comment, Tweet, User } from '../typings'
import { fetchTweetOwner } from '../utils/fetchTweetOwner'
import { ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon, UploadIcon } from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import {fetchOwnerRef} from '../utils/fetchTweetOwnerRef'
import { useSession } from 'next-auth/react'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
    tweet: Tweet
    setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
  }

const TweetComp = ({tweet, setTweets}:Props) => {

  const [user, setUser] = useState<null | User>(null)
  const [comments, setComments] = useState<null | Comment[]>(null)
  const [showComment, setShowComment] = useState(false)
  const [comment, setcomment] = useState('')
  const {data:session} = useSession()

  const handleComment = async() => {
    const body = {
      comment:comment,
      username: session?.user?.name,
      profilePic: session?.user?.image,
      tweet:tweet._id
    }
    const resp = await fetch(`/api/createComment`, {
      body:JSON.stringify(body),
      method:'POST'
    })
    getComments()
    setcomment('')
  }

  const getUser = async() => {
    console.log('fethcing')
    const tweetOwner:User = await fetchOwnerRef(tweet.user._ref)
    setUser(tweetOwner)
  }

  const getComments = async() => {
    const tweetComments: Comment[] = await fetchComments(tweet._id)
    setComments(tweetComments)
  }

  useEffect(() => {
    getUser()
    getComments()
  }, [])

  return (
    <div className='p-4'>
      <hr className='py-3' />
      <div className='flex' >
      <img src={user?.profilePic} alt='profile-pic' className='w-10 h-10 rounded-full object-cover' />
        <div>
          <div className='flex items-center' >
            <p className='text-md font-bold px-2' >{user?.name}</p>
            <p>{user?.username}</p>
            <p className='text-sm' >{new Date(tweet._createdAt).toDateString()}</p>
          </div>
          <div className='p-2' >
            {tweet.text}
            {
              tweet.image && 
              <img className='max-w-2xl object-contain rounded-lg max-h-44 py-2' src={tweet.image} />
            }
          </div>
        </div>
      </div>
      <div className='flex text-gray-400 justify-between flex-1 px-4' >
        <div onClick={() => {setShowComment(!showComment)}} className='flex space-x-2 hover:text-gray-500 active:scale-125 transition-all 
        duration-200 ease-out '> <ChatAlt2Icon className='w-6 h-6'/>
           <p>{comments?.length}</p></div>
           <SwitchHorizontalIcon className='w-6 h-6'/>
           <HeartIcon className='w-6 h-6'/>
           <UploadIcon className='w-6 h-6'/>
      </div>
      { showComment &&
      <div>
        <div className='w-full flex justify-between space-x-5 mt-5 px-4 ' >
          <input className='bg-gray-100 px-2 py-2 outline-none flex-1 ' type='text' placeholder='Your Comment...' value={comment} onChange={(e) => setcomment(e.target.value) } />
          <input onClick={handleComment}  className='ml-auto text-twitterBlue disabled:text-gray-500' disabled={!comment || !session }  type='submit' value='Comment' />
          </div>
        {comments?.map((comment) => (
            <div className='px-8 mt-4' >
              <div className='flex space-x-2 relative'>
              <img className='w-8 h-8 rounded-full' src={comment.profilePic} />
              <hr className='absolute top-10 left-2 h-6 border-x '/>
              <p className='font-bold'>{comment.username}</p>
              </div>
              <p className='px-8' >{comment.comment}</p>
            </div>
        ))}
        </div>
      }
    </div>
  )
}

export default TweetComp