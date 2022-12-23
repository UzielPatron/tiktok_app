import { useState, useEffect } from 'react'
import Image from 'next'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import VideoCard from '../../components/VideoCard'
import NoResult from '../../components/NoResults'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'

interface IProps {
  data: {
    user: IUser,
    userVideos: Video[],
    userLikedVideos: Video[]
  }
}

const Profile = ({ data }: IProps) => {
  return (
    <div>Profile</div>
  )
}

interface IServerSideProp {
  params: {
    id: string
  }
}

export const getServerSideProps = async ({ params: { id } }: IServerSideProp) => {
  const res = await axios.get(`${BASE_URL}/profile/${id}`)

  return {
    props: {
      data: res.data
    }
  }
}

export default Profile