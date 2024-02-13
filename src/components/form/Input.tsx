import { forwardRef, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

const InputForm = forwardRef<HTMLInputElement, InputFormProps>((props) => {
  const { register } = useFormContext()

  return (
    <Input
      id={props.name}
      className="border border-[#D9D9D9] rounded-[5px] h-20 text-lg text-[#393939]"
      {...register(props.name)}
      {...props}
    />
  )
})

InputForm.displayName = 'InputForm' // Adição do displayName

export { InputForm }
