import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faList, faLayerGroup, faToggleOn, faUser, faChartLine, faGear } from '@fortawesome/free-solid-svg-icons'
interface iMenu {
    icon?: any;
    name: string
    path: string
}

const sideMenu: iMenu[] = [
    { icon: faChartSimple, name: 'Dashboard', path: '/dashboard' },
    { icon: faList, name: 'Product Listing', path: '/product-listing' },
    { icon: faLayerGroup, name: 'Create New Product', path: '/new-product' },
    { icon: faToggleOn, name: 'Attributes', path: '/attributes' },
    { icon: faChartLine, name: 'Sale Reports', path: '/sale-reports' },
]

const bottomMenu: iMenu[] = [
    { icon: faUser, name: 'My Profile', path: '/profile' },
    { icon: faGear, name: 'Account Settings', path: '/settings' }
]


const Sidebar: FC = () => {
    const navigate = useNavigate()

    const { pathname } = useLocation()

    const renderSidemenu = (menu: iMenu[]) => {
        return menu.map((item, i: number) => <li key={i} className={`cursor-pointer sidebar__list-item ${pathname === item.path ? 'active' : ''}`}>
            <p onClick={() => navigate(item.path)}>
                <FontAwesomeIcon width={24} height={22.75} className='item-icon' icon={item.icon} /> <span>{item.name}</span>
            </p>
        </li>
        )
    }

    return (
        <div className='sidebar d-flex flex-column align-items-center bg-light min-vh-100'>
            <div className="sidebar__avatar d-flex  align-items-center flex-column">
                <div className="user-avatar">

                    <img src="https://via.placeholder.com/100" className='rounded-circle' alt='avatar' />

                </div>
                <p className='mb-0'>User Name</p>
            </div>
            <div className="seperator"></div>
            <div className="sidebar__navigation">
                <ul className='sidebar__list ps-3'>
                    {renderSidemenu(sideMenu)}
                </ul>
            </div>
            <div className="seperation"></div>
            <div className="sidebar__navigation">
                <ul className='sidebar__list ps-0'>
                    {renderSidemenu(bottomMenu)}
                </ul>
                <button className='signout-button btn btn-primary w-100'>Sign Out</button>
            </div>
        </div>
    )
}

export default Sidebar