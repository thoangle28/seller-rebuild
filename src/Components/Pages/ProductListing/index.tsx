import {dataTableBody, dataTableHead} from 'app/Constants/dataProductList'
import Table from 'Components/Common/Table'
import DefaultLayout from 'Components/Layouts/DefaultLayout'
import './style.scss'

const ProductListing = () => {
  return (
    <DefaultLayout>
      <div className='pdt-list'>
        <Table dataTableHead={dataTableHead} dataTableBody={dataTableBody} />
      </div>
    </DefaultLayout>
  )
}

export default ProductListing
