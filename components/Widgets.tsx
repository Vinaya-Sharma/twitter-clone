import { SearchIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

const Widgets = () => {

    const tweets = [{
        profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        userName:'@vinayaSharmaa',
        name:'Vinaya Sharma',
        tweet:'just chilling',
        tweetImages:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxIJ0i2yLoPcDOsIASqD9ZOc4rluBp0elIpeOSXOKLwLR_F1L39Yte5dtXfJT33z1sTUM&usqp=CAU','https://miro.medium.com/max/1400/0*-Ru3w3AUsniHkxNQ.jpg']
    },{
        profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
        userName:'@vinayaSharmaa',
        name:'Vinaya Sharma',
        tweet:'surfing around with my pictures',
        tweetImages:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxIJ0i2yLoPcDOsIASqD9ZOc4rluBp0elIpeOSXOKLwLR_F1L39Yte5dtXfJT33z1sTUM&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxIJ0i2yLoPcDOsIASqD9ZOc4rluBp0elIpeOSXOKLwLR_F1L39Yte5dtXfJT33z1sTUM&usqp=CAU','https://miro.medium.com/max/1400/0*-Ru3w3AUsniHkxNQ.jpg']
    }]

  return (
    <div className='hidden lg:inline col-span-2 px-4 mt-2 ' >
        {/**Search Box */}
        <div className='flex space-x-2 items-center bg-gray-100 rounded-full p-3'>
            <SearchIcon className='w-5 h-5 text-gray-400'/>
            <input placeholder='Search Twitter' className='flex-1 bg-transparent outline-none' />
        </div>
        {/**THE WIDGET */}
        <div className='my-4 max-h-screen overflow-auto '>
            <p className='text-2xl font-thin'>Tweets By<span className='ml-2 underline text-twitterBlue text-sm font-medium'>
            <Link href={`/posts/@vinayaSharmaa`} >@VinayaSharmaa</Link>
                </span></p>
        <div className='space-y-4 mt-4' >
            {tweets?.map((tweet, id) => (
                <div key={id} >
                                 <hr className='my-4'/>
                    <div className='flex items-center'>
                        <img src={tweet.profilePic} className='w-12 h-12 object-cover rounded-full' />
                        <div className='p-2'>
                        <h4 className='font-bold'>{tweet.userName}</h4>
                        <h4 className='text-sm'>{tweet.name}</h4>
                        </div>
                    </div>
   
                        {tweet.tweet}
                        <div className='flex space-y-2 mt-4 flex-wrap'>
                        {
                            tweet.tweetImages?.map((img) => (
                                <img src={img} className='mr-2 w-44 object-cover rounded-lg flex h-44'/>
                            ))
                        }

                    </div>
                </div>
            ))}
        </div>
        </div>
    </div>
  )
}

export default Widgets