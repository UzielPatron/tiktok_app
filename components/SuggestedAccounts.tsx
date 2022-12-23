import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import { IUser } from '../types'


const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers, userProfile }: any = useAuthStore()
  const [users, setUsers] = useState<IUser[] | null>(null)

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  useEffect(() => {
    if(allUsers && userProfile) {
      const usersWithoutMe = allUsers.filter((user: IUser) => user._id !== userProfile._id)
    
      setUsers(usersWithoutMe)
    } else if (allUsers && !userProfile){
      setUsers(allUsers)
    }

  }, [allUsers, userProfile])
  
  

  return (
    <div className='lg:border-p-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Cuentas sugeridas
      </p>
      <div>
        {
          users && users?.slice(0, 6).map((user: IUser) => (
            <Link
              href={`/profile/${user._id}`}
              key={user._id}
            >
              <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                <div className='w-8 h-8'>
                  <Image
                    src={ user.image }
                    width={34}
                    height={34}
                    className='rounded-full'
                    alt='user profile'
                    layout='responsive'
                  />
                </div>
                <div className='hidden xl:block'>
                  <p className='flex gap-1 items-center text-md font-semibold text-primary lowercase'>
                    { user.userName.replaceAll(' ', '') }
                    <GoVerified className='text-blue-400' />
                  </p>
                  <p className='capitalize text-gray-400 text-xs'>
                    { user.userName }
                  </p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default SuggestedAccounts