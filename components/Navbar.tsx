import { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

interface Props {

}

const Navbar: NextPage<Props> = () => {
  const router = useRouter()
  const getClassName = (path: string): string => {
    let className = `
      px-2 mx-2
      text-white font-medium leading-8 text-2xl
      border-b-4 
      border-transparent
      hover:border-white
    `
    if(router.pathname === path) className += 'border-white'

    return className
  }
  return (
    <nav className="bg-black p-8">
      <ul className="flex justify-center">
        <li className={getClassName('/')}>
          <Link href="/">
            Top Music Codes
          </Link> 
        </li>
        <li className={getClassName('/new')}>
          <Link href="/new">
            New Music Codes
          </Link>
        </li>
        <li className={getClassName('/artists')}>
          <Link href="/artists">
            Artists
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
