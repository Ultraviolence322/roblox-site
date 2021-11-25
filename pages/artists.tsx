import { NextPage } from 'next'
import React, { useState } from 'react'

import { parseName } from '../helpers/parseName'

import { IArtist, IParsedArtist } from '../types/IArtists'

import Search from '../components/Search'
import Link from 'next/link'

interface Props {
  artists: IParsedArtist[]
}

const Artists: NextPage<Props> = ({artists}) => {
  const [currentArtists, setCurrentArtists] = useState(artists)
  return (
    <div>
      <h1>Artists</h1>
      {artists.length}
      <Search items={artists} searchKey={'name'} setSearchedItems={setCurrentArtists} />
      <ul className="flex flex-wrap">
        {currentArtists.map(a => {
          return <li 
            className={`
              bg-red-500
              rounded-md
              text-white
              px-4 py-2 m-2
              cursor-pointer
              hover:bg-red-600
            `}
            key={a.id}
          >
            <Link href={`/artist/${a.link}`}>
              {a.name}
            </Link>
          </li>
        })}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  let artists: IParsedArtist[] = []
  try {
    const artistsResponse = await fetch('https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44266&target_action=get-all-data&default_sorting=old_first&ninja_table_public_nonce=bd0f5413fa')
    const artistsData: IArtist[] = await artistsResponse.json() 

    artists = artistsData.map((a, index) => {
      const splittedName = parseName(a.value.singername).split(' ')
      const parsedName = splittedName.splice(0, splittedName.length - 2).join(' ')
      return {
        id: index,
        name: parsedName,
        link: parsedName.split(' ').join('-').toLocaleLowerCase()
      }
    })

    console.log('artists', artists);
  } catch (error) {
    console.log('error', error);
  }
  
  return { 
    props: { artists },
    revalidate: 3600,
  }
}

export default Artists
