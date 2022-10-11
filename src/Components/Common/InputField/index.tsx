import {ChangeEvent} from 'react'
import './style.scss'

interface Props {
  name: string
  id: string
  label: string
  type?: string
  isError?: boolean
  textError?: string
  onChange: (event: ChangeEvent) => void
  onBlur: (event: ChangeEvent) => void
}

const InputField = (props: Props) => {
  const {
    name,
    id,
    label,
    type = 'text',
    isError,
    textError,
    onChange,
    onBlur,
  } = props
  return (
    <div className='form__input-field-wrap'>
      <div className='form__input-field'>
        <input
          className={
            isError
              ? 'form__input form__input--error py-3 pe-4'
              : 'form__input py-3 pe-4'
          }
          id={id}
          type={type}
          placeholder=' '
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
        <label className='form__label user-select-none pe-none' htmlFor={id}>
          {label}
        </label>
      </div>
      {isError ? <div className='form__input-text-error'>{textError}</div> : ''}
    </div>
  )
}

export default InputField
