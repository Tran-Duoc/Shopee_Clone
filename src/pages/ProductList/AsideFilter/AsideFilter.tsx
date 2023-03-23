import classNames from 'classnames'
import React from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import { Category } from 'src/types/category.type'
import { QueryConfig } from '../ProductList'
import path from '../../../constants/path'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/util.type'
import RatingStart from 'src/components/RatingStart'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  categoriesData: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>

const priceSchema = schema.pick(['price_min', 'price_min'])

export default function AsideFilter({ queryConfig, categoriesData }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const navigate = useNavigate()
  const valueForm = watch()
  console.log(errors)
  const onSubmit = handleSubmit(
    (data) => {
      navigate({
        pathname: path.home,
        search: createSearchParams({
          ...queryConfig,
          price_min: data.price_min,
          price_max: data.price_max
        }).toString()
      })
    },
    (err) => {
      if (err) {
        // err.price_max?.ref?.focus()
      }
    }
  )

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_max', 'price_min', 'rating_filter', 'category'])).toString()
    })
  }

  return (
    <div className='mr-4 py-4'>
      <Link to='/' className='flex items-center font-bold '>
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul>
        {categoriesData.map((categoryItem) => {
          const isActive = category === categoryItem._id

          return (
            <li className='py-2 pl-3' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative flex items-center px-2 ', {
                  'font-semibold text-orange-500': isActive
                })}
              >
                {isActive ? (
                  <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange-500'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                ) : (
                  ''
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to='/' className='mt-4 flex items-center font-bold  uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-3 w-2 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='my-5'>
        <div>Khoản giá</div>
        <form onSubmit={onSubmit}>
          <div className='mt-2 flex items-center '>
            <div className='grow'>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      name='form'
                      className='border-gra-300 w-full rounded-sm border p-2  outline-none focus:border-gray-500 focus:shadow-sm '
                      placeholder='đ từ'
                      errClassName='hidden'
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_max')
                      }}
                      value={field.value}
                      ref={field.ref}
                    />
                  )
                }}
              />
            </div>
            <div className='mx-2  shrink-0'>-</div>
            <div className='grow'>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      name='to'
                      className='border-gra-300 w-full rounded-sm border p-2  outline-none focus:border-gray-500 focus:shadow-sm '
                      placeholder='đ đến'
                      errClassName='hidden'
                      onChange={(event) => {
                        field.onChange(event)
                        trigger('price_min')
                      }}
                      value={field.value}
                      ref={field.ref}
                    />
                  )
                }}
              />
            </div>
          </div>
          <div className=' min-h-[1.5rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <div>
            <Button className=' mt-2 flex w-full items-center justify-center bg-orange-500 py-2 text-sm uppercase text-white hover:bg-orange-600  '>
              Áp dụng
            </Button>
          </div>
        </form>
        <div className='my-4 h-[1px] bg-gray-300' />
        <div className='my-5'>
          <div className='text-sm'>Đánh giá</div>
          <RatingStart queryConfig={queryConfig} />
        </div>
      </div>

      <div className='my-4 h-[1px] bg-gray-300' />
      <Button onClick={handleRemoveAll} className='w-full bg-orange-500 py-2  uppercase  text-white'>
        Xóa tất cả
      </Button>
    </div>
  )
}
