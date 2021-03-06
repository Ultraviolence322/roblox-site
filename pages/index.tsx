import Head from 'next/head'
import type { GetStaticProps, NextPage } from 'next'

import { IParsedSong } from '../types/ISong'

import { fetchAllSongs } from '../helpers/fetchAllSongs'

import GridNavigate from '../components/GridNavigate'
import PageTitle from '../components/PageTitle'
import Ad from '../components/Ad'

interface Props {
  parsedSongs: IParsedSong[],
  accessToken: string
}
const Home: NextPage<Props> = ({parsedSongs, accessToken}) => {
  return (
    <>
      <Head>
        <title>
          Roblox music codes — Listen songs and copy the Roblox song IDs!
        </title>
        <meta 
          name="Description" 
          content="Roblox music codes — Here you can find Roblox music codes and listen songs. Choose by top list, by newest, by artist.">
        </meta>
      </Head>
      <Ad slotId="3650451928" />
      <PageTitle>
        Top Roblox Music Codes
      </PageTitle>
      <p className="pt-4">
        Hey. Here you can find Roblox music codes. This website differs from other similar services. Here you can listen a song and get its ID immediately.
        Website&apos;s database has many Roblox song IDs, that sometimes get updated.
      </p>

      <h2 className="text-center text-2xl pt-4 font-semibold">How can i find a song id?</h2>
        
      <ul className="pt-4">
        <li className="pb-2">You know what song you need:
          <ol className="list-decimal pl-5">
            <li>Click search bar below</li>
            <li>Type song name</li>
            <li>Click search icon or press Enter button</li>
          </ol>
        </li>
        <li>You don&apos;t know what song you need:
          <ol className="list-decimal pl-5">
            <li>Below you can see grid of songs</li>
            <li>Listen songs, that Spotify player has</li>
            <li>If you found liked song just copy the id</li>
            <li>To next page you need click pagination arrows below the grid</li>
          </ol>
        </li>
      </ul>
      
      <GridNavigate parsedSongs={parsedSongs} accessToken={accessToken}/>

      <h2 className="text-center text-2xl pt-4 font-semibold">How can i use Roblox music codes in game?</h2>

      <ul className="pt-4">
        <li className="pb-2">
          Lounch the game;
        </li>
        <li className="pb-2">
          Click &ldquo;Discover&ldquo; in sidebar;
        </li>
        <li className="pb-2">
          Type &ldquo;Test Music Codes&ldquo; in search experiences;
        </li>
        <li className="pb-2">
          Click first or second result;
        </li>
        <li className="pb-2">
          In game need to type the id what you found.
        </li>
      </ul>

      <h2 className="text-center text-2xl pt-4 font-semibold"> Why don&apos;t all songs work?</h2>
      <p className='pt-4 pb-8'>Some of music codes may not work, because they get deleted by Roblox due to copyright.</p>
    </>
  )
}


export const getStaticProps: GetStaticProps = async ( ) => {
  const parsedSongs = await fetchAllSongs()
  const dev = process.env.NODE_ENV !== 'production';

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
