import React from 'react'
import {BellIcon,
        HashtagIcon,
        BookmarkIcon,
        CollectionIcon,
        MailIcon,
        UserIcon,
        HomeIcon,
        DotsCircleHorizontalIcon,
        XIcon} 
from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'
import { signIn, signOut, useSession } from 'next-auth/react'


const Sidebar = () => {
  const {data:session} = useSession()
  return (
    <div className='flex col-span-2 flex-col items-center md:items-start ' >
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/292px-Twitter-logo.svg.png'
            className='h-10 w-12 m-3' alt='twitter-logo'/>
        <SidebarRow Icon={HomeIcon} title='Home'/>
        <SidebarRow Icon={HashtagIcon} title='Explore'/>
        <SidebarRow Icon={BellIcon} title='Notification'/>
        <SidebarRow Icon={MailIcon} title='Messages'/>
        <SidebarRow Icon={BookmarkIcon} title='Bookmarks'/>
        <SidebarRow Icon={CollectionIcon} title='List'/>
        <SidebarRow onClick={session? signOut:signIn}  Icon={UserIcon} title={session? 'Sign Out': 'Sign In'}/>
        <SidebarRow Icon={DotsCircleHorizontalIcon} title='More'/>
    </div>
  )
}

export default Sidebar