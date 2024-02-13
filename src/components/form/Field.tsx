import { forwardRef, HTMLAttributes } from 'react'

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

const Field = forwardRef<HTMLDivElement, FieldProps>((props, ref) => {
  return <div className="flex flex-col gap-[11px]" ref={ref} {...props} />
})

Field.displayName = 'Form.Field'

export { Field }
