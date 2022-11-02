import {useEffect} from 'react'
import MyProfile from 'Components/Common/MyProfile'
import DefaultLayout from 'Components/Layouts/DefaultLayout'

import './style.scss'

import SignInMethod from './SigninMethod'
import {useAppDispatch, useAppSelector} from 'app/Hooks/hooks'
import {getInfoUser} from '../Profile/Redux/actions'
import Settings from './Settings'

const AccountSettings = () => {
  const {user} = useAppSelector((state) => state.loginReducer)
  const {ID, user_email} = user

  useEffect(() => {
    const getInfoUserPayload = {
      user_id: ID,
      user_email: user_email,
    }

    dispatch(getInfoUser(getInfoUserPayload))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useAppDispatch()
  const {infoUser, isLoading} = useAppSelector((state) => state.profileReducer)

  return (
    <DefaultLayout>
      <section className='account-settings'>
        <h2 className='account-settings__title mb-3 text-capitalize'>
          Account Settings
        </h2>

        <div className='d-flex'>
          {/* My Profile */}
          <MyProfile data={infoUser} isLoading={isLoading} />

          <div className='account-settings__right d-flex flex-column'>
            {/* Settings */}
            <Settings />

            <SignInMethod />
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}

export default AccountSettings
