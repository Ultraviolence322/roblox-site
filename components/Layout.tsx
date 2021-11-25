import { NextPage } from 'next'
import React from 'react'
import Navbar from './Navbar'

interface Props {
  
}

const Layout: NextPage<Props> = ({children}) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default Layout
