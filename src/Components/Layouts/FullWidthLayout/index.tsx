import { useAppSelector } from 'app/Hooks/hooks'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'
interface Props {
  children: JSX.Element[] | JSX.Element
}

const FullWidthLayout: FC<Props> = (props: Props) => {
  const { children } = props
  const { isLogin } = useAppSelector(state => state.loginReducer)
  const navigate = useNavigate()

  const renderAlreadyLogin = () => {
    return <div className='main-content container-fluid p-0 m-0 min-vh-100 d-flex justify-content-center align-items-center'>
      <div className='bg-light p-5 rounded text-center'>
        <p>You're Already Login , click the button to comeback the content Page</p>
        <button className='btn btn-danger text-white fw-medium' onClick={() => navigate('/dashboard')}>Back To Dashboard Page</button>
      </div>
    </div>
  }

  return isLogin ? renderAlreadyLogin() : (
    <div className='main-content container-fluid p-0 m-0 min-vh-100 d-flex justify-content-center align-items-center'>
      {children}
    </div>
  )
}
export default FullWidthLayout
