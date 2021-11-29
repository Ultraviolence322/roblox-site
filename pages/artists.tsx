import { GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'

import { parseName } from '../helpers/parseName'

import { IArtist, IParsedArtist } from '../types/IArtists'

import Search from '../components/Search'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'

interface Props {
  artists: IParsedArtist[]
}

const Artists: NextPage<Props> = ({artists}) => {
  const [currentArtists, setCurrentArtists] = useState(artists)
  return (
    <div>
      <PageTitle>
        Artists — Roblox Music Codes
      </PageTitle>
      <Search placeholder="Artist's name..." items={artists} searchKey={'name'} setSearchedItems={setCurrentArtists} />
      <ul className="flex flex-wrap justify-between py-8">
        {currentArtists.map(a => {
          return <li 
            className={`
              shadow
              rounded-md
              px-4 py-2 mr-4 mb-4
              cursor-pointer
              hover:shadow-lg
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

export const getStaticProps: GetStaticProps = async () => {
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
  } catch (error) {
    console.log('error', error);
  }
  
  return { 
    props: { artists },
    revalidate: 3600,
  }
}

export default Artists
