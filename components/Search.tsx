import { NextPage } from 'next'
import React, { Dispatch, FormEventHandler, SetStateAction, useState } from 'react'
import { IParsedSong } from '../types/ISong'

interface Props {
  parsedSongs: IParsedSong[],
  setCurrentSongs: Dispatch<SetStateAction<IParsedSong[]>>
}
  const Search: NextPage<Props> = ({parsedSongs, setCurrentSongs}) => {
  const [searchField, setSearchField] = useState('')
  
  const searchTracks: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const searchedTracks = parsedSongs.filter(e => e.songName.toLocaleLowerCase().includes(searchField.toLocaleLowerCase()))
    setCurrentSongs(searchedTracks)
  }

  return (
    <div>
      <form onSubmit={searchTracks}>
        <input 
          className={`
            rounded-md border-2 border-gray-500
            px-4 py-2
          `} type="text" 
          value={searchField} 
          onInput={(e: any) => setSearchField(e.target.value)}
        />
        <button 
          className={`
            rounded-md border-2 border-gray-500
            px-4 py-2
            ml-2
          `}
        >Search</button>
      </form>
    </div>
  )
}

export default Search
