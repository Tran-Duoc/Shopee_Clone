import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'

import { QueryConfig } from 'src/pages/ProductList/ProductList'
import path from '../../constants/path'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const range = 2

export default function Paginate({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <div key={index} className='mx-2 cursor-pointer  rounded-sm bg-white  px-3 py-2 shadow-sm'>
            ...
          </div>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <div key={index} className='mx-2 cursor-pointer  rounded-sm bg-white  px-3 py-2 shadow-sm'>
            ...
          </div>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= range * 2 + 1 && pageNumber > page + range && pageNumber < pageSize - range + 1) {
          return renderDotAfter(index)
        } else if (page > range * 2 + 1 && page < pageSize - range * 2) {
          if (pageNumber < page - range && pageNumber > range) {
            return renderDotBefore(index)
          } else if (pageNumber > page + range && pageNumber < pageSize - range + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - range * 2 && pageNumber < page - range && pageNumber > range) {
          return renderDotBefore(index)
        }
        return (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('mx-2 cursor-pointer  rounded-sm border  bg-white px-3 py-2 shadow-sm', {
              'border-cyan-500': pageNumber === page,
              'border-transparent ': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-4 flex items-center justify-center '>
      {page === 1 ? (
        <div className='mx-2 cursor-not-allowed rounded-sm bg-white/50  px-3 py-2 shadow-sm'>Prev</div>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer  rounded-sm bg-white  px-3 py-2 shadow-sm'
        >
          Prev
        </Link>
      )}

      {renderPagination()}

      {page === pageSize ? (
        <div className='mx-2 cursor-not-allowed rounded-sm bg-white  px-3 py-2 shadow-sm'>Next</div>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer  rounded-sm bg-white  px-3 py-2 shadow-sm'
        >
          Prev
        </Link>
      )}
    </div>
  )
}
