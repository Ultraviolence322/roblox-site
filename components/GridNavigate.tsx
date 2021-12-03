import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { IParsedSong } from '../types/ISong'
import Paginator from './Paginator'
import Search from './Search'
import TracksGrid from './TracksGrid'

interface Props {
  parsedSongs: IParsedSong[],
  accessToken: string
}

const GridNavigate: NextPage<Props> = ({parsedSongs, accessToken}) => {
  const [currentSongs, setCurrentSongs] = useState(parsedSongs)
  const [countSongsToShow, setCountSongsToShow] = useState(12)
  const [currentPage, setCurrentPage] = useState(0)
  const [countOfPages, setCountOfPages] = useState(Math.ceil(parsedSongs.length / countSongsToShow))
  const [songsToShow, setSongsToShow] = useState<IParsedSong[]>([])

  useEffect(() => {
    const fetchIdForSongs = async () => {
      let songsWithId: IParsedSong[] = [] 
      const songsToFetch = currentSongs
        .slice(currentPage * countSongsToShow, (currentPage * countSongsToShow) + countSongsToShow)

      if(Array.isArray(songsToFetch)) {
        await Promise.all(songsToFetch?.map(async (s) => {
          try {
            const responseFromSpotify = await fetch(`https://api.spotify.com/v1/search?q=${s.songName}&type=track`, {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
              }
            })
  
            const dataFromSpotify = await responseFromSpotify.json()
  
            songsWithId = [...songsWithId, {
              ...s,
              id: dataFromSpotify.tracks.items[0]?.id ? dataFromSpotify.tracks.items[0].id : null,
            }]
          } catch (error) {
            console.log('error', error);
            songsWithId = [...songsWithId, s]
          }
        }))  
      }

      setSongsToShow([...songsWithId])
      setCountOfPages(Math.ceil(currentSongs.length / countSongsToShow))
    }
    
    fetchIdForSongs()
  }, [currentPage, countSongsToShow, currentSongs])

  return (
    <div>
      <Search placeholder="Song name..." items={parsedSongs} searchKey={'songName'} setSearchedItems={setCurrentSongs} setCurrentPage={setCurrentPage}/>
      {songsToShow.length ? <TracksGrid songsToShow={songsToShow}/> : <p className="text-center py-10">List is empty 😔</p> }
      {countOfPages > 1 && <Paginator countOfPages={countOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}

      {/* <h2 className="text-center text-2xl pb-4 font-semibold">How i can add a sond to Roblox?</h2>
      <p>
        video here
      </p> */}
    </div>
  )
}

export default GridNavigate
