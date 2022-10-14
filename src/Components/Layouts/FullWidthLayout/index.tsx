import {FC} from 'react'
import './style.scss'
import {Navigate} from 'react-router-dom'
interface Props {
  children: JSX.Element[] | JSX.Element
}

const FullWidthLayout: FC<Props> = (props: Props) => {
  const profile = localStorage.getItem('profile')
  const {children} = props

  // automatically redirect and prevent user trying to access login page when they has logged
  if (profile) return <Navigate to='/dashboard' replace />

  return (
    <div className='main-content container-fluid p-0 m-0 min-vh-100 d-flex justify-content-center align-items-center'>
      {children}
    </div>
  )
}
export default FullWidthLayout
