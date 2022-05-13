import React, {SVGProps} from 'react'

interface Props {
    Icon:(props: SVGProps<SVGSVGElement>) => JSX.Element,
    title:String
    onClick?: () => {}
}

const SidebarRow = ({Icon, title, onClick}:Props) => {
  return (
    <div  onClick={() => onClick?.()} className='transition-all max-w-fit duration-200 flex space-x-2 py-3 px-4 hover:bg-gray-100 cursor-pointer items-center rounded-full group' >
        <Icon className='w-6 h-6'/>
        <p className='group-hover:text-twitterBlue hidden md:flex font-light lg:text-xl' >{title}</p>
    </div>
  )
}

export default SidebarRow