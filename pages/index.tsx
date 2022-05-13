import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { Tweet, User } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import {client} from '../sanity'
import {useNavigate} from 'react-router-dom'

interface Props {
  tweets: Tweet[]
}

const Home = ({tweets}: Props) => {

  const {data:session} = useSession()

  const findUser = async() => {
    const exists = await fetch(`/api/fetchTweetOwner?email=${session?.user?.email}`)
    const result = await exists.json()
    console.log(result.user)
    if (result.user) {console.log('already exists')}
    else if (!result.user) {
    console.log('dont exist')
    const data = ({
      name: session?.user?.name || 'undefined',
      username:session?.user?.name  || 'undefined',
      profilePic : session?.user?.image || 'undefined',
      email: session?.user?.email || 'undefined'
    })
    const resp =  await fetch(`/api/createUser`, {
      body: JSON.stringify(data),
      method:'POST'
    })
    console.log('server added user')
    }
  }

  useEffect(() => {
    session?.user && findUser()

  }, [session?.user])
  
  return (
    <div className="min-h-screen flex-col justify-center py-2 lg:max-w-6xl mx-auto max-h-screen overflow-hidden ">
      <Head>
        <title>Twitter 2.0</title>
      </Head>
    <Toaster/>
      <main className='grid grid-cols-9'>
       <Sidebar/>
       <Feed tweets={tweets} />
       <Widgets/>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async() => {
  const tweets = await fetchTweets()
  return (
    {
      props: {
        tweets
      }
    }
  )
}