import { RefreshIcon } from '@heroicons/react/outline'
import React, {useState} from 'react'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import Tweetbox from './Tweetbox'
import TweetComp from './TweetComp'
import toast from 'react-hot-toast';

interface Props {
  tweets: Tweet[]
}

const Feed = ({tweets: tweetProps}:Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetProps)

  const onRefresh = async() => {
    const refresh = toast.loading('Reloading...')
    const tweet = await fetchTweets()
    setTweets(tweet)
    toast.success('Updated', {id:refresh})
  }

  return (
    <div className='lg:col-span-5 col-span-7 border-x'>
      {/** Top Part */}
        <div className='flex items-center justify-between'>
            <h1 className='font-bold p-5 pb-0 ' >Home</h1>
            <RefreshIcon onClick={onRefresh}  className='h-8 w-8 cursor-pointer text-twitterBlue mt-5 mr-5 
            transition-all hover:rotate-180 duration-500 active:scale-150 ease-out '/>
        </div>
      {/** Tweet Box */}
      <div>
         <Tweetbox setTweets = {setTweets} />
      </div>
    <div className='overflow-auto max-h-screen' >
      {
        tweets?.map((tweet) => (
          <TweetComp setTweets = {setTweets} tweet={tweet}/>
        ))
      }
    </div>
    </div>
  )
}

export default Feed