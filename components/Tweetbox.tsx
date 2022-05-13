import React, {useRef, useState} from 'react'
import { CalendarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon, XIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { Tweet, tweetBody, User } from '../typings'
import { fetchTweetOwner } from '../utils/fetchTweetOwner'
import toast from 'react-hot-toast'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
    setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

const Tweetbox = ({setTweets}:Props) => {
    const [tweet, setTweet] = useState<string>('')
    const [showImgPop, setShowImgPop] = useState<boolean>(false)
    const imgUrlRef = useRef<HTMLInputElement>(null)
    const [img, setImg] = useState<null | string>(null)
    const {data:session} = useSession()
    const imgURL = 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
  

    const handleCreateTweet = async(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()
        const theToast = toast.loading('Posting Tweet')
        const userObj = await fetchTweetOwner(session?.user?.email || 'underfined')
  
        const tweetBody = {
            text:tweet,
            image: img? img: '',
            userRef: userObj._id,
            blockTweet: false,
        }
        const result = await fetch (`/api/createTweet`, {
            body: JSON.stringify(tweetBody),
            method:'POST'
        })
        const data = await result.json()
        
        if (result.status == 200){
            setImg('')
            setTweet('')
            toast('Tweet Added', {
                icon:'🚀'
            })
            toast.remove(theToast)
            const tweet = await fetchTweets()
            setTweets(tweet)
        }
    }

  const handleAddImg = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    if (!imgUrlRef.current?.value) return
    setImg(imgUrlRef.current?.value)
    imgUrlRef.current.value = ''
    setShowImgPop(!showImgPop)
  }

    return (
      <div className=' px-4 '>
    <div className='flex justify-between space-x-2 px-4 items-center'>
        <div>
            <img src={session? session.user?.image?.toString() : imgURL} alt='profile-img'
            className='w-12 h-12 rounded-full ovject-cover' />
        </div>
        <div className='flex-1 relative'>
            <input className='h-24 w-full outline-none ' value={tweet} onChange={(e) => {setTweet(e.target.value)}}  placeholder='Whats Happening?' />
         <div>
  </div>
  {
       img && 
       <div className='relative'>
       <img src={img} className='mb-5 my-2 w-44 h-32 object-cover' /> 
        <XIcon onClick={() => setImg(null)} className='absolute top-1 left-1 w-8 h-8 p-2 bg-white rounded-full'/>
        </div>
      }
            <div className='flex justify-between'>
                <div className='flex space-x-2 text-twitterBlue'>
                    <PhotographIcon onClick={() => setShowImgPop(!showImgPop)} className='w-5 h-5 transition-transform hover:scale-150 ease-out '/>
                    <SearchCircleIcon className='w-5 h-5'/>
                    <EmojiHappyIcon className='w-5 h-5'/>
                    <CalendarIcon className='w-5 h-5'/>
                    <LocationMarkerIcon className='w-5 h-5'/>
                </div>
                <div >
                <input  className='bg-twitterBlue text-white py-2 
                px-3 place-self-center rounded-full text-sm font-bold disabled:opacity-40'
                onClick={(e) => {handleCreateTweet(e)}}
                 disabled={!tweet || !session} type='submit' value='Tweet'/>
                </div>
            </div>
        </div>
    </div>
    <div>
  </div>
      <div>
      {
          showImgPop && 
          <div className=' flex space-x-2 flex-1 justify-between bg-twitterBlue px-4 py-2 mt-4
          rounded-lg text-white '  >
              <input type='text'  ref={imgUrlRef} placeholder='Img Url' className='flex-1 placeholder:text-white outline-none bg-transparent' />
              <input type='submit' onClick={(e) => handleAddImg(e)} className='font-bold' value='Add Img' />
          </div>
      }
      
  </div>
  </div>
  )
}

export default Tweetbox