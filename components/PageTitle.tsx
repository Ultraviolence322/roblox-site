import { NextPage } from 'next'
import React from 'react'

interface Props {
  
}

const PageTitle:NextPage<Props> = ({children}) => {
  return (
    <>
      <h1 className="text-center text-4xl pt-4 font-semibold">
        {children}
      </h1>
    </>
  )
}

export default PageTitle
