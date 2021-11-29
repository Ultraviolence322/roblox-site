import { NextPage } from 'next'
import React from 'react'
import PageTitle from '../components/PageTitle'

const Custom500:NextPage = () => {
  return (
    <div>
      <PageTitle>
        500 — Server-side error 😔
      </PageTitle>
    </div>
  )
}

export default Custom500
