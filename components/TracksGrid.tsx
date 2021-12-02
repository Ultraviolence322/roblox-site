import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { IParsedSong } from '../types/ISong'
import SongCard from './SongCard'

interface Props {
  songsToShow: IParsedSong[]
}

const TracksGrid: NextPage<Props> = ({songsToShow}) => {
  const [songs, setSongs] = useState([...songsToShow])

  useEffect(() => {
    setSongs([...songsToShow])
  }, [songsToShow])

  const copyCode = (index: number, code: number): void => {
    let updatedSongs = [...songs]
    navigator.clipboard.writeText(code.toString())
    updatedSongs[index] = {
      ...updatedSongs[index],
      copied: true
    }
    
    setSongs(updatedSongs)
  }

  return (
    <>
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-8">
      {songs.map((s, index) => {
        return <SongCard key={index} song={s} copyCode={copyCode} index={index} />
      })}
    </ul>
    </>
  )
}

export default TracksGrid
