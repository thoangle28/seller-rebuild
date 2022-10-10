import {ChangeEvent} from 'react'
import './style.scss'

interface Props {
  name: string
  id: string
  label: string
  onChange: (event: ChangeEvent) => void
}

const InputField = (props: Props) => {
  const {name, id, label, onChange} = props
  return (
    <div className='form-field'>
      <input
        className='form__input py-3 pe-4'
        id={id}
        type='text'
        placeholder=' '
        name={name}
        onChange={onChange}
      />
      <label className='form__label user-select-none pe-none' htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default InputField
