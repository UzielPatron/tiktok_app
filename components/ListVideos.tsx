import React, { useEffect, useState } from 'react'
import NoResults from './NoResults'
import VideoCard from './VideoCard'
import { Video } from '../types'

interface IProps {
  videosList: Video[]
}

const ListVideos = ({videosList}: IProps) => {
  const [videoToList, setVideoToList] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setVideoToList([])
    setLoading(true)
    setTimeout(() => {
      setVideoToList(videosList)
      setLoading(false)
    }, 1)
  }, [videosList])

  if(loading) return null

  return (
    <>
    {
      videoToList?.length > 0
        ? videoToList.map((post: Video, idx: number) => (
          <VideoCard
            post={post}
            key={idx}
          />
        ))
        : <NoResults
            text={`Nada por aquí...`}
          />
    }
    </>
  )
}

export default ListVideos