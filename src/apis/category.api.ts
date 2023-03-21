import { Category } from 'src/types/category.type'
import { ResponseApiSuccess } from 'src/types/util.type'
import http from 'src/utils/http'

const URl = 'categories'

const categoryApi = {
  getCategory() {
    return http.get<ResponseApiSuccess<Category[]>>(URl)
  }
}

export default categoryApi
