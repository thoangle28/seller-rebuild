import {FC} from 'react'
import './style.scss'

const Loading: FC = () => {
  return (
    <div className='loading d-flex flex-column align-items-center'>
      <div className='loading__icon'></div>
      <h6 className='loading__text m-0 mt-2 text-primary'>Loading...</h6>
    </div>
  )
}

export default Loading
