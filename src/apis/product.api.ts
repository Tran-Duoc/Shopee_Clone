import { ResponseApiSuccess } from './../types/util.type'
import { ProductList, ProductListConfig, Product } from 'src/types/product.type'

import http from 'src/utils/http'

const URL = 'products'

const productApi = {
  getProducts: (params: ProductListConfig) => {
    return http.get<ResponseApiSuccess<ProductList>>(URL, { params })
  },
  getProductDetails: (id: string | number) => {
    return http.get<ResponseApiSuccess<Product>>(`${URL}/${id}`)
  }
}

export default productApi
