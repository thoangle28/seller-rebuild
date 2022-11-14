import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './style.scss'
import ButtonPrimary from 'Components/Common/ButtonPrimary'
import {useState} from 'react'
import General from './General'
import Categories from './Categories'
import Inventory from './Inventory'
import Shipping from './Shipping'
import LinkedProducts from './LinkedProducts'
import Attributes from './Attributes'
import Variations from './Variations'

interface Props {
  previousStep: () => void
}

const CreateProductStepThree = (props: Props) => {
  const {previousStep} = props

  const [productType, setProductType] = useState<string>('')
  const [listUseForVariations, setListUseForVariations] = useState<any>([])
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

  const handleChangeListUseForVariations = (id: number) => {
    setListUseForVariations((pre: any) => {
      const isCheck = listUseForVariations.includes(id)
      if (isCheck) {
        return listUseForVariations.filter((item: any) => item !== id)
      } else {
        return [...pre, id]
      }
    })
  }

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

      <div className='product-type__content  flex-grow-1 d-flex flex-column bg-white mb-3 p-4'>
        <div className='d-flex align-content-center justify-content-between'>
          {renderDataHeading()}
        </div>

        <div className='separator my-4'></div>

        {content === 'General' && <General productType={productType} />}
        {content === 'Categories' && <Categories />}
        {content === 'Inventory' && <Inventory productType={productType} />}
        {content === 'Shipping' && <Shipping />}
        {content === 'Linked Products' && <LinkedProducts />}
        {content === 'Attributes' && (
          <Attributes
            productType={productType}
            listUseForVariations={listUseForVariations}
            onChangeListUseForVariations={(id: number) =>
              handleChangeListUseForVariations(id)
            }
            setListUseForVariations={setListUseForVariations}
          />
        )}
        {content === 'Variations' && <Variations />}

        <div className='mt-auto'>
          <div className='separator my-4'></div>
          <div className='d-flex justify-content-between align-items-center'>
            <div
              className='product-type__bottom-back cursor-pointer flex-shrink-0'
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
      </div>

      <ButtonPrimary className='create-product__btn'>
        Create Product
      </ButtonPrimary>
    </>
  )
}

export default CreateProductStepThree
