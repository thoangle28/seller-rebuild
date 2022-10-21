import {FC, useState} from 'react'
import DefaultLayout from 'Components/Layouts/DefaultLayout'
import InfoTag from './../../Common/InfoTag'
import BarChart from 'Components/Common/Chart'
import {
  faChartSimple,
  faUserPlus,
  faListSquares,
  faTicketSimple,
} from '@fortawesome/free-solid-svg-icons'
import {iInfoData, iMonthData} from 'app/Models'
import {CURRENT_MONTH, CURRENT_YEAR, MONTHS, Data} from 'app/Constants'
import {
  dataTableBody,
  dataTableHead,
} from './../../../app/Constants/dataProductList'
import addToQueue from './../../../app/Images/icons/bxs_add-to-queue.svg'
import './style.scss'
import Table from 'Components/Common/Table'
type Props = {}

const initialMonthData: iMonthData = {
  color: '#000080',
  fullName: 'Jan',
  name: 'Jan',
}

const dumpmyData = {
  labels: Data.map((data) => data.month),
  datasets: [
    {
      label: 'Gained',
      data: Data.map((data) => data.benefit),
      backgroundColor: ['rgba(0, 0, 128, 1)'],
    },
  ],
}

const infoData: iInfoData[] = [
  {
    title: 'Promotion Products',
    subtitle: 'Products',
    icon: faChartSimple,
    number: 10,
  },
  {title: 'New Users', subtitle: 'in month', icon: faUserPlus, number: 10},
  {title: 'Item Order', subtitle: 'Products', icon: faListSquares, number: 3},
  {
    title: 'Tickets Report',
    subtitle: 'Products',
    icon: faTicketSimple,
    number: 3,
  },
]

const DashBoard: FC<Props> = (props: Props) => {
  // Declare Use State
  const [currentMonth, setCurrentMonth] = useState<iMonthData>(initialMonthData)
  const [userData] = useState(dumpmyData)

  const renderInfoTags = () => {
    return (
      <div className='row'>
        {infoData.map((item, index) => {
          const {icon, number, subtitle, title} = item
          return (
            <div className='col-sm-6 col-md-3 pe-0' key={index}>
              <InfoTag
                icon={icon}
                number={number}
                subTitle={subtitle}
                title={title}
              />
            </div>
          )
        })}
      </div>
    )
  }

  const renderMonthlyBussinessData = () => {
    return (
      <>
        <div className='dashboard-header'>
          <p className='dashboard-header__title mb-2'>SALE STATICS</p>
          <p className='dashboard-header__subtitle'>
            {CURRENT_MONTH} {parseInt(CURRENT_YEAR) - 1} - {CURRENT_MONTH}{' '}
            {CURRENT_YEAR}
          </p>
        </div>
        <div className='row'>
          <div className='col-sm-12 pe-0'>
            <div className='monthly-bussiness-data bg-white'>
              <div className='row'>
                <div className='col-md-4'>
                  <div
                    style={{border: `18px solid ${currentMonth.color}`}}
                    className='result-wrapper text-center d-flex justify-content-center align-items-center flex-column'>
                    <p className='month mb-0'>{currentMonth.fullName}</p>
                    <p
                      style={{color: `${currentMonth.color}`}}
                      className='profit my-1'>
                      $10.000
                    </p>
                    <span>Net Profilt</span>
                  </div>
                </div>
                <div className='col-md-8'>
                  <div className='d-flex justify-content-end flex-column'>
                    <p className='month-list-title text-end text-primary'>
                      Top 2/12
                    </p>
                    <div className='month-list d-flex justify-content-end align-items-center flex-wrap flex-row'>
                      {MONTHS.map((month) => {
                        return (
                          <div
                            key={month.name}
                            className='cursor-pointer month-list__item mb-2'
                            onClick={() => setCurrentMonth(month)}>
                            <p className='mb-0 d-flex text-capitalize justify-content-between align-items-center'>
                              <span
                                className='me-2'
                                style={{background: month.color}}></span>
                              {month.name}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderTable = () => {
    return (
      <div className='col-md-12'>
        <div className='header-wrapper d-flex justify-content-between align-items-center'>
          <div className='dashboard-header pt-3'>
            <p className='dashboard-header__title mb-2'>PRODUCTS LISTING</p>
            <p className='dashboard-header__subtitle'>Over 11 product(s)</p>
          </div>
          <button className='add-new-btn btn bg-white'>
            <img src={addToQueue} alt='add new product' /> New Product
          </button>
        </div>
        <div className='table-wrapper bg-white p-3'>
          <div className='bg-white'>
            <Table
              dataTableBody={dataTableBody}
              dataTableHead={dataTableHead}
            />
          </div>
          <div className='text-center my-3'>
            <button className='view-more-button btn btn-primary px-3'>
              View More Products
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderChart = () => {
    return (
      <div className='chart-wrapper'>
        <div className='dashboard-header'>
          <p className='dashboard-header__title mb-2'>SALE STATICS</p>
          <p className='dashboard-header__subtitle'>
            {CURRENT_MONTH} {parseInt(CURRENT_YEAR) - 1} - {CURRENT_MONTH}{' '}
            {CURRENT_YEAR}
          </p>
        </div>
        <div className='chart-section bg-white p-2'>
          {<BarChart chartData={userData} />}
        </div>
      </div>
    )
  }

  return (
    <DefaultLayout>
      <div className='row'>
        <div className='col-md-12'>{renderInfoTags()}</div>
      </div>
      <div className='row pt-4'>
        <div className='col-md-6'>{renderMonthlyBussinessData()}</div>
        <div className='col-md-6'>{renderChart()}</div>
      </div>
      <div className='row'>{renderTable()}</div>
    </DefaultLayout>
  )
}

export default DashBoard
