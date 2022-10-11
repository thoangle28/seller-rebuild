import './style.scss'

interface Props {
  children: string
  disabled?: boolean
}

const ButtonSubmitForm = (props: Props) => {
  const {children, disabled} = props
  return (
    <button
      className='button-submit-form mt-4'
      type='submit'
      disabled={disabled}>
      {children}
    </button>
  )
}

export default ButtonSubmitForm
