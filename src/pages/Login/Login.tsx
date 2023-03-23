import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/context/app.context'
import { schema, Schema } from '../../utils/rule'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (data: FormData) => {
      return loginUser(data)
    }
  })

  const handleSubmitLoginUser = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate(path.home)
      }
    })
  })

  return (
    <div className='my-10 bg-orange-500'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className=' grid grid-cols-1 py-10 lg:grid-cols-5 lg:p-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded-xl bg-white p-10 shadow-lg' onSubmit={handleSubmitLoginUser}>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                type='email'
                placeholder='Nhập vào email...'
                className='mt-8'
                register={register}
                errorMessage={errors?.email?.message}
              />
              <Input
                name='password'
                type='password'
                placeholder='Nhập vào  password...'
                className='mt-2'
                register={register}
                errorMessage={errors?.password?.message}
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                  className=' flex w-full items-center justify-center gap-5 bg-red-500 py-4 text-center  text-sm uppercase text-white duration-300 hover:bg-red-600'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-end justify-center '>
                <span className='text-md text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link to={path.register} className='text-md ml-2 font-normal text-red-500'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
