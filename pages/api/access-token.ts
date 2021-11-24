// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import querystring from 'querystring'

type Data = {
  accessToken: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var client_id = process.env.CLIENT_ID
  var client_secret = process.env.CLIENT_SECRET

  try {
    const respone = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'client_credentials'
      })
    })

    const responseBody = await respone.json()

    res.status(200).json({ accessToken: responseBody.access_token })
  } catch (error) {
    console.log('error', error);
  } 
}
