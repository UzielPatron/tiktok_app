import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'

import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import VideoCard from '../../components/VideoCard'
import NoResult from '../../components/NoResults'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'
import ListVideos from '../../components/ListVideos'
import { useRouter } from 'next/router'

interface IProps {
  data: {
    user: IUser,
    userVideos: Video[],
    userLikedVideos: Video[]
  }
}

const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data

  const [showUserVideos, setShowUserVideos] = useState(true)
  const [videosList, setVideosList] = useState<Video[]>([])

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'


  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos, user])

  
  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            src={ user.image }
            width={120}
            height={120}
            className='rounded-full'
            alt='user profile'
            layout='responsive'
          />
        </div>
        <div className='flex flex-col justify-center'>
          <p className='md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-semibold text-primary lowercase'>
            { user.userName.replaceAll(' ', '') }
            <GoVerified className='text-blue-400' />
          </p>
          <p className='capitalize md:text-xl text-gray-400 text-xs'>
            { user.userName }
          </p>
        </div>
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bd-white w-full'>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Me gusta
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
          {
            <ListVideos
              videosList={videosList}
            />
          }
        </div>
      </div>
    </div>
  )
}

interface IServerSideProp {
  params: {
    id: string
  }
}

export const getServerSideProps = async ({ params: { id } }: IServerSideProp) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

  return {
    props: {
      data: res.data
    }
  }
}

export default Profile