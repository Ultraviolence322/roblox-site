import { NextPage } from 'next'
import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import { IArtist } from '../../types/IArtists'

import { parseName } from '../../helpers/parseName'
import { fetchAllSongs } from '../../helpers/fetchAllSongs'
import { IParsedSong } from '../../types/ISong'
import TracksGrid from '../../components/TracksGrid'

interface Props {
  artist: string, 
  songsOfArtis: IParsedSong[]
}

const Artist: NextPage<Props> = ({artist, songsOfArtis}) => {
  return (
    <div>
      <h1>{artist}</h1>
      <TracksGrid songsToShow={songsOfArtis} />
    </div>
  )
}

interface Paths {
  params: {
    id: string
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: Paths[] = []

  try {
    const artistsResponse = await fetch('https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44266&target_action=get-all-data&default_sorting=old_first&ninja_table_public_nonce=bd0f5413fa')
    const artistsData: IArtist[] = await artistsResponse.json() 

    paths = artistsData.map((a, index) => {
      const splittedName = parseName(a.value.singername).split(' ')
      return {
        params: {
          id: splittedName.splice(0, splittedName.length - 2).join('-').toLocaleLowerCase()
        }
      }
    })

    // console.log('paths', paths);
  } catch (error) {
    console.log('error', error);
  }

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const artistName = (params?.id as string).split('-').join(' ')
  
  const parsedSongs = await fetchAllSongs()
  const songsOfArtis = parsedSongs.filter(s => s.songName.toLowerCase().includes(artistName))

  return { props: { 
    artist: artistName,
    songsOfArtis
  } }
}

export default Artist
