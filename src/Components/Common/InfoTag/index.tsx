import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './style.scss'

interface Props {
    icon: any,
    title: string,
    subTitle: string,
    number: number,
    isLoading: boolean
}

const InfoTag: FC<Props> = (props: Props) => {
    const { icon, title, subTitle, number, isLoading } = props
    return <div className='info-tag d-flex justify-content-center align-items-center color-primary'>
        <div className="info-tag__icon text-primary">
            {!isLoading ? <FontAwesomeIcon icon={icon} /> : <Skeleton width={70} height={70} />}
        </div>
        <div className="info-tag__data">
            {!isLoading ? <p className='subtitle text-primary fw-semibold'>{number} <span className='fw-normal'>{subTitle}</span></p> : <Skeleton count={1} />}
            <p className='title mb-0'>{!isLoading ? title : <Skeleton count={1} width={180} height={20} />}</p>
        </div>
    </div>
}

export default InfoTag