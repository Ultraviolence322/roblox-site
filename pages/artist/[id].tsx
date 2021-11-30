import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'

import { IArtist } from '../../types/IArtists'

import { parseName } from '../../helpers/parseName'
import { fetchAllSongs } from '../../helpers/fetchAllSongs'
import { IParsedSong } from '../../types/ISong'

import GridNavigate from '../../components/GridNavigate'
import PageTitle from '../../components/PageTitle'

interface Props {
  artist: string, 
  songsOfArtis: IParsedSong[],
  accessToken: string
}

const Artist: NextPage<Props> = ({artist, songsOfArtis, accessToken}) => {
  return (
    <>
      <Head>
        <title>
          Roblox music codes — Here you can see Roblox song IDs by {artist} and listen songs.
        </title>
        <meta 
          name="Description" 
          content={`Site name — Here you can see Roblox music codes by ${artist} and listen songs.`}>
        </meta>
      </Head>
      <PageTitle>
        {artist} — Roblox Music Codes
      </PageTitle>
      <GridNavigate parsedSongs={songsOfArtis} accessToken={accessToken}/>
    </>
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

  } catch (error) {
    console.log('error', error);
  }

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const dev = process.env.NODE_ENV !== 'production';
  const artistName = (params?.id as string).split('-').map(e => e[0].toUpperCase() + e.substring(1)).join(' ')
  
  const parsedSongs = await fetchAllSongs()
  const songsOfArtis = parsedSongs.filter(s => s.songName.toLowerCase().includes(artistName.toLocaleLowerCase()))

  const responseFetchAccessToken = await fetch(`${dev ? process.env.DEV_URL : process.env.PROD_URL}/api/access-token`)
  const dataFetchAccessToken = await responseFetchAccessToken.json()

  return { 
    props: { 
      artist: artistName,
      songsOfArtis,
      accessToken: dataFetchAccessToken.accessToken,
    },
    revalidate: 3600, 
  }
}

export default Artist
