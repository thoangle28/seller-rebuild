import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './style.scss'
import ButtonPrimary from 'Components/Common/ButtonPrimary'
import {useState} from 'react'
import General from './General'
import Categories from './Categories'
import Inventory from './Inventory'

interface Props {
  previousStep: () => void
}

const CreateProductStepThree = (props: Props) => {
  const {previousStep} = props

  const [productType, setProductType] = useState<string>('')
  const [content, setContent] = useState<string>('General')

  const dataHeading = [
    'General',
    'Categories',
    'Inventory',
    'Shipping',
    'Linked Products',
    'Attributes',
    productType && 'Variations',
  ]

  const handleChangProductType = (e: any) => {
    setProductType(e.target.value)
  }

  const renderDataHeading = () =>
    dataHeading.map(
      (title) =>
        title && (
          <span
            onClick={() => setContent(title)}
            className={`product-type__content-title fw-medium cursor-pointer ${
              content === title ? 'text-primary' : ''
            }`}
            key={title}>
            {title}
          </span>
        )
    )

  return (
    <>
      <div className='create-product__bottom p-4 mb-2 d-flex flex-column align-items-center'>
        <h3 className='product-type__heading-title fw-semibold mb-3'>
          Product Type
        </h3>
        <select
          className='product-type__select cursor-pointer fw-medium'
          value={productType}
          onChange={handleChangProductType}>
          <option value=''>Simple product</option>
          <option value='variable'>Variable product</option>
        </select>
      </div>

      <div className='product-type__content bg-white mb-3 p-4'>
        <div className='d-flex align-content-center justify-content-between'>
          {renderDataHeading()}
        </div>

        <div className='separator my-4'></div>

        {content === 'General' && <General productType={productType} />}
        {content === 'Categories' && <Categories productType={productType} />}
        {content === 'Inventory' && <Inventory productType={productType} />}

        <div className='separator my-4'></div>

        <div className='d-flex justify-content-between align-items-center'>
          <div
            className='product-type__bottom-back cursor-pointer'
            onClick={previousStep}>
            <FontAwesomeIcon icon={faArrowLeft} className='d-inline-block' />
            <span className='fw-medium d-inline-block'>Previous</span>
          </div>

          <div className='product-type__bottom-actions'>
            <span className='d-d-inline-block fw-medium cursor-pointer'>
              Cancel
            </span>
            <ButtonPrimary>Quick Save</ButtonPrimary>
          </div>
        </div>
      </div>

      <ButtonPrimary className='create-product__btn'>
        Create Product
      </ButtonPrimary>
    </>
  )
}

export default CreateProductStepThree
