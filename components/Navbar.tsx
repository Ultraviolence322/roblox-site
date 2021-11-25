import { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'

interface Props {

}

const Navbar: NextPage<Props> = () => {
  return (
    <nav>
      <ul className="flex justify-center">
        <li>
          <Link href="/">
            Top Music Codes
          </Link> 
        </li>
        <li>
          <Link href="/new">
            New Music Codes
          </Link>
        </li>
        <li>
          <Link href="/artists">
            Artists
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
