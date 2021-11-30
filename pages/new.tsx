import Head from 'next/head'
import React from 'react'
import { GetStaticProps, NextPage } from 'next'

import { fetchAllSongs } from '../helpers/fetchAllSongs'

import { IParsedSong } from '../types/ISong'

import GridNavigate from '../components/GridNavigate'
import PageTitle from '../components/PageTitle'

interface Props {
  parsedSongs: IParsedSong[],
  accessToken: string
}
const New: NextPage<Props> = ({parsedSongs, accessToken}) => {
  return (
    <>
    <Head>
      <title>
        New Roblox music codes — Listen songs and copy the Roblox song IDs which you liked.
      </title>
      <meta 
        name="Description" 
        content="Site name — Here you can find new Roblox music codes and listen songs.">
      </meta>
    </Head>
    <PageTitle>
      New Roblox Music Codes
    </PageTitle>
    <GridNavigate parsedSongs={parsedSongs} accessToken={accessToken}/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ( ) => {
  const dev = process.env.NODE_ENV !== 'production';
  let parsedSongs = await fetchAllSongs()
  
  parsedSongs = parsedSongs.sort((a, b) => {
    return b.songCode - a.songCode
  })

  const responseFetchAccessToken = await fetch(`${dev ? process.env.DEV_URL : process.env.PROD_URL}/api/access-token`)
  const dataFetchAccessToken = await responseFetchAccessToken.json()
  return { 
    props: { parsedSongs, accessToken: dataFetchAccessToken.accessToken },
    revalidate: 3600,
  }
}

export default New
