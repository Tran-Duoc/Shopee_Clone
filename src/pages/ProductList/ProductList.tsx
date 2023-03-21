import { useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'

import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import useQueryParams from '../../hooks/useQueryParams'
import productApi from 'src/apis/product.api'
import Paginate from 'src/components/Paginate'
import { ProductListConfig } from '../../types/product.type'
import categoryApi from 'src/apis/category.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      order: queryParams.order,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      category: queryParams.category
    },
    isUndefined
  )

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategory()
    }
  })

  return (
    <div className='bg-gray-200 py-6 '>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12'>
            <div className='col-span-3 '>
              <AsideFilter queryConfig={queryConfig} categoriesData={categoriesData?.data.data || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => {
                  return (
                    <div className='grid-cols-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  )
                })}
              </div>
              <Paginate queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
