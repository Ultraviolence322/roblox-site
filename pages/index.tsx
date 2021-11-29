import type { GetStaticProps, NextPage } from 'next'

import { IParsedSong } from '../types/ISong'

import { fetchAllSongs } from '../helpers/fetchAllSongs'

import GridNavigate from '../components/GridNavigate'
import PageTitle from '../components/PageTitle'

interface Props {
  parsedSongs: IParsedSong[],
  accessToken: string
}

//artists, top(default), new(sort by code), search

const Home: NextPage<Props> = ({parsedSongs, accessToken}) => {

  return (
    <>
      <PageTitle>
        Top Roblox Music Codes
      </PageTitle>
      <GridNavigate parsedSongs={parsedSongs} accessToken={accessToken}/>
    </>
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
