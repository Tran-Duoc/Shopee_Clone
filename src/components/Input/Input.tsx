import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute | 'text'
  placeholder?: string
  errorMessage?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}

export default function Input({
  type,
  placeholder,
  name,
  register,
  rules,
  className,
  errorMessage,
  autoComplete
}: Props) {
  return (
    <div className={className}>
      <input
        autoComplete={autoComplete}
        type={type}
        className='w-full rounded-sm border border-gray-300  p-3  outline-none focus:border-gray-700  focus:bg-slate-50 focus:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 min-h-[1.5rem] text-sm text-red-600 '>{errorMessage}</div>
    </div>
  )
}
