import { NextPage } from 'next'
import Image from 'next/image'

import React, { Dispatch, FormEventHandler, SetStateAction, useRef, useState } from 'react'

interface Props {
  items: any[]
  searchKey: string
  placeholder: string
  setSearchedItems: Dispatch<SetStateAction<any[]>>
  setCurrentPage?: Dispatch<SetStateAction<number>>
}

const Search: NextPage<Props> = ({items, searchKey, placeholder, setSearchedItems, setCurrentPage}) => {
  const sendButton = useRef<HTMLButtonElement>(null)
  const [searchField, setSearchField] = useState('')
  
  const searchTracks: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    
    const searchedTracks = items.filter(e => e[searchKey].toLocaleLowerCase().includes(searchField.toLocaleLowerCase()))
    setSearchedItems(searchedTracks)
    setCurrentPage && setCurrentPage(0)
  }

  const resetSearch = () => {
    setSearchField('')
    
    setTimeout(() => {
      sendButton?.current?.click()
    })
  }

  return (
    <form  className="flex justify-center pt-8" onSubmit={searchTracks}>
      <input 
        className={`
          rounded-md shadow 
          px-4 py-2
          w-48
          xs:w-60
          hover:shadow-lg
          transition duration-300
        `} type="text" 
        placeholder={placeholder}
        value={searchField} 
        onInput={(e: any) => setSearchField(e.target.value)}
      />
      <button 
        aria-label="Search songs"
        className={`
          rounded-md shadow 
          w-10
          ml-2 pt-1
          hover:shadow-lg
          transition duration-300
        `}
        ref={sendButton}
      >
        <Image alt="" width="20" height="20" src="/icons/search.svg"/>
      </button>

      <button 
        aria-label="Reset search"
        className={`
          rounded-md shadow 
          w-10
          ml-2 pt-1
          hover:shadow-lg
          transition duration-300
        `}
        onClick={resetSearch}
      >
        <Image alt="" width="20" height="20" src="/icons/reset.svg"/>
      </button>
    </form>
  )
}

export default Search
