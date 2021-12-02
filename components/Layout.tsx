import { NextPage } from 'next'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

interface Props {
  
}

const Layout: NextPage<Props> = ({children}) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
