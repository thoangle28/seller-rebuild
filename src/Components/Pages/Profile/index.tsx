import MyProfile from 'Components/Common/MyProfile'
import DefaultLayout from 'Components/Layouts/DefaultLayout'
import {Link} from 'react-router-dom'
import './style.scss'
import {useEffect} from 'react'
import {getInfoUser} from './Redux/actions'
import {useAppDispatch, useAppSelector} from 'app/Hooks/hooks'
import Loading from 'Components/Common/Loading'

const Profile = () => {
  const profile = JSON.parse(localStorage.getItem('profile') || '{}')
  const {ID, user_email} = profile.user

  const dispatch = useAppDispatch()
  const {infoUser, isLoading} = useAppSelector((state) => state.profileReducer)

  const {
    firstname,
    lastname,
    brand,
    contactPhone,
    contactEmail,
    address,
    communications,
  } = infoUser

  const fullName = `${firstname} ${lastname}`

  const getInfoUserPayload = {
    user_id: ID,
    user_email: user_email,
  }

  useEffect(() => {
    dispatch(getInfoUser(getInfoUserPayload))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const infoDetails = [
    {
      title: 'Brand Name',
      text: brand?.name,
      textCapitalize: true,
    },
    {
      title: 'Brand logo',
      logo: brand?.logo || 'https://via.placeholder.com/100',
    },
    {
      title: 'Full name',
      text: fullName,
      textCapitalize: true,
    },
    {
      title: 'Contact Phone',
      text: contactPhone || 'Unknown',
    },
    {
      title: 'Contact Email',
      text: contactEmail || 'Unknown',
    },
    {
      title: 'Address',
      text: address || 'Unknown',
    },
    {
      title: 'Communications',
      text: `${
        communications?.email
          ? communications?.phone
            ? 'Email, Phone'
            : 'Email'
          : communications?.phone
          ? 'Phone'
          : 'Email'
      }`,
    },
  ]

  // Render info details list
  const infoDetailsList = infoDetails.map((item, index) => (
    <li className='info-details__item d-flex' key={index}>
      <h3 className='info-details__title m-0'>{item.title}</h3>
      {item.text && (
        <h3
          className={`info-details__text m-0 ${
            item.textCapitalize ? 'text-capitalize' : ''
          }`}>
          {item.text}
        </h3>
      )}
      {item.logo && (
        <img src={item.logo} alt='logo' className='info-details__img' />
      )}
    </li>
  ))

  return (
    <DefaultLayout>
      <section className='profile'>
        <h2 className='profile__title mb-3'>Profile Details</h2>

        <div className='profile-content d-flex align-items-stretch'>
          <MyProfile data={infoUser} isLoading={isLoading} />

          <div className='overview p-4'>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <nav className='overview__nav d-flex align-items-center'>
                  <h3 className='page-current text-capitalize m-0'>Overview</h3>
                  <Link to='/settings'>Settings</Link>
                </nav>

                <ul className='info-details__list pt-3 px-0 m-0'>
                  {infoDetailsList}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}

export default Profile
