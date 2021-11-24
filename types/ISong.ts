interface options {
  classes: string,
}

interface value {
  nameofthesong: string,
    robloxcode: string
    ___id___: string
}

export interface ISong {
  options: options
  value: value
}

export interface IParsedSong  {
  id?: string,
  songName: string
  songCode: number,
}