import { NextPage } from 'next'
import React from 'react'
import { IParsedSong } from '../types/ISong'

interface Props {
  songsToShow: IParsedSong[]
}

const TracksGrid: NextPage<Props> = ({songsToShow}) => {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {songsToShow.map((s, index) => {
        return <li className="p-2 border-2 border-yellow-300 rounded-md" key={index}>
          <h2 className="text-center ">{s.songName}</h2>
          <h3 className="flex justify-between py-2"><span className="pt-1">{s.songCode}</span> <button className={`
            p-1
            border-2 rounded-md border-green-500
            hover:border-green-600
          `}>Copy</button></h3>
          <iframe 
            src={`https://open.spotify.com/embed/track/${s.id}?utm_source=generator`} width="100%" height="80">
          </iframe>
        </li>
      })}
    </ul>
  )
}

export default TracksGrid
