import { NextPage } from 'next'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

interface Props {

}

const Navbar: NextPage<Props> = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMedium, setIsMedium] = useState(true)

  const router = useRouter()
  const getLinkClassName = (path: string): string => {
    let className = `
      text-white font-medium leading-8 text-2xl
      border-b-4 
      border-transparent
      hover:border-white
      transition duration-300
    `
    if(!isMedium){
      className += 'mb-4 px-0 mx-4 '
    } else {
      className += 'px-2 mx-2 '
    }  

    if(router.pathname === path) className += 'border-white '

    return className
  }

  const getClassNameMenu = () => {
    let className = `
      absolute right-0 top-0 z-10
      h-screen
      bg-black
      p-2
      md:relative md:h-auto  md:p-0
    `
    return className
  }

  useLayoutEffect(() => {
    window.innerWidth <= 768 ? setIsOpen(false) : setIsOpen(true)
  }, [])

  useEffect(() => {
    const setNewWidthOfWindow = () => {
      if(window.innerWidth <= 768) {
        setIsMedium(false)
      } else {
        setIsMedium(true)
      }
    }

    setNewWidthOfWindow()

    window.addEventListener('resize', setNewWidthOfWindow)

    return () => {
      window.removeEventListener('resize', setNewWidthOfWindow)
    }
  }, [])

  useEffect(() => {
    isMedium ? setIsOpen(true) : setIsOpen(false)
  }, [isMedium])

  useEffect(() => {
    if (!isMedium) {
      isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <nav className="bg-black p-8 flex justify-between">
      <div className="text-4xl text-white">RMC</div>
      <div onClick={() => setIsOpen(!isOpen)} className="block pt-3 md:hidden">
        <div className="h-1 w-6 bg-white mb-1"></div>
        <div className="h-1 w-6 bg-white mb-1"></div>
        <div className="h-1 w-6 bg-white mb-1"></div>
      </div>
      {
        isOpen && 
        <div className={getClassNameMenu()}>
          <div 
            className="block text-right text-white text-4xl p-6 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >✖</div>
          <ul className="flex flex-col justify-start md:flex-row">
            <li onClick={() => !isMedium && setIsOpen(false)} className={getLinkClassName('/')}>
              <Link href="/">
                Top Music Codes
              </Link> 
            </li>
            <li onClick={() => !isMedium && setIsOpen(false)} className={getLinkClassName('/new')}>
              <Link href="/new">
                New Music Codes
              </Link>
            </li>
            <li onClick={() => !isMedium && setIsOpen(false)} className={getLinkClassName('/artists')}>
              <Link href="/artists">
                Artists
              </Link>
            </li>
          </ul>
        </div>
      }
    </nav>
  )
}

export default Navbar
