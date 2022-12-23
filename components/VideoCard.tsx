import React, { useState, useRef } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { FaComment } from 'react-icons/fa'


import { Video } from '../types'
import LikeButton from './LikeButton'
import useAuthStore from '../store/authStore'
import axios from 'axios'
import { BASE_URL } from '../utils'
import { useRouter } from 'next/router'

interface IProps {
  post: Video
}

const VideoCard: NextPage<IProps> = ({ post }: IProps) => {
  const [postToShow, setPostToShow] = useState<Video>(post)
  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [isLiking, setIsLiking] = useState(false)

  const router = useRouter()

  const videoRef = useRef<HTMLVideoElement>(null)

  const {userProfile}: any = useAuthStore()

  const onVideoPress = () => {
    if(playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  const handleLike = async (like: boolean) => {
    setIsLiking(true)
    if(!isLiking) {
      if(userProfile) {
        const { data } = await axios.put(`${BASE_URL}/api/like`, {
          userId: userProfile._id,
          postId: postToShow._id,
          like
        })
  
        setPostToShow({...postToShow, likes: data.likes })
      } 
    }
    setIsLiking(false)
  }

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 px-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 w-10'>
            <Link href={`/profile/${postToShow.postedBy._id}`}>
              <>
                <Image
                  width={50}
                  height={50}
                  className='rounded-full'
                  src={postToShow.postedBy.image}
                  alt='profile photo'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${postToShow.postedBy._id}`}>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {postToShow.postedBy.userName}
                  {` `}
                  <GoVerified className='text-blue-400 text-md'/>
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{ postToShow.postedBy.userName }</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className='lg:ml-20 flex gap-4 relative'>
        <div
          className='rounded-3xl'
        >
          <div
            className='rounded-2xl flex flex-col'
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <div className='pb-3'>
              <p>
                { postToShow.caption }
              </p>
            </div>
            <Link href={`/detail/${postToShow._id}`}>
              <video
                loop
                autoPlay={true}
                ref={videoRef}
                className='rounded-lg lg:w-[700px] w-[200px] cursor-pointer'
                src={ postToShow.video.asset.url }
                muted={ isVideoMuted }
              >
              </video>
            </Link>
            {
              isHover && (
                <div className='absolute bottom-[75px] cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 p-3 w-full justify-center'>
                  {
                    playing
                      ? (
                        <button onClick={ onVideoPress } className='rounded-full bg-[#0006] p-2'>
                          <BsFillPauseFill className='text-white text-2xl lg:text-3xl'/>
                        </button>
                      )
                      : (
                        <button onClick={ onVideoPress } className='rounded-full bg-[#0003] p-2'>
                          <BsFillPlayFill className='text-white text-2xl lg:text-3xl'/>
                        </button>
                      )
                  }
                  {
                    isVideoMuted
                      ? (
                        <button onClick={ () => setIsVideoMuted(false) } className='rounded-full bg-[#0003] p-2'>
                          <HiVolumeOff className='text-white text-2xl lg:text-3xl'/>
                        </button>
                      )
                      : (
                        <button onClick={ () => setIsVideoMuted(true) } className='rounded-full bg-[#0003] p-2'>
                          <HiVolumeUp className='text-white text-2xl lg:text-3xl'/>
                        </button>
                      )
                  }
                </div>
              )
            }
          </div>
          <div className='flex mt-2 ml-4'>
            <div className='text-center'>
              <div
                className='bg-primary rounded-full p-2 cursor-pointer'
                onClick={() => router.push(`/detail/${postToShow._id}`)}
              >
                <FaComment className='text-lg md:text-2xl' />
              </div>
              <p className='text-md font-semibold'>
                {postToShow.comments?.length || 0}
              </p>
            </div>
            <div className='flex flex-col px-5'>
              <LikeButton
                likes={postToShow.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
                mt={0}
                mdp={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard