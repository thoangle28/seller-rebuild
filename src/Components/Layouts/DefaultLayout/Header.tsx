import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import headerIcon from './../../../app/Images/logo.svg'

type Props = {}

const Header: FC = (props: Props) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()


  const formatPathname = (pathname: String) => {
    if (!pathname) return ''
    const temp = pathname.split('')
    const result = temp.join(' ')
    return result
  }

  const renderBreadcrumbs = () => {
    return <span className='fw-600 text-white text-uppercase'>
      {pathname.split('/')}
    </span >


  }

  return (
    <div className='header d-flex justify-content-start'>
      <div className='header__wrapper d-flex flex-column justify-content-center'>
        <div className='header__image'>
          <img src={headerIcon} alt='header' />
        </div>
        <div className='header__breadscrumb'>{renderBreadcrumbs()}</div>
      </div>
    </div>
  )
}

export default Header
