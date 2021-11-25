import type { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'

import { IParsedSong } from '../types/ISong'

import Paginator from '../components/Paginator'
import TracksGrid from '../components/TracksGrid'
import Search from '../components/Search'
import { fetchAllSongs } from '../helpers/fetchAllSongs'

interface Props {
  parsedSongs: IParsedSong[],
  accessToken: string
}

//artists, top(default), new(sort by code), search

const Home: NextPage<Props> = ({parsedSongs, accessToken}) => {
  const [currentSongs, setCurrentSongs] = useState(parsedSongs)
  const [countSongsToShow, setCountSongsToShow] = useState(12)
  const [currentPage, setCurrentPage] = useState(0)
  const [countOfPages, setCountOfPages] = useState(Math.floor(parsedSongs.length / countSongsToShow))
  const [songsToShow, setSongsToShow] = useState<IParsedSong[]>([])

  useEffect(() => {
    const fetchIdForSongs = async () => {
      let songsWithId: IParsedSong[] = [] 
      const songsToFetch = currentSongs
        .slice(currentPage * countSongsToShow, (currentPage * countSongsToShow) + countSongsToShow)

      await Promise.all(songsToFetch.map(async (s) => {
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
            id: dataFromSpotify.tracks.items[0].id ? dataFromSpotify.tracks.items[0].id : null,
          }]
        } catch (error) {
          console.log('error', error);
        }
      }))  

      setSongsToShow([...songsWithId])
      setCountOfPages(Math.floor(currentSongs.length / countSongsToShow))
    }
    
    fetchIdForSongs()
  }, [currentPage, countSongsToShow, currentSongs])

  return (
    <div className="mx-auto max-w-5xl">
      {currentSongs.length}
      <Search items={parsedSongs} searchKey={'songName'} setSearchedItems={setCurrentSongs} />
      <TracksGrid songsToShow={songsToShow} />
      <Paginator countOfPages={countOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async ( ) => {
  const parsedSongs = await fetchAllSongs()

  const responseFetchAccessToken = await fetch(`${process.env.DOMEN}/api/access-token`)
  const dataFetchAccessToken = await responseFetchAccessToken.json()
  
  return { 
    props: { parsedSongs, accessToken: dataFetchAccessToken.accessToken },
    revalidate: 3600,
  }
}

export default Home
