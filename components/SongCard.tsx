import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { IParsedSong } from '../types/ISong'

interface Props {
  song: IParsedSong
  copyCode: (index: number, code: number) => void
  index: number
}

const SongCard:NextPage<Props> = ({song, copyCode, index}) => {

  return (
    <li className="p-2 shadow rounded-md flex flex-col max-w-xs mx-auto w-full">
      <h2 className="text-center text-xl font-medium">{song.songName}</h2>
      <h3 className="flex justify-between py-2"><span className="pt-1 text-lg">{song.songCode}</span> 
      <button 
        className={`
          p-1
          rounded-md shadow
          hover:shadow-lg
        `}
        onClick={() => copyCode(index, song.songCode)}
      >
        {song.copied ? 'Copied' : 'Copy'}
      </button></h3>
      {
        song.id 

        ? <div className="flex items-end h-full">
            <iframe 
              src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator`} width="100%" height="80">
            </iframe>
          </div> 
        : <div className="relative h-full py-4">
            <span className="w-full text-center absolute top-1/2 transform -translate-y-1/2">Song dont found 😔</span>
          </div>  
      }
      
    </li>
  )
}

export default SongCard
