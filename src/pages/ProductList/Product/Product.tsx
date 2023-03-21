import React from 'react'
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { FormatCurrency, FormatToSocialStyle } from 'src/utils/util'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to='/'>
      <div className='overflow-hidden rounded-sm bg-white shadow-sm transition-transform duration-100 hover:translate-y-[-0.625rem]  hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2 '>
          <div className=' min-h-[2rem] text-sm  line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex items-center text-sm '>
            <div className='max-w-[50%] truncate  text-gray-500  line-through'>
              <span className='text-sx'>₫</span>
              <span>{FormatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-2 text-orange-500'>
              <span className='text-sx'>₫</span>
              <span>{FormatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-start'>
            <ProductRating rating={product.rating} />
            <div className='ml-1 text-sm'>
              <span className='ml-1 mr-1'>Đã bán</span>
              <span>{FormatToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
