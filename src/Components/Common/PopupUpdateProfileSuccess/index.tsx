import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import ButtonPrimary from '../ButtonPrimary'
import './style.scss'

const PopupUpdateProfileSuccess = () => {
  return (
    <div className='update-success d-flex flex-column text-center'>
      <div className='update-success__icon d-flex align-items-center justify-content-center mb-3'>
        <FontAwesomeIcon icon={faCheck} />
      </div>

      <h3 className='update-success__title text-capitalize mb-3'>
        Update Profile
      </h3>
      <p className='update-success__sub-title mb-3'>
        Your profile has been updated successfully
      </p>

      <Link to='/profile'>
        <ButtonPrimary>General View</ButtonPrimary>
      </Link>
    </div>
  )
}

export default PopupUpdateProfileSuccess
