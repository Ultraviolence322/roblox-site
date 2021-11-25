interface options {
  classes: string
}

interface value {
  singername: string
  songslistlink: string
  ___id___: string
}

export interface IArtist {
  options: options
  value: value
}

export interface IParsedArtist {
  id: number
  name: string
  link: string
}