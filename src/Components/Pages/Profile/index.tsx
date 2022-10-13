import MyProfile from 'Components/Common/MyProfile'
import DefaultLayout from 'Components/Layouts/DefaultLayout'
import {Link} from 'react-router-dom'
import './style.scss'

const infoDetails = [
  {
    title: 'Brand Name',
    text: 'Hiep Khach Giang Ho',
  },
  {
    title: 'Brand logo',
    logo: 'https://via.placeholder.com/100',
  },
  {
    title: 'Full name',
    text: 'Hiep Khach Giang Ho',
  },
  {
    title: 'Contact Phone',
    text: '0865146954',
  },
  {
    title: 'Contact Email',
    text: 'Hiep Khach Giang Ho',
  },
  {
    title: 'Address',
    text: 'Thanh Pho Hue',
  },
  {
    title: 'Communications',
    text: 'Email, Phone',
  },
]

const Profile = () => {
  // Render info details list
  const infoDetailsList = infoDetails.map((item, index) => (
    <li
      className='info-details__item d-flex pb-3 align-items-center'
      key={index}>
      <h3 className='info-details__title m-0'>{item.title}</h3>
      {item.text ? (
        <h3 className='info-details__text m-0'>{item.text}</h3>
      ) : (
        <img src={item.logo} alt='logo' className='info-details__img ms-5' />
      )}
    </li>
  ))

  return (
    <DefaultLayout>
      <section className='profile'>
        <h2 className='profile__title mb-3'>Profile Details</h2>

        <div className='profile-content d-flex align-items-stretch'>
          <MyProfile />

          <div className='overview'>
            <nav className='overview__nav pb-3 d-flex align-items-center'>
              <h3 className='page-current text-capitalize m-0'>Overview</h3>
              <Link to='/settings'>Settings</Link>
            </nav>

            <ul className='info-details__list pt-3 px-0 m-0'>
              {infoDetailsList}
            </ul>
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}

export default Profile
