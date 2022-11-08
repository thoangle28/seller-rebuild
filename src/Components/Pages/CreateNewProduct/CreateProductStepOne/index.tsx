import './style.scss'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ButtonPrimary from 'Components/Common/ButtonPrimary'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useState} from 'react'

interface Props {
  nextStep: () => any
}

const CreateProductStepOne = (props: Props) => {
  const {nextStep} = props

  const [productName, setProductName] = useState<string>('')

  const handleChangeProductName = (e: any) => {
    setProductName(e.target.value)
  }

  return (
    <>
      <div className='create-product__bottom p-4 mb-3'>
        <div className='product-title d-flex flex-column mb-3'>
          <label
            htmlFor='pdt-title'
            className='product-label cursor-pointer mb-2 fw-medium'>
            Product Title <span className='text-danger'>*</span>
          </label>
          <input
            type='text'
            id='pdt-title'
            className='border'
            value={productName}
            onChange={handleChangeProductName}
          />
        </div>

        <div className='product-content d-flex flex-column mb-2'>
          <label className='product-label mb-2 fw-medium'>
            Product Content <span className='text-danger'>*</span>
          </label>
          <CKEditor editor={ClassicEditor} />
        </div>

        <p className='product-note fw-medium text-danger m-0'>
          Please only add a maximum of 10 photos for the content
        </p>
      </div>

      <ButtonPrimary
        onClick={nextStep}
        className='create-product__btn'
        disabled={!productName}>
        <span>Next</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </ButtonPrimary>
    </>
  )
}

export default CreateProductStepOne
