import {FC, useState, useEffect} from 'react'
import DefaultLayout from 'Components/Layouts/DefaultLayout'
import InfoTag from './../../Common/InfoTag'
import BarChart from 'Components/Common/Chart'
import {
  faChartSimple,
  faUserPlus,
  faListSquares,
  faTicketSimple,
} from '@fortawesome/free-solid-svg-icons'
import {iGeneral, iInfoData, iMonthData} from 'app/Models'
import {CURRENT_MONTH, CURRENT_YEAR, MONTHS, Data} from 'app/Constants'
import {
  dataTableBody,
  dataTableHead,
} from './../../../app/Constants/dataProductList'
import addToQueue from './../../../app/Images/icons/bxs_add-to-queue.svg'
import './style.scss'
import Table from 'Components/Common/Table'
import {useAppDispatch, useAppSelector} from 'app/Hooks/hooks'
import {getChartData, getTotalData} from './redux/actions'
import Loading from 'Components/Common/Loading'
import editIcon from './../../../app/Images/icons/edit-icon.svg'
import { Link } from 'react-router-dom'

type Props = {}

const initialMonthData: iMonthData = {
  color: '#000080',
  fullName: 'Jan',
  name: 'Jan',
}

const DashBoard: FC<Props> = (props: Props) => {
  // Declare Use State
  const {
    isLoading,
    totalOrder,
    newCustomerByProduct,
    totalProductSale,
    totalTickets,
    data12Months,
  } = useAppSelector((state) => state.generalReducer)
  const [currentMonth, setCurrentMonth] = useState<iMonthData>(initialMonthData)

  const dispatch = useAppDispatch()

  const profile: any = JSON.parse(localStorage.getItem('profile') || '{}')
  const userId: string = profile.user?.ID || ''

  useEffect(() => {
    if (userId) {
      const payload: iGeneral = {
        user_id: userId,
      }
      dispatch(getChartData(payload))
      dispatch(getTotalData(payload))
    }
  }, [])

  const infoData: iInfoData[] = [
    {
      title: 'Promotion Products',
      subtitle: 'Products',
      icon: faChartSimple,
      number: totalOrder?.total_orders || 0,
    },
    {
      title: 'New Users',
      subtitle: 'in month',
      icon: faUserPlus,
      number: newCustomerByProduct?.total_customer || 0,
    },
    {
      title: 'Item Order',
      subtitle: 'Products',
      icon: faListSquares,
      number: totalProductSale?.total_product || 0,
    },
    {
      title: 'Tickets Report',
      subtitle: 'in month',
      icon: faTicketSimple,
      number: totalTickets?.total_tickets || 0,
    },
  ]

  const renderTableBody = () => {
    return (
      <tbody>
        {dataTableBody.length > 0 ? (
          dataTableBody.map((item) => (
            <tr key={item.id}>
              <td>
                <span className='table__product-id text-left'>{item.id}</span>
              </td>

              <td>
                <div className='table__product d-flex align-items-center'>
                  <img src={item.productImg} alt={item.productName} />

                  <div className='table__product-info d-flex flex-column'>
                    <h3 className='m-0 pb-2'>{item.productName}</h3>
                    <p className='m-0'>{item.productDesc}</p>
                  </div>
                </div>
              </td>

              <td>
                <h4 className='table__product-type m-0 text-center text-capitalize'>
                  {item.type}
                </h4>
              </td>

              <td>
                <h4 className='table__product-sku m-0 text-center'>
                  {item.sku}
                </h4>
              </td>

              <td>
                <div className='table__product-price d-flex align-items-center justify-content-center'>
                  <h4 className='table__product-price-new m-0'>
                    $ {item.price.new}
                  </h4>
                  <h5 className='table__product-price-old m-0'>
                    $ {item.price.old}
                  </h5>
                </div>
              </td>

              <td>
                <h4 className='table__product-date text-center m-0'>
                  {item.date}
                </h4>
              </td>

              <td>
                <h4
                  className={
                    item.status === 'pending'
                      ? 'table__product-status text-warning text-center text-capitalize m-0'
                      : 'table__product-status text-primary text-center text-capitalize m-0'
                  }>
                  {item.status}
                </h4>
              </td>

              <td>
                <h4 className='table__product-action text-center m-0'>
                  <img src={editIcon} alt='edit icon' />
                </h4>
              </td>
            </tr>
          ))
        ) : (
          <td colSpan={8} className='py-3'>
            <span className='table__no-product text-primary text-center d-block text-capitalize'>
              No Product To Display
            </span>
          </td>
        )}
      </tbody>
    )
  }

  const renderInfoTags = () => {
    return (
      <div className='row g-4'>
        {infoData.map((item, index) => {
          const {icon, number, subtitle, title} = item
          return (
            <div className='col-sm-6 col-md-3' key={index}>
              {isLoading ? (
                <Loading />
              ) : (
                <InfoTag
                  icon={icon}
                  number={number}
                  subTitle={subtitle}
                  title={title}
                />
              )}
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
          <p className='dashboard-header__title mb-2 text-capitalize'>
            sale statics
          </p>
          <p className='dashboard-header__subtitle'>
            {CURRENT_MONTH} {parseInt(CURRENT_YEAR) - 1} - {CURRENT_MONTH}{' '}
            {CURRENT_YEAR}
          </p>
        </div>
        <div className='row g-0'>
          <div className='col-sm-12'>
            <div className='monthly-bussiness-data bg-white'>
              <div className='row g-0'>
                <div className='col-md-5'>
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
                <div className='col-md-7'>
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
            <p className='dashboard-header__title mb-2 text-capitalize'>
              Products Listing
            </p>
            <p className='dashboard-header__subtitle'>Over 11 product(s)</p>
          </div>
          <button className='add-new-btn btn bg-white'>
            <img src={addToQueue} alt='add new product' /> New Product
          </button>
        </div>
        <div className='table-wrapper bg-white py-4'>
          <div className='bg-white'>
            <Table dataTableHead={dataTableHead}>{renderTableBody()}</Table>
          </div>
          <div className='text-center'>
            <Link to={'/product-listing'} className='view-more-button btn btn-primary'>
              View More Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const renderChart = () => {
    const chartData = {
      labels: data12Months?.list.map((data: any) => data.month),
      datasets: [
        {
          label: 'Total',
          data: data12Months?.list.map((data: any) => data.total),
          backgroundColor: ['rgba(0, 0, 128, 1)'],
        },
      ],
    }
    return (
      <div className='chart-wrapper'>
        <div className='dashboard-header'>
          <p className='dashboard-header__title mb-2 text-capitalize'>
            sale statics
          </p>
          <p className='dashboard-header__subtitle'>
            {CURRENT_MONTH} {parseInt(CURRENT_YEAR) - 1} - {CURRENT_MONTH}
            {CURRENT_YEAR}
          </p>
        </div>
        <div className='chart-section bg-white p-2'>
          {isLoading ? <Loading /> : <BarChart chartData={chartData} />}
        </div>
      </div>
    )
  }

  return (
    <DefaultLayout>
      <div className='row g-0'>
        <div className='col-md-12'>{renderInfoTags()}</div>
      </div>
      <div className='row pt-4 g-4'>
        <div className='col-md-6'>{renderMonthlyBussinessData()}</div>
        <div className='col-md-6'>{renderChart()}</div>
      </div>
      <div className='row'>{renderTable()}</div>
    </DefaultLayout>
  )
}

export default DashBoard
