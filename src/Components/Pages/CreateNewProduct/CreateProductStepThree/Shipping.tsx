import {useState} from 'react'

const Shipping = () => {
  const [shipping, setShipping] = useState<string>('noShippingClass')

  const dataCheckbox = [
    {
      title: 'No shipping class',
      id: 'noShippingClass',
    },
    {
      title: 'SG Product',
      id: 'sgProduct',
    },
    {
      title: 'China Furniture',
      id: 'ChinaFurniture',
    },
  ]

  const renderCheckbox = () => {
    return dataCheckbox.map((item: any, index: number) => (
      <div className='d-flex align-items-center' key={index}>
        <input
          type='radio'
          name='inventory'
          id={item.id}
          hidden
          checked={shipping === item.id}
          onChange={() => setShipping(item.id)}
        />
        <label
          htmlFor={item.id}
          className='radio-custom border rounded-circle border-dark cursor-pointer'></label>
        <label htmlFor={item.id} className='fw-medium ms-2 cursor-pointer'>
          {item.title}
        </label>
      </div>
    ))
  }

  return (
    <div className='shipping'>
      <div className='d-flex align-items-start'>
        <h3 className='m-0 fw-medium me-3 d-inline-block fw-medium'>
          Shipping Class
        </h3>

        <div className='d-flex flex-column'>
          <div className='shipping-checkbox d-flex align-items-center'>
            {renderCheckbox()}
          </div>
          <p className='shipping-checkbox-desc m-0 mt-2 fw-medium'>
            Shipping classes are used by certain shipping methods to group
            similar products.
          </p>
        </div>
      </div>
    </div>
  )
}
export default Shipping
