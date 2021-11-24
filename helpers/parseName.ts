export const parseName = (name: string): string => {
  let result: string = ''
  let splittedName = name.split('>')
  
  result = splittedName[1].split('').splice(0, splittedName[1].length - 3).join('')

  return result
}