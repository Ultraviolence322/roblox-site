import { NextPage } from 'next'
import React, { Dispatch, FormEventHandler, SetStateAction, useState } from 'react'
import { IParsedSong } from '../types/ISong'

interface Props {
  items: any[]
  searchKey: string
  setSearchedItems: Dispatch<SetStateAction<any>>
}
  const Search: NextPage<Props> = ({items, searchKey, setSearchedItems}) => {
  const [searchField, setSearchField] = useState('')
  
  const searchTracks: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const searchedTracks = items.filter(e => e[searchKey].toLocaleLowerCase().includes(searchField.toLocaleLowerCase()))
    setSearchedItems(searchedTracks)
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
