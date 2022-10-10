import './style.scss'

interface Props {
  children: string
}

const ButtonSubmitForm = (props: Props) => {
  const {children} = props
  return (
    <button className='button-submit-form mt-4' type='submit'>
      {children}
    </button>
  )
}

export default ButtonSubmitForm
