import { forwardRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute | 'text'
  errorMessage?: string
  className?: string
  errClassName: string
}
const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
  { type, className, onChange, errClassName, errorMessage, ...rest },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }

  return (
    <div className={className}>
      <input
        type={type}
        className='w-full rounded-sm border border-gray-300  p-3  outline-none focus:border-gray-700  focus:bg-slate-50 focus:shadow-sm'
        {...rest}
        onChange={handleChange}
        ref={ref}
      />
      <div className={`mt-1 min-h-[1.5rem] text-sm text-red-600 ${errClassName}`}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
