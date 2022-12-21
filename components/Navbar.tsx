import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'

import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'
import Logo from '../utils/tiktok-logo.png'


const Navbar = () => {  
  const {userProfile, addUser}: {userProfile: any, addUser: any} = useAuthStore()

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] md:w-[130px]'>
          <Image
            className='cursor-pointer'
            src={Logo}
            alt='tiktok'
            layout='responsive'
          />
        </div>
      </Link>

      <div>SEARCH</div>

      <div>
        {
          userProfile
            ? (
              <div>{ userProfile.userName }</div>
            )
            : (
              <GoogleLogin
                onSuccess={res => createOrGetUser(res, addUser) }
                onError={() => console.log('error')}
              />
            )
        }
      </div>
    </div>
  )
}

export default Navbar