import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './../../../app/Images/logo.png'

const Header: FC = () => {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter(Boolean);

  const formatPathname = (pathname: String) => {
    if (!pathname)
      return ''
    const temp = pathname.split('-')
    const result = temp.join(' ')
    return result
  }

  const renderBreadcrumbs = () => {
    return pathnames.map((item, i, arr) => {
      const fullPath = arr.slice(0, i + 1).join('/')
      return <p className='cursor-pointer text-capitalize fw-600 text-white mb-0' key={item} onClick={() => { navigate(`/${fullPath}`) }}>{formatPathname(item)}</p>
    })
  }

  return (
    <div className="header d-flex">
      <div className="header__breadscrumb w-100 d-flex flex-row justify-content-between align-items-center">
        {renderBreadcrumbs()}
        <div>
          <img src={logo} alt="LOGO" />
        </div>
      </div>
    </div>
  )
}

export default Header