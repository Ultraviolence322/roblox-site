import { NextPage } from 'next'
import React, { Dispatch, FormEventHandler, SetStateAction, useRef, useState } from 'react'

interface Props {
  items: any[]
  searchKey: string
  setSearchedItems: Dispatch<SetStateAction<any[]>>
  setCurrentPage?: Dispatch<SetStateAction<number>>
}

const Search: NextPage<Props> = ({items, searchKey, setSearchedItems, setCurrentPage}) => {
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
    <div>
      <form  onSubmit={searchTracks}>
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
          ref={sendButton}
        >Search</button>
      </form>
      <button 
        className={`
          rounded-md border-2 border-gray-500
          px-4 py-2
          ml-2
        `}
        onClick={resetSearch}
      >Reset</button>
    </div>
  )
}

export default Search
