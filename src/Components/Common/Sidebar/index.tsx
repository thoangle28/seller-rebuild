import { FC, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartSimple,
  faList,
  faPlus,
  faToggleOn,
  faUser,
  faChartLine,
  faGear,
} from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from './../../../app/Hooks/hooks'
import { logout } from 'Components/Pages/Login/Redux/action'
import triangle from './../../../app/Images/triangle.png'
import userPlaceholder from './../../../app/Images/user_placeholder.png'
import { getInfoUser } from 'Components/Pages/Profile/Redux/actions'
import Loading from '../Loading'

interface iMenu {
  icon?: any
  name: string
  path: string
}

const sideMenu: iMenu[] = [
  { icon: faChartSimple, name: 'Dashboard', path: '/dashboard' },
  { icon: faList, name: 'Products Listing', path: '/product-listing' },
  { icon: faPlus, name: 'Create New Product', path: '/new-product' },
  { icon: faToggleOn, name: 'Attributes', path: '/attributes' },
  { icon: faChartLine, name: 'Sales Report', path: '/sale-reports' },
]

const bottomMenu: iMenu[] = [
  { icon: faUser, name: 'My Profile', path: '/my-profile' },
  { icon: faGear, name: 'Account Settings', path: '/settings' },
]

const Sidebar: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const [isDisplaying, setIsDisplaying] = useState<boolean>(false)
  const { user } = useAppSelector(state => state.loginReducer)
  const { infoUser, isLoading } = useAppSelector((state) => state.profileReducer)

  const { ID, user_email } = user
  const { avatar, firstname, lastname } = infoUser

  const getInfoUserPayload = {
    user_id: ID,
    user_email: user_email,
  }

  useEffect(() => {
    dispatch(getInfoUser(getInfoUserPayload))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const displayProfileMenu = () => {
    setIsDisplaying(!isDisplaying)
  }

  const renderSidemenu = (menu: iMenu[]) => {
    return menu.map((item, i: number) => (
      <li
        key={i}
        className={`cursor-pointer sidebar__list-item ${pathname === item.path ? 'active' : ''
          }`}>
        <p
          className='d-flex align-items-center'
          onClick={() => navigate(item.path)}>
          <FontAwesomeIcon
            width={20}
            height={22.75}
            className='item-icon'
            icon={item.icon}
          />{' '}
          <span className='d-inline-block'>{item.name}</span>
        </p>
      </li>
    ))
  }

  const renderProfileMenu = () => {
    return isDisplaying ? (
      <>
        <div className='seperator'></div>
        <div className='sidebar__navigation pb-4'>
          <ul className='sidebar__list ps-0'>{renderSidemenu(bottomMenu)}</ul>
          <button
            onClick={signOut}
            className='signout-button btn btn-primary'>
            Sign Out
          </button>
        </div>
      </>
    ) : (
      <></>
    )
  }

  // Logout Action
  const signOut = () => {
    dispatch(logout())
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='sidebar d-flex flex-column align-items-center min-vh-100'>
      <div className='sidebar__avatar d-flex  align-items-center flex-column'>
        {isLoading ? <Loading /> : <>
          <div className='user-avatar'>
            <img
              src={avatar ? avatar : userPlaceholder}
              className='rounded-circle'
              alt='avatar'
            />
          </div>
          <div className='user-name d-flex justify-content-center align-items-center cursor-pointer' onClick={displayProfileMenu}>
            <p className='mb-0'>{firstname} {lastname}</p>
            <img
              className='cursor-pointer ps-3'
              src={triangle}
              alt='triangle'
            />
          </div>
        </>
        }
      </div>

      {renderProfileMenu()}
      <div className='seperator'></div>
      <div className='sidebar__navigation'>
        <ul className='sidebar__list ps-3'>{renderSidemenu(sideMenu)}</ul>
      </div>
    </div>
  )
}

export default Sidebar
