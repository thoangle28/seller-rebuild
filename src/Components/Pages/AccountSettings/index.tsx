import {useEffect, useRef} from 'react'
import MyProfile from 'Components/Common/MyProfile'
import DefaultLayout from 'Components/Layouts/DefaultLayout'

import './style.scss'
import PopupUpdateProfileSuccess from 'Components/Common/PopupUpdateProfileSuccess'
import {useOnClickOutside} from 'app/Hooks/UseClickOutSide'
import SignInMethod from './SignInMethod'
import {useAppDispatch, useAppSelector} from 'app/Hooks/hooks'
import {deleteMessage, getInfoUser} from '../Profile/Redux/actions'
import Settings from './Settings'

const AccountSettings = () => {
  const {user} = useAppSelector((state) => state.loginReducer)
  const {ID, user_email} = user

  const dispatch = useAppDispatch()
  const {infoUser, isLoading, message, isSuccess} = useAppSelector(
    (state) => state.profileReducer
  )

  const popupUpdateProfileRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(popupUpdateProfileRef, () => {
    dispatch(deleteMessage())
  })

  useEffect(() => {
    const getInfoUserPayload = {
      user_id: ID,
      user_email: user_email,
    }

    dispatch(getInfoUser(getInfoUserPayload))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

        {/* Popup update success */}
        {isSuccess && message && (
          <div className='update-success-overlay d-flex align-items-center justify-content-center'>
            <div className='update-success-wrap' ref={popupUpdateProfileRef}>
              <PopupUpdateProfileSuccess message={message} />
            </div>
          </div>
        )}
      </section>
    </DefaultLayout>
  )
}

export default AccountSettings
