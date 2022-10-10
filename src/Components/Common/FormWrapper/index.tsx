import './style.scss'

import backLoginIcon from './../../../app/Images/icons/arrow-left.svg'

type Props = {
  children: JSX.Element | JSX.Element[]
  formTitle: string
  backPagelogin?: boolean
}

const FormWrapper = (props: Props) => {
  const {formTitle, children, backPagelogin} = props

  return (
    <div className='form-wrap'>
      {backPagelogin ? (
        <div className='back-login'>
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
