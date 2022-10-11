import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import headerIcon from './../../../app/Images/Addin.png'

type Props = {}

const Header: FC = (props: Props) => {
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
      return <span className='cursor-pointer text-capitalize fw-600 text-white' key={item} onClick={() => { navigate(`/${fullPath}`) }}>{formatPathname(item)}</span>
    })
  }

  return (
    <div className="header d-flex justify-content-start p-3">
      <div className="header__wrapper d-flex flex-column justify-content-center">
        <div className="header__image">
          <img src={headerIcon} alt="header" />
        </div>
        <div className="header__breadscrumb">
          {renderBreadcrumbs()}
        </div>
      </div>
    </div>
  )
}

export default Header