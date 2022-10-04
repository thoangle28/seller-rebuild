import { FC } from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

interface Props {
    ex?: string
}

const Signin: FC<Props> = (props: Props) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            console.log(values);
        },
    });
    return (
        <div className='w-25 p-0 m-0'>
            <form onSubmit={formik.handleSubmit} >
                <div className="form-group mt-2">
                    <label htmlFor="email">Email :</label>
                    <input className="form-control" type="email" id="email" onChange={formik.handleChange} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="password">Password :</label>
                    <input className="form-control" type="password" id="password" onChange={formik.handleChange} />
                </div>
                <div className="form-group mt-2">
                    <input className="btn btn-success" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default Signin