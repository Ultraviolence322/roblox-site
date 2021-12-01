import Head from 'next/head'
import type { GetStaticProps, NextPage } from 'next'

import { IParsedSong } from '../types/ISong'

import { fetchAllSongs } from '../helpers/fetchAllSongs'

import GridNavigate from '../components/GridNavigate'
import PageTitle from '../components/PageTitle'

interface Props {
  parsedSongs: IParsedSong[],
  accessToken: string
}
const Home: NextPage<Props> = ({parsedSongs, accessToken}) => {

  return (
    <>
      <Head>
        <title>
          Roblox music codes — Here you can listen songs and copy the Roblox song IDs!
        </title>
        <meta 
          name="Description" 
          content="Site name — Here you can find Roblox music codes and listen songs. Choose by top list, by newest, by artist.">
        </meta>
      </Head>
      <PageTitle>
        Top Roblox Music Codes
      </PageTitle>
      <GridNavigate parsedSongs={parsedSongs} accessToken={accessToken}/>
    </>
  )
}


export const getStaticProps: GetStaticProps = async ( ) => {
  const parsedSongs = await fetchAllSongs()
  const dev = process.env.NODE_ENV !== 'production';
  console.log('dev', dev);

  try {
    const responseFetchAccessToken = await fetch(`${dev ? process.env.DEV_URL : process.env.PROD_URL}/api/access-token`)
    const dataFetchAccessToken = await responseFetchAccessToken.json()

    return { 
      props: { parsedSongs, accessToken: dataFetchAccessToken.accessToken },
      revalidate: 3600,
    }
  } catch (error) {
    console.log('error', error);
     
    return {
      props: { parsedSongs, accessToken: '' },
      revalidate: 3600,
    }
  }
}

export default Home
