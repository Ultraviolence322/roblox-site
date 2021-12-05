import { NextPage } from 'next'
import React from 'react'

interface Props {
  songsCount: number
}

const TracksGridScelet: NextPage<Props> = ({songsCount}) => {

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-8">
        {new Array(songsCount).fill(0).map((s, index) => {

          return (
            <li 
              className="w-full mx-auto max-w-xs h-52 shadow rounded-md relative"
              key={index}
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">Loading..</span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default TracksGridScelet
