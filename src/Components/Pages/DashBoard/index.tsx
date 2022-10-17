import DefaultLayout from 'Components/Layouts/DefaultLayout'
import { FC, useState } from 'react'
import InfoTag from './../../Common/InfoTag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { iMonthData } from 'app/Models'
import { MONTHS } from 'app/Constants'
import './style.scss'
type Props = {}

const initialMonthData: iMonthData = {
    color: '#000080',
    fullName: 'Jan',
    name: 'Jan'
}

const DashBoard: FC<Props> = (props: Props) => {
    // Declare Use State
    const [currentMonth, setCurrentMonth] = useState<iMonthData>(initialMonthData)

    const renderInfoTags = () => {
        return <div className="row">
            <div className="col-md-6 mb-3 pe-0">
                <InfoTag title='Promotion Products' subTitle='products' icon={<FontAwesomeIcon icon={faChartSimple} />} number={10} />
            </div>
            <div className="col-md-6 mb-3 pe-0">
                <InfoTag title='New Users' subTitle='in month' icon={<FontAwesomeIcon icon={faChartSimple} />} number={12} />
            </div>
            <div className="col-md-6 mb-3 pe-0">
                <InfoTag title='Item Order' subTitle='in month' icon={<FontAwesomeIcon icon={faChartSimple} />} number={13} />
            </div>
            <div className="col-md-6 mb-3 pe-0">
                <InfoTag title='Tickets Reports' subTitle='products' icon={<FontAwesomeIcon icon={faChartSimple} />} number={22} />
            </div>
        </div>
    }

    const renderMonthlyBussinessData = () => {
        return <div className="row">
            <div className='monthly-bussiness-data bg-white p-3'>
                <div className="row">
                    <div className="col-md-6">
                        <div style={{ border: `18px solid ${currentMonth.color}`}} className="result-wrapper text-center d-flex justify-content-center align-items-center flex-column">
                            <p className="month mb-0">{currentMonth.fullName}</p>
                            <p style={{color:`${currentMonth.color}`}} className="profit my-1">$10.000</p>
                            <span>Net Profilt</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="month-list d-flex justify-content-center align-items-center flex-wrap flex-row">
                            {MONTHS.map(month => {
                                return <div className='cursor-pointer month-list__item' onClick={() => setCurrentMonth(month)}>
                                    <p className='mb-0 d-flex text-capitalize align-items-center'><span className='me-4' style={{ background: month.color }}></span>{month.name}</p>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <DefaultLayout>
            <div className="dashboard-wrapper">
                <div className="row">
                    <div className="col-md-5">
                        {renderInfoTags()}
                        {renderMonthlyBussinessData()}
                    </div>
                </div>
            </div>
            <div className="col-md-7">

            </div>
        </DefaultLayout >
    )
}

export default DashBoard