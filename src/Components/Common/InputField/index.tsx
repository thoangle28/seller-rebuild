import {useState} from 'react'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {ChangeEvent} from 'react'
import './style.scss'

interface Props {
  name: string
  id: string
  label: string
  type: string
  isError: boolean
  textError: string | undefined
  value: string
  disabled?: boolean
  onChange: (event: ChangeEvent) => void
  onBlur: (event: ChangeEvent) => void
  iconShowPassword?: boolean
}

const InputField = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const {
    name,
    id,
    label,
    type = 'text',
    isError,
    textError,
    iconShowPassword = false,
    value,
    onChange,
    onBlur,
  } = props
  return (
    <div className='form__input-field-wrap'>
      <div className='form__input-field'>
        <input
          className={
            isError
              ? iconShowPassword
                ? 'form__input form__input--error px-4 form__input--show-pwd'
                : 'form__input form__input--error px-4'
              : iconShowPassword
              ? 'form__input px-4 form__input--show-pwd'
              : 'form__input px-4'
          }
          id={id}
          type={iconShowPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder=' '
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
        <label className='form__label user-select-none pe-none' htmlFor={id}>
          {label}
        </label>

        {iconShowPassword && (
          <>
            {showPassword ? (
              <FontAwesomeIcon
                icon={faEye}
                className='show-pwd'
                onClick={handleShowPassword}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className='hide-pwd'
                onClick={handleShowPassword}
              />
            )}
          </>
        )}
      </div>
      {isError ? (
        <div className='form__input-text-error text-danger'>{textError}</div>
      ) : (
        ''
      )}
    </div>
  )
}

export default InputField
