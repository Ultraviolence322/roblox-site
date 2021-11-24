import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { parseName } from '../helpers/parseName'
import { IParsedSong, ISong } from '../types/ISong'

import Paginator from '../components/Paginator'
import TracksGrid from '../components/TracksGrid'

interface Props {
  parsedSongs: IParsedSong[],
  accessToken: string
}

const Home: NextPage<Props> = ({parsedSongs, accessToken}) => {
  const [countSongsToShow, setCountSongsToShow] = useState(20)
  const [currentPage, setCurrentPage] = useState(0)
  const [countOfPages, setCountOfPages] = useState(parsedSongs.length / countSongsToShow)
  const [songsToShow, setSongsToShow] = useState<IParsedSong[]>([])

  useEffect(() => {
    const fetchIdForSongs = async () => {
      let songsWithId: IParsedSong[] = [] 
      const songsToFetch = parsedSongs
        .splice(currentPage * countSongsToShow, (currentPage * countSongsToShow) + countSongsToShow)

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
    }
    
    fetchIdForSongs()
  }, [currentPage, countSongsToShow])

  return (
    <div>
      {songsToShow.length}
      <TracksGrid songsToShow={songsToShow} />

      <Paginator countOfPages={countOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}

// 'https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44265&target_action=get-all-data&default_sorting=new_first&ninja_table_public_nonce=3a5901169d&chunk_number=0',
//     'https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44265&target_action=get-all-data&default_sorting=new_first&skip_rows=0&limit_rows=0&chunk_number=1&ninja_table_public_nonce=3a5901169d',
//     'https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44265&target_action=get-all-data&default_sorting=new_first&skip_rows=0&limit_rows=0&chunk_number=2&ninja_table_public_nonce=3a5901169d',
//     'https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44265&target_action=get-all-data&default_sorting=new_first&skip_rows=0&limit_rows=0&chunk_number=3&ninja_table_public_nonce=3a5901169d',

export const getStaticProps = async ( ) => {
  const urls = ['https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44265&target_action=get-all-data&default_sorting=new_first&ninja_table_public_nonce=3a5901169d&chunk_number=0']
  let parsedSongs: IParsedSong[] = [] 

  await Promise.all(urls.map(async (url) => {
    try {
      const songsResponse = await fetch(url)
      const songs: ISong[] = await songsResponse.json() 
      const parsedArray: IParsedSong[] = []

      songs.forEach(song => {
        const songName = song.value.nameofthesong ? parseName(song.value.nameofthesong) : ''
        const songCode = +song.value.robloxcode?.replace('<k1>', '').replace('</k1>', '')

        parsedArray.push({
          songName,
          songCode
        })
      })

      parsedSongs = [...parsedSongs, ...parsedArray]
    } catch (error) {
      console.log('error', error);
    }
  }))

  const responseFetchAccessToken = await fetch(`${process.env.DOMEN}/api/access-token`)
  const dataFetchAccessToken = await responseFetchAccessToken.json()
  
  return { 
    props: { parsedSongs, accessToken: dataFetchAccessToken.accessToken },
    revalidate: 3600,
  }
}

export default Home
