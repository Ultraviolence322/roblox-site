import { NextPage } from 'next'
import React, { useEffect } from 'react'

interface Props {
  slotId: String
}

const Footer:NextPage<Props> = ({ slotId }) => {
  useEffect(() => {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
  }, [])

  return (
    <ins className="adsbygoogle"
     style={{"display": "block"}}
     data-ad-client="ca-pub-3917947412278595"
     data-ad-slot={slotId}
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
  )
}

export default Footer