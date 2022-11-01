import { useAppSelector } from 'app/Hooks/hooks'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import './style.scss'
interface Props {
  children: JSX.Element[] | JSX.Element
}

const FullWidthLayout: FC<Props> = (props: Props) => {
  const { children } = props
  const { user } = useAppSelector(state => state.loginReducer)

  const { ID } = user

  return ID ? <Navigate to="/dashboard" replace /> : (
    <div className='main-content container-fluid p-0 m-0 min-vh-100 d-flex justify-content-center align-items-center'>
      {children}
    </div>
  )
}
export default FullWidthLayout
