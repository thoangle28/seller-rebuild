import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import headerIcon from './../../../app/Images/logo.svg'

const Header: FC = () => {
  const { pathname } = useLocation()

  const formatPathname = (pathname: String): string => {
    if (!pathname) return ''
    const temp = pathname.split('/').join(' ')
    const result = temp.split('-').join(' ')
    return result
  }

  const renderBreadcrumbs = () => {
    return <span className='fw-600 text-white text-uppercase'>
      {formatPathname(pathname)}
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
