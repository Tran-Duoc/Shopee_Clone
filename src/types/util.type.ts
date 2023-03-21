export interface ResponseApi<Data> {
  message: string
  data?: Data
}
export interface ResponseApiSuccess<Data> {
  message: string
  data: Data
}
