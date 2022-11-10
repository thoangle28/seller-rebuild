import {useState} from 'react'
interface Props {
  productType: string
}
const Inventory = (props: Props) => {
  const {productType} = props

  const [valueSKU, setValueSKU] = useState<string>('')
  const [stock, setStock] = useState<string>('inStock')

  const dataCheckbox = [
    {
      title: 'In Stock',
      id: 'inStock',
    },
    {
      title: 'Out of Stock',
      id: 'outOfStock',
    },
    {
      title: 'On backorder',
      id: 'onBackorder',
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
          checked={stock === item.id}
          onChange={() => setStock(item.id)}
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
    <div className='inventory'>
      <div className='inventory__top mb-4'>
        <div className='d-flex align-items-center justify-content-end'>
          <label htmlFor='sku' className='cursor-pointer me-3 fw-medium'>
            SKU
          </label>
          <input
            id='sku'
            name='sku'
            type='text'
            className='fw-medium px-4'
            value={valueSKU}
            onChange={(e: any) => setValueSKU(e.target.value)}
          />
        </div>

        <div className='inventory__top-desc d-flex justify-content-end mt-2'>
          <p className='m-0 fw-medium'>
            SKU refers to a Stock-keeping unit, a unique identifier for each
            distinct product and service that can be purchased.
          </p>
        </div>
      </div>

      {!productType && (
        <div className='inventory__bottom'>
          <div className='d-flex align-items-start'>
            <h3 className='m-0 fw-medium me-3 d-inline-block fw-medium'>
              Stock Status
            </h3>

            <div className='d-flex flex-column'>
              <div className='inventory__bottom-checkbox d-flex align-items-center'>
                {renderCheckbox()}
              </div>
              <p className='inventory__bottom-checkbox-desc m-0 mt-2 fw-medium'>
                SKU refers to a Stock-keeping unit, a unique identifier for each
                distinct product and service that can be purchased.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Inventory
