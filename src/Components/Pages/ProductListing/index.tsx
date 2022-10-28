import {dataTableBody, dataTableHead} from 'app/Constants/dataProductList'
import Table from 'Components/Common/Table'
import DefaultLayout from 'Components/Layouts/DefaultLayout'
import './style.scss'

import editIcon from './../../../app/Images/icons/edit-icon.svg'

const ProductListing = () => {
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

  return (
    <DefaultLayout>
      <div className='pdt-list py-4'>
        <Table dataTableHead={dataTableHead}>{renderTableBody()}</Table>
      </div>
    </DefaultLayout>
  )
}

export default ProductListing
