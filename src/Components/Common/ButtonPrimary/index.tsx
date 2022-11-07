import './style.scss'

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined
  children: string
  disabled?: boolean
  className?: string
  onClick?: () => void
}

const ButtonPrimary = (props: Props) => {
  const {children, type, disabled = false, className, onClick} = props

  return (
    <button
      disabled={disabled}
      className={`button-primary btn btn-primary text-center text-capitalize ${
        className ? className : ''
      }`}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default ButtonPrimary
