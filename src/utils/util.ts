import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.request?.status === HttpStatusCode.UnprocessableEntity
}

export function FormatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function FormatToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
