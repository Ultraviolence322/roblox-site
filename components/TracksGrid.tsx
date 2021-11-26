import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { IParsedSong } from '../types/ISong'

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
    <ul className="grid grid-cols-3 gap-4">
      {songs.map((s, index) => {
        return <li className="p-2 border-2 border-yellow-300 rounded-md" key={index}>
          <h2 className="text-center ">{s.songName}</h2>
          <h3 className="flex justify-between py-2"><span className="pt-1">{s.songCode}</span> 
          <button 
            className={`
              p-1
              border-2 rounded-md border-green-500
              hover:border-green-600
            `}
            onClick={() => copyCode(index, s.songCode)}
          >
            {s.copied ? 'Copied' : 'Copy'}
          </button></h3>
          {
            s.id 
            ? <iframe 
                src={`https://open.spotify.com/embed/track/${s.id}?utm_source=generator`} width="100%" height="80">
              </iframe>
            : <div>Song don't found 😔</div>  
          }
        </li>
      })}
    </ul>
  )
}

export default TracksGrid
