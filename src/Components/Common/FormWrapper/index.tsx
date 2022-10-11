import './style.scss'

import backLoginIcon from './../../../app/Images/icons/arrow-left.svg'
import {useNavigate} from 'react-router-dom'

type Props = {
  children: JSX.Element | JSX.Element[]
  formTitle: string
  backPageLogin?: boolean
}

const FormWrapper = (props: Props) => {
  const {formTitle, children, backPageLogin} = props

  const navigate = useNavigate()

  const handleBackPagelogin = () => {
    navigate('/login')
  }

  return (
    <div className='form-wrap'>
      {backPageLogin ? (
        <div className='back-login' onClick={handleBackPagelogin}>
          <img
            src={backLoginIcon}
            alt='back-login'
            className='back-login-icon'
          />
        </div>
      ) : null}

      <h3 className='form-title mb-3 text-center'>{formTitle}</h3>

      {children}
    </div>
  )
}

export default FormWrapper
