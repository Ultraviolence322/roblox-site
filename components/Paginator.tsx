import { NextPage } from 'next'
import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'

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
              className={PainatorItemClassName(index, true)}
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
              className={PainatorItemClassName(index, true)}
              key={index} 
            >
              ...
            </li>
          }
          if(index === countOfPages - 2) {
            return <li 
              className={PainatorItemClassName(index, true)}
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
              className={PainatorItemClassName(index, true)}
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

  const PainatorItemClassName = (currentIndex: number, isDisable?: boolean): string => {
    let className = `
      border-2 shadow rounded-md
      w-10 h-10
      m-1
      text-center leading-9
    `
    if(isDisable || currentIndex === currentPage) {

    } else {
      className += 'hover:shadow-lg cursor-pointer'
    }

    if(currentIndex === currentPage) {
      className += 'border-black'
    }

    return className
  }

  const PainatorArrowClassName = (): string => {
    let className = `
      border-2 shadow rounded-md
      w-10 h-10
      m-1 p-1
      text-center leading-9
      cursor-pointer
      hover:shadow-lg
    `
    return className
  }

  return (
    <ul className="flex flex-wrap pb-8 justify-center">
      <li 
        className={PainatorArrowClassName()}
        onClick={() => {
          setCurrentPage(--currentPage)
        }}
      >
        <Image alt="" width="22" height="22" src="/icons/left.svg" />
      </li>
        
      {renderSteps(countOfPages, currentPage)}

      <li 
        className={PainatorArrowClassName()}
        onClick={() => {
          setCurrentPage(++currentPage)
        }}
      >
        <Image alt="" width="22" height="22" src="/icons/right.svg"/>
      </li>
    </ul>
  )
}

export default Paginator
