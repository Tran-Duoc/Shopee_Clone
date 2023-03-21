import React from 'react'
import Button from 'src/components/Button'
import { QueryConfig } from '../ProductList'
import { sort_by as sortBy, order as orderConstants } from '../../../constants/product'
import classNames from 'classnames'
import { ProductListConfig } from '../../../types/product.type'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiveValue = (activeValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === activeValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handleSetValueOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 px-4 py-3 '>
      <div className='flex flex-wrap items-center justify-between gap-2 '>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <Button
            className={classNames('h-8   px-4 text-center text-sm capitalize   ', {
              'bg-orange-500 text-white hover:bg-orange-500/80 ': isActiveValue(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveValue(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </Button>
          <Button
            className={classNames('h-8  px-4 text-center text-sm capitalize   ', {
              'bg-orange-500 text-white hover:bg-orange-500/80 ': isActiveValue(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveValue(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </Button>
          <Button
            className={classNames('h-8   px-4 text-center text-sm capitalize   ', {
              'bg-orange-500 text-white hover:bg-orange-500/80 ': isActiveValue(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveValue(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </Button>
          <select
            className={classNames('h-8   px-4 text-center text-sm capitalize   ', {
              'bg-orange-500 text-white hover:bg-orange-500/80 ': isActiveValue(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveValue(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) =>
              handleSetValueOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)
            }
          >
            <option value='' disabled className='bg-slate-50 text-black '>
              Giá
            </option>
            <option value={orderConstants.asc} className='bg-slate-50 text-black '>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstants.desc} className='bg-slate-50 text-black '>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange-600'>1</span>
            <span>/9</span>
          </div>
          <div className='ml-3'>
            <Button className='h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 hover:bg-slate-100 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </Button>
            <Button className='h-8  rounded-tl-sm rounded-bl-sm bg-white/60 px-3 hover:bg-slate-400/70 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
