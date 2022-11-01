import {FC} from 'react'
import './style.scss'
import loadingImg from './../../../app/Images/loading.png'

const Loading: FC = () => {
  return (
    <div className='loading d-flex flex-column align-items-center'>
      <img src={loadingImg} alt='loading' />
      <h6 className='loading__text m-0 mt-2 text-primary'>Loading...</h6>
    </div>
  )
}

export default Loading
