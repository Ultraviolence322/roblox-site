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
    <PageTitle>
      New Roblox Music Codes
    </PageTitle>
    <GridNavigate parsedSongs={parsedSongs} accessToken={accessToken}/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ( ) => {
  let parsedSongs = await fetchAllSongs()
  
  parsedSongs = parsedSongs.sort((a, b) => {
    return b.songCode - a.songCode
  })

  const responseFetchAccessToken = await fetch(`${process.env.DOMEN}/api/access-token`)
  const dataFetchAccessToken = await responseFetchAccessToken.json()
  return { 
    props: { parsedSongs, accessToken: dataFetchAccessToken.accessToken },
    revalidate: 3500,
  }
}

export default New
