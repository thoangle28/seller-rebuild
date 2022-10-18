import './style.scss'

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined
  children: string
  disabled?: boolean
  onClick?: () => void
}

const ButtonPrimary = (props: Props) => {
  const {children, type, disabled = false, onClick, ...passProps} = props

  return (
    <button
      disabled={disabled}
      className='button-primary bg-primary text-center text-capitalize'
      type={type}
      onClick={onClick}
      {...passProps}>
      {children}
    </button>
  )
}

export default ButtonPrimary
