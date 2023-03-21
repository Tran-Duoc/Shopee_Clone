import { Schema, schema } from '../../utils/rule'
import { registerUser } from 'src/apis/auth.api'
import Input from 'src/components/Input'

import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/util'
import { ResponseApi } from 'src/types/util.type'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import Button from 'src/components/Button'
import path from 'src/constants/path'

type FormData = Schema

export default function Register() {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerUser(body)
  })

  const handleSubmitForm = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/login')
      },
      onError: (err) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(err)) {
          const FormError = err.response?.data.data
          if (FormError) {
            Object.keys(FormError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: FormError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='my-10 bg-orange-500'>
      <div className='container'>
        <div className=' grid grid-cols-1 py-10 lg:grid-cols-5 lg:p-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded-xl bg-white p-10 shadow-lg' onSubmit={handleSubmitForm} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                type='email'
                placeholder='Nhập vào email...'
                className='mt-8'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                type='password'
                placeholder='Nhập vào  password...'
                className='mt-2'
                register={register}
                errorMessage={errors.password?.message}
              />
              <Input
                name='confirm_password'
                type='password'
                autoComplete='on'
                placeholder='confirm password...'
                className='mt-2'
                register={register}
                errorMessage={errors.confirm_password?.message}
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                  className=' w-full bg-red-500 py-4 text-center text-sm uppercase text-white duration-300  hover:bg-red-600 '
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8 flex items-end justify-center '>
                <span className='text-md text-gray-400'>Bạn đã có tài khoản?</span>
                <Link to={path.login} className='text-md ml-2 font-normal text-red-500'>
                  Đăng nhâp
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
