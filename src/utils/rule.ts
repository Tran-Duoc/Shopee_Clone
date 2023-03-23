import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => {
  return {
    email: {
      required: {
        value: true,
        message: 'email không được rỗng'
      },
      pattern: {
        value: /^\S+@\S+$/,
        message: 'độ dài không đúng định dạng'
      },
      maxLength: {
        value: 160,
        message: 'độ dài phải tư 5 - 160 ký tự'
      },
      minLength: {
        value: 5,
        message: 'email phải tư 5 - 160 ký tự'
      }
    },
    password: {
      required: {
        value: true,
        message: 'password là bắt buột'
      },
      maxLength: {
        value: 160,
        message: 'password phải từ 6 -160 ký tự'
      },
      minLength: {
        value: 6,
        message: 'password phải từ 5 - 160 ký tự'
      }
    },
    confirm_password: {
      required: {
        value: true,
        message: 'Nhập lại password là bắt buột'
      },
      maxLength: {
        value: 160,
        message: 'password phải từ 6 -160 ký tự'
      },
      minLength: {
        value: 6,
        message: 'password phải từ 5 - 160 ký tự'
      },
      validate:
        typeof getValues === 'function'
          ? (value) => {
              console.log(value)
              if (value === getValues('password')) {
                return true
              }
              return 'Nhập lại mật khẩu không khớp'
            }
          : undefined
    }
  }
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buột')
    .email('Email không đúng định dạng')
    .min(5, 'độ dài phải tư 5 - 160 ký tự')
    .max(150, 'độ dài phải tư 5 - 160 ký tự'),
  password: yup
    .string()
    .required('passwod là băt buột')
    .min(5, 'đô dài từ 5 - 150 ký tự')
    .max(150, 'độ dài từ 5 - 150 ký tự'),
  confirm_password: yup
    .string()
    .required('password là băt buột')
    .min(5, 'đô dài từ 5 - 150 ký tự')
    .max(150, 'độ dài từ 5 - 150 ký tự')
    .oneOf([yup.ref('password')], 'nhập lại mật khẩu'),
  price_min: yup.string().test({
    name: 'price-not-allow',
    message: 'Giá không phù hợp',
    test: function (value) {
      const price_min = value
      const { price_max } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_min) < Number(price_max)
      }
      return price_min !== '' || price_max !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price_max',
    message: 'Giá không phù hợp',
    test: function (value) {
      const price_max = value
      const { price_min } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_min) < Number(price_max)
      }
      return price_min !== '' || price_max !== ''
    }
  })
})

// export const SchemaLogin = schema.omit(['confirm_password'])

export type Schema = yup.InferType<typeof schema>
