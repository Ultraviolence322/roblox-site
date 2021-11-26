import { NextPage } from 'next'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  countOfPages: number,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const Paginator: NextPage<Props> = ({countOfPages, currentPage, setCurrentPage}) => {

  const renderSteps = (countOfPages: number, currentPage:number) => {
    if(countOfPages > 5) {
      if(currentPage < 3) {
        return new Array(countOfPages).fill(0).map((i, index) => {
          if(index === countOfPages - 2) {
            return <li 
              className={PainatorItemClassName(index)}
              key={index} 
            >
              ...
            </li>
          }
          if(index < 3 || index === countOfPages - 1) {
            return <li 
              className={PainatorItemClassName(index)}
              key={index} 
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </li>
          }
        })
      } else if (currentPage >= 3 && currentPage <= countOfPages - 4) {
        return new Array(countOfPages).fill(0).map((i, index) => {
          if(index === 1) {
            return <li 
              className={PainatorItemClassName(index)}
              key={index} 
            >
              ...
            </li>
          }
          if(index === countOfPages - 2) {
            return <li 
              className={PainatorItemClassName(index)}
              key={index} 
            >
              ...
            </li>
          }
          if(currentPage === index || index === countOfPages - 1 || index === 0) {
            return <li 
              className={PainatorItemClassName(index)}
              key={index} 
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </li>
          }
        })
      } else {
        return new Array(countOfPages).fill(0).map((i, index) => {
          if(index === 1) {
            return <li 
              className={PainatorItemClassName(index)}
              key={index} 
            >
              ...
            </li>
          }
          if(index >= countOfPages - 3 || index === 0) {
            return <li 
              className={PainatorItemClassName(index)}
              key={index} 
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </li>
          }
        })
      }
    } else {
      return new Array(countOfPages).fill(0).map((i, index) => {
        return <li 
          className={PainatorItemClassName(index)}
          key={index} 
          onClick={() => setCurrentPage(index)}
        >
          {index + 1}
        </li>
      })
    }
  }

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
      className += 'border-red-500 bg-red-200'
    } else {
      className += 'border-red-300'
    }

    return className
  }

  return (
    <ul className="flex flex-wrap pt-4 justify-center">
      <li 
        className={`
          border-2 rounded-md
          w-10 h-10
          m-1
          text-center leading-9
          cursor-pointer
          hover:border-red-400
        `}
        onClick={() => {
          setCurrentPage(--currentPage)
        }}
      >
        left
      </li>
        
      {renderSteps(countOfPages, currentPage)}

      <li 
        className={`
          border-2 rounded-md
          w-10 h-10
          m-1
          text-center leading-9
          cursor-pointer
          hover:border-red-400
        `}
        onClick={() => {
          setCurrentPage(++currentPage)
        }}
      >
        right
      </li>
    </ul>
  )
}

export default Paginator
