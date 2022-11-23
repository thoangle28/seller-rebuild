import FullWidthLayout from 'Components/Layouts/FullWidthLayout'
import { useEffect, } from 'react'
import { getData, signIn } from './ReduxToolkit/slice'
import { useAppDispatch, useAppSelector, } from 'app/Hooks/hooks'
import Loading from 'Components/Common/Loading'
import { iLogin } from 'app/Models'
import { useNavigate } from 'react-router-dom'

const Example = () => {
  const dispatch = useAppDispatch()
  const { status, data } = useAppSelector(state => state.getDataSlice)
  const navigate = useNavigate()
  const formData = {
    username: 'testt1234561234562@gmail.com',
    password: 'Admin@123456'
  } as iLogin
  useEffect(() => {
    // dispatch(getData())
  }, [])

  const clickEvent = () => {
    dispatch(signIn(formData, navigate))
  }
  return (
    <FullWidthLayout>
      <>
        {
          // status === 'fulfilled' ? data.map(item => <p className='text-white'>{item.name}</p>) : <Loading />
        }
        <button onClick={clickEvent}>Click</button>
      </>
    </FullWidthLayout>
  )
}

export default Example
