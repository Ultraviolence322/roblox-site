import { IParsedSong, ISong } from "../types/ISong"

import { parseName } from "./parseName"

export const fetchAllSongs = async (): Promise<IParsedSong[]> => {
  const urls = [
    'https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44265&target_action=get-all-data&default_sorting=new_first&ninja_table_public_nonce=3a5901169d&chunk_number=0',
    'https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44265&target_action=get-all-data&default_sorting=new_first&skip_rows=0&limit_rows=0&chunk_number=1&ninja_table_public_nonce=3a5901169d',
    'https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44265&target_action=get-all-data&default_sorting=new_first&skip_rows=0&limit_rows=0&chunk_number=2&ninja_table_public_nonce=3a5901169d',
    'https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44265&target_action=get-all-data&default_sorting=new_first&skip_rows=0&limit_rows=0&chunk_number=3&ninja_table_public_nonce=3a5901169d',
    ]
    let parsedSongs: IParsedSong[] = [] 
  
    await Promise.all(urls.map(async (url) => {
      try {
        const songsResponse = await fetch(url)
        const songs: ISong[] = await songsResponse.json() 
        const parsedArray: IParsedSong[] = []
  
        songs.forEach(song => {
          const songName = song.value.nameofthesong ? parseName(song.value.nameofthesong) : ''
          const songCode = +song.value.robloxcode?.replace('<k1>', '').replace('</k1>', '')
  
          parsedArray.push({
            songName,
            songCode
          })
        })
  
        parsedSongs = [...parsedSongs, ...parsedArray]
      } catch (error) {
        console.log('error', error);
      }
    }))

    return parsedSongs
}