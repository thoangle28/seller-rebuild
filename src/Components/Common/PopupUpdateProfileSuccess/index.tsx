import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import ButtonPrimary from '../ButtonPrimary'
import './style.scss'
interface Props {
  message: string
}

const PopupUpdateProfileSuccess = (props: Props) => {
  const {message} = props
  return (
    <div className='update-success d-flex flex-column text-center'>
      <div className='update-success__icon d-flex align-items-center justify-content-center'>
        <FontAwesomeIcon icon={faCheck} />
      </div>

      <h3 className='update-success__title text-capitalize'>Update Profile</h3>
      <p className='update-success__sub-title'>{message}</p>

      <Link to='/profile'>
        <ButtonPrimary>General View</ButtonPrimary>
      </Link>
    </div>
  )
}

export default PopupUpdateProfileSuccess
