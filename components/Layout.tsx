import { NextPage } from 'next'
import React from 'react'
import Navbar from './Navbar'

interface Props {
  
}

const Layout: NextPage<Props> = ({children}) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl">{children}</main>
    </>
  )
}

export default Layout
