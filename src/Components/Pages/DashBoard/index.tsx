import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from 'Components/Layouts/DefaultLayout'
import InfoTag from './../../Common/InfoTag'
import BarChart from 'Components/Common/Chart'
import {
  faChartSimple,
  faUserPlus,
  faListSquares,
  faTicketSimple,
} from '@fortawesome/free-solid-svg-icons'
import { iGeneral, iInfoData, iProductListing } from 'app/Models'
import addToQueue from './../../../app/Images/icons/bxs_add-to-queue.svg'
import './style.scss'
import Table from 'Components/Common/Table'
import { useAppDispatch, useAppSelector } from 'app/Hooks/hooks'
import { getChartData, getTotalData } from './redux/actions'
import Loading from 'Components/Common/Loading'
import editIcon from './../../../app/Images/icons/edit-icon.svg'
import { getProductList } from 'Components/Common/Table/Redux/actions'
import { monthSerializable, MONTH_COLORS, TABLE_PRODUCT_LIST, TABLE_PRODUCT_SALE_STATUS } from './../../../app/Constants'
import defaultImg from './../../../app/Images/default-img-err.jpg'
import notFound from './../../../app/Images/not-found.png'

type Props = {}

const initialMonthData = {
  color: '#000080',
  fullName: 'Jan',
  name: 'Jan',
  total: 0
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
  const [currentMonth, setCurrentMonth] = useState(initialMonthData)

  const productListSelector = useAppSelector((state) => state.tableReducer)
  const { productList } = productListSelector

  const dispatch = useAppDispatch()
  const { list, time } = data12Months

  const { user } = useAppSelector((state) => state.loginReducer)
  const { ID: userId } = user

  useEffect(() => {
    if (userId) {
      const payload: iGeneral = {
        user_id: userId,
      }
      dispatch(getChartData(payload))
      dispatch(getTotalData(payload))
    }
  }, [])

  useEffect(() => {
    const payload: iProductListing = {
      user_id: userId,
      page_size: 12,
      current_page: 1,
      search: '',
      status: '',
    }
    dispatch(getProductList(payload))
  }, [])

  const infoData: iInfoData[] = [
    {
      title: 'Promotion Products',
      subtitle: 'products',
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
      subtitle: 'products',
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

  const chartOptions = {
    plugins: {
      legend: {
        display: false
      },
    },
  }

  const getProductListStatus = (status: string) => {
    const item = TABLE_PRODUCT_SALE_STATUS.find((item: any) => item.name.toLocaleLowerCase() === status);
    return item ? <span className={`text-${item.btnStatus} text-capitalize fw-semibold`}>{item.name === 'publish' ? 'approved' : item.name}</span>
      : <span className='text-success text-capitalize fw-semibold'>Draft</span>
  }

  // Render UI 
  const renderInfoTags = () => {
    return (
      <div className='row g-4'>
        {infoData.map((item, index) => {
          const { icon, number, subtitle, title } = item
          return (
            <div
              className='col-12 col-md-12 col-lg-12 col col-xl-6 col-xxl-3'
              key={index}>
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
            sales statistics
          </p>
          <p className='dashboard-header__subtitle'>
            {time}
          </p>
        </div>
        <div className='row g-0'>
          <div className='col-sm-12'>
            {
              isLoading ? <Loading /> : <div className='monthly-bussiness-data bg-white'>
                <div className='row g-0'>
                  <div className='col-sm-12 col-md-12 col-xxl-5'>
                    <div
                      style={{ border: `18px solid ${currentMonth.color}` }}
                      className='result-wrapper text-center d-flex justify-content-center align-items-center flex-column mx-auto'>
                      <p className='month mb-0'>{currentMonth.fullName}</p>
                      <p
                        style={{ color: `${currentMonth.color}` }}
                        className='profit my-1'>
                        ${currentMonth.total ? currentMonth.total : 0}
                      </p>
                      <span>Net Profilt</span>
                    </div>
                  </div>
                  <div className='col-sm-12 col-md-12 col-xxl-7'>
                    <div className='d-flex justify-content-end flex-column'>
                      <p className='month-list-title text-end text-primary'>
                        Top 2/12
                      </p>
                      <div className='month-list d-flex justify-content-end align-items-center flex-wrap'>
                        {list.map((item: any, i: number) => {
                          return (
                            <div
                              key={i}
                              className='cursor-pointer month-list__item mb-2'
                              onClick={() => setCurrentMonth({ color: MONTH_COLORS[i], fullName: `${monthSerializable[item.month]} - ${item.year}`, name: item.month, total: item.total })}>
                              <p className='mb-0 d-flex text-capitalize justify-content-between align-items-center'>
                                <span
                                  className='me-2'
                                  style={{ background: MONTH_COLORS[i] }}
                                >
                                </span>
                                {monthSerializable[item.month]}-{parseInt(item.year) - 2000}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </>
    )
  }

  const renderTableBody = () => {
    return (
      <>
        {productListSelector.isSuccess && productList.length > 0 && (
          <tbody>
            {productList.map((item: any) => (
              <tr key={item.product_id}>
                <td>
                  <span className='table__product-id text-start fw-medium'>
                    {item.product_id}
                  </span>
                </td>

                <td>
                  <div className='table__product d-flex align-items-center'>
                    <img
                      src={item.thumbnail || defaultImg}
                      alt={item.product_name}
                    />

                    <div className='table__product-info d-flex flex-column'>
                      <h3 className='m-0'>{item.product_name}</h3>
                      <p className='m-0'>{item.category}</p>
                    </div>
                  </div>
                </td>

                <td>
                  <h4 className='table__product-type m-0 text-center text-capitalize fw-medium'>
                    {item.type}
                  </h4>
                </td>
                <td>
                  <h4 className='table__product-sku m-0 text-center fw-medium'>
                    {item.sku || '-'}
                  </h4>
                </td>

                <td>
                  <div className='table__product-price d-flex align-items-center justify-content-center flex-column'>
                    <p className='text-center mb-2'>{item.type === 'Variable' ? 'From' : ''}</p>
                    <div>
                      <h4 className='table__product-price-new p-0 fw-semibold'>
                        $ {item.sale_price > 0 ? item.sale_price : item.price}
                      </h4>
                    </div>

                    {item.sale_price > 0 && (
                      <h5 className='table__product-price-old p-0'>
                        $ {item.price}
                      </h5>
                    )}
                  </div>
                </td>

                <td>
                  <h4 className='table__product-date text-center m-0 fw-medium'>
                    {item.posted_date}
                  </h4>
                </td>
                <td className='text-center'>
                  {getProductListStatus(item.status)}
                </td>

                <td>
                  <h4 className='table__product-action text-center m-0'>
                    <img src={editIcon} alt='edit icon' />
                  </h4>
                </td>
              </tr>
            ))}
          </tbody>
        )}

        {productListSelector.isFailure && (
          <tbody>
            <tr>
              <td colSpan={TABLE_PRODUCT_LIST.length}>
                <div className='d-flex justify-content-center align-items-center flex-column'>
                  <img className='mb-2' src={notFound} alt="search" />
                  <span className='table__no-product mt-0 fs-6 text-center d-block text-capitalize'>
                    {productListSelector.message}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        )
        }
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
            <p className='dashboard-header__subtitle'>Over {productListSelector.productList.length} product(s)</p>
          </div>
          <button className='add-new-btn btn bg-white'>
            <img src={addToQueue} alt='add new product' /> New Product
          </button>
        </div>
        <div className='table-wrapper bg-white p-4'>
          {productListSelector.isLoading ? (
            <Loading />
          ) : (
            <div className='bg-white'>
              <Table dataTableHead={TABLE_PRODUCT_LIST}>{renderTableBody()}</Table>
              {productListSelector.isSuccess && (
                <div className='text-center'>
                  <Link
                    to={'/product-listing'}
                    className='view-more-button btn btn-primary'>
                    View More Products
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderChart = () => {
    const chartData = {
      labels: list.map((data: any) => `${monthSerializable[data.month]}`),
      datasets: [
        {
          data: list.map((data: any) => data.total),
          backgroundColor: ['rgba(0, 0, 128, 1)'],
        },
      ],
    }
    return (
      <div className='chart-wrapper'>
        <div className='dashboard-header'>
          <p className='dashboard-header__title mb-2 text-capitalize'>
            Products Sold
          </p>
          <p className='dashboard-header__subtitle'>
            {time}
          </p>
        </div>
        <div className='chart-section bg-white p-2'>
          {isLoading ? <Loading /> : <BarChart chartData={chartData} options={chartOptions} />}
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
        <div className='col-sm-12 col-xl-12 col-xxl-6'>
          {renderMonthlyBussinessData()}
        </div>
        <div className='col-sm-12 col-xl-12 col-xxl-6'>{renderChart()}</div>
      </div>
      <div className='row'>{renderTable()}</div>
    </DefaultLayout>
  )
}

export default DashBoard
