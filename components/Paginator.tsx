import { NextPage } from 'next'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  countOfPages: number,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const Paginator: NextPage<Props> = ({countOfPages, currentPage, setCurrentPage}) => {

  const PainatorItemClassName = (currentIndex: number): string => {
    let className = `
      border-2 rounded-md
      w-10 h-10
      m-1
      text-center leading-9
      cursor-pointer
      hover:border-red-400
    `
    if(currentIndex === currentPage) {
      className += 'border-red-500'
    } else {
      className += 'border-red-300'
    }

    return className
  }

  return (
    <ul className="flex flex-wrap">
      {
        new Array(countOfPages).fill(0).map((i, index) => {
          return <li 
            className={PainatorItemClassName(index)}
            key={index} 
            onClick={() => setCurrentPage(index)}
          >
            {index + 1}
          </li>
        })
      }
    </ul>
  )
}

export default Paginator
