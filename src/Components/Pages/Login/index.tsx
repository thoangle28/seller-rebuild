import { convertBase64 } from 'app/Utils/'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FullWidthLayout from '../../Layouts/FullWidthLayout'
import { add, getData } from './Redux/action'
import Signin from './Signin'
const Login: FC = () => {
    const dispatch = useDispatch()
    const { number, data, isLoading } = useSelector((state: any) => state.loginReducer)

    const onClick = () => {
        dispatch(add(1))
    }

    const getList = () => {
        getData(dispatch)
    }

    const [baseImage, setBaseImage] = useState("");
    const [images, setImages] = useState<any[]>([])
    const uploadImage = async (e: any) => {
        const file = e.target.files[0];
        const base64: any = await convertBase64(file);
        setBaseImage(base64);
    };

    const uploadMultipleImages = (e: any) => {
        const { files } = e.target
        for (const file of files) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                setImages(prev => [...prev, reader.result])
            };
            reader.onerror = () => {
                console.log(reader.error)
            }
        }
    }
    return (
        <FullWidthLayout>
            <Signin />
            <div className="wrapper w-50 mx-auto">
                <div className="row">
                    <div className="col-sm-4">
                        <button onClick={onClick} className="btn btn-success" >Click Me</button>
                        <p className="text-danger">{number}</p>
                    </div>
                    <div className="col-sm-8">
                        <button onClick={getList} disabled={isLoading} className="btn btn-success" >Get Data</button>
                        {!data.length ? <p className='text-danger'>No Item Found</p> : data.map((item: any) => {
                            return <p className='text-success'>{item.name}</p>
                        })}
                    </div>
                </div>

            </div>
            <input type="file" onChange={uploadImage} />
            <img src={baseImage} alt="" />
            <input type="file" onChange={uploadMultipleImages} multiple />
            <div>
                {
                    images.map((img: any) => <img src={img} alt="" />)
                }
            </div>
        </FullWidthLayout>
    )
}

export default Login