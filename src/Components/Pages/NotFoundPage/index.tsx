import DefaultLayout from 'Components/Layouts/DefaultLayout'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import notfound from './../../../app/Images/error-404.png'
import './style.scss'

const NotFoundPage: FC = () => {
    const navigate = useNavigate()
    return (
        <DefaultLayout>
            <div className="wrapper">
                <div className='row m-0'>
                    <div className="notfound-wrapper d-flex flex-column justify-content-center align-items-center col-lg-12 col-md-12 col-sm-12">
                        <img className='mb-3' src={notfound} alt="not found" />
                        <p>Page Not Found</p>
                        <button onClick={()=> navigate('/dashboard')} className="btn btn-primary mt-4">Return To Dashboard</button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default NotFoundPage