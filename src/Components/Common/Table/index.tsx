import {iTableHead, iTableBody} from 'app/Models'
import {FC} from 'react'

import './style.scss'

type Props = {
  dataTableHead: iTableHead[]
  dataTableBody: iTableBody[]
}

const Table: FC<Props> = (props: Props) => {
  const {dataTableHead, dataTableBody} = props

  //   Render table header
  const RenderTableHeader = () => {
    return (
      <>
        {dataTableHead.map((item) => (
          <th className={`${item.className} p-0 px-8`} key={item.name}>
            {item.name}
          </th>
        ))}
      </>
    )
  }

  //   Render table body
  const RenderTableBody = () => {
    return (
      <>
        {dataTableBody.map((item) => (
          <tr key={item.id}>
            <td className='text-center'>
              <span className='table__product-id'>{item.id}</span>
            </td>

            <td>
              <div className='table__product d-flex align-items-center'>
                <img src={item.productImg} alt={item.productName} />

                <div className='table__product-info d-flex flex-column ps-3 pe-5'>
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
              <h4 className='table__product-sku m-0 text-center'>{item.sku}</h4>
            </td>

            <td>
              <div className='table__product-price d-flex align-items-center'>
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
                    ? 'table__product-status table__product-status--pending text-center text-capitalize m-0'
                    : 'table__product-status table__product-status--darft text-center text-capitalize m-0'
                }>
                {item.status}
              </h4>
            </td>

            <td>
              <h4 className='text-center m-0'>{item.actions}</h4>
            </td>
          </tr>
        ))}
      </>
    )
  }

  return (
    <table className='table m-0'>
      <thead>
        <tr>
          <RenderTableHeader />
        </tr>
      </thead>
      <tbody>
        <RenderTableBody />
      </tbody>
    </table>
  )
}

export default Table
