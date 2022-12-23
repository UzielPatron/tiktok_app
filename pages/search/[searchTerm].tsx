import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import { useRouter } from 'next/router'

import VideoCard from '../../components/VideoCard'
import NoResult from '../../components/NoResults'
import useAuthStore from '../../store/authStore'
import { BASE_URL } from '../../utils'
import { IUser, Video } from '../../types'

interface IProps {
  videos: Video[]
}

const Search = ({videos}: IProps) => {
  const [isVideos, setIsVideos] = useState(true)

  const router = useRouter()
  const { searchTerm }: any = router.query

  const { allUsers } = useAuthStore()

  const isVideosClass = isVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const isAccountsClass = !isVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const searchedAccounts = allUsers.filter(
    (user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='w-full'>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bd-white w-full'>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${isVideosClass}`}
            onClick={() => setIsVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${isAccountsClass}`}
            onClick={() => setIsVideos(false)}
          >
            Cuentas
          </p>
        </div>
        {
          isVideos
            ? (
              <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                {
                  videos?.length
                    ? (
                      <div>
                        {videos.map((video: Video, idx: number) => (
                          <VideoCard
                            post={video}
                            key={idx}
                          />
                        ))}
                      </div>
                    )
                    : <NoResult text={`No se encontraron videos para "${searchTerm}"`}/>
                }
              </div>
            )
            : (
              <div className='md:mt-16'>
                {
                  searchedAccounts.length > 0
                    ? (
                      <div>
                        {
                          searchedAccounts.map((user: IUser, idx: number) => (
                            <Link
                              href={`/profile/${user._id}`}
                              key={idx}
                            >
                              <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                                <div>
                                  <Image
                                    src={ user.image }
                                    width={50}
                                    height={50}
                                    className='rounded-full'
                                    alt='user profile'
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
                    )
                    : <NoResult text={`No se encontraron cuentas para "${searchTerm}"`} />
                }
              </div>
            )
        }
    </div>
  )
}

interface IServerSideProp {
  params: {
    searchTerm: string
  }
}

export const getServerSideProps = async ({ params: { searchTerm } }: IServerSideProp) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)
  
  return {
    props: {
      videos: res.data
    }
  }
}

export default Search