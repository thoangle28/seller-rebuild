import { FC } from 'react'
import './style.scss'

interface Props {
    icon: any,
    title: string,
    subTitle: string,
    number: number
}

const InfoTag: FC<Props> = (props: Props) => {
    const { icon, title, subTitle, number } = props
    return (
        <div className='info-tag d-flex justify-content-center align-items-center color-primary'>
            <div className="info-tag__icon text-primary">
                {icon}
            </div>
            <div className="info-tag__data ps-2">
                <p className='subtitle text-primary mb-0'>{number} <span>{subTitle}</span></p>
                <p className='title text-primary mb-0'>{title}</p>
            </div>
        </div>
    )
}

export default InfoTag