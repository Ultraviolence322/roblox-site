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
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <>
    <Head>
      <title>
        New Roblox music codes — Listen songs and copy the Roblox song IDs which you liked.
      </title>
      <meta 
        name="Description" 
        content="Roblox music codes — Here you can find new Roblox music codes and listen songs.">
      </meta>
    </Head>
    <PageTitle>
      New Roblox Music Codes
    </PageTitle>
    <p className="pt-4"> 
      Here you can see new roblox music codes (sroted by new to old) which most of them work in Roblox.
    </p>
    <h2 className="text-center text-2xl pt-4 font-semibold"> Why don&apos;t all songs work?</h2>
    <p>Some of music codes may not work, because they get deleted by Roblox due to copyright.</p>
    <GridNavigate parsedSongs={parsedSongs} accessToken={accessToken}/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ( ) => {
  try {
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
  } catch (error) {
    return { 
      props: { parsedSongs: '', accessToken: ''},
      revalidate: 3600,
    }
  }
  
}

export default New
