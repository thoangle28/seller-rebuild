import {faImages, faPlus, faTags} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import DefaultLayout from 'Components/Layouts/DefaultLayout'
import {FC, useState, Fragment} from 'react'
import CreateProductStepOne from './CreateProductStepOne'
import CreateProductStepTwo from './CreateProductStepTwo'
import './style.scss'

const CreateNewProduct: FC = () => {
  const [step, setStep] = useState<number>(1)

  const handleNextStep = () => {
    setStep((step) => step + 1)
  }

  const dataHeading = [
    {
      step: 1,
      icon: faPlus,
    },
    {
      step: 2,
      icon: faImages,
    },
    {
      step: 3,
      icon: faTags,
    },
  ]

  const renderDataHeading = () => {
    return dataHeading.map((item, _, arr) => (
      <Fragment key={item.step}>
        <div
          className={`create-product__heading-icon rounded-circle d-flex justify-content-center align-items-center border border-primary ${
            step >= item.step ? 'bg-primary' : 'bg-white'
          }`}>
          <FontAwesomeIcon
            icon={item.icon}
            className={`${step >= item.step ? 'text-white' : 'text-primary'}`}
          />
        </div>

        {arr.length !== item.step && (
          <div
            className={`create-product__heading-separator border border-primary mx-2 ${
              step === item.step
                ? 'pending border-0'
                : step <= item.step
                ? 'bg-white'
                : 'bg-primary'
            }`}
          />
        )}
      </Fragment>
    ))
  }

  return (
    <DefaultLayout>
      <div className='create-product bg-white d-flex flex-column align-items-center py-4'>
        <div className='create-product__heading mb-4 d-flex align-items-center'>
          {renderDataHeading()}
        </div>

        {step === 1 && <CreateProductStepOne nextStep={handleNextStep} />}
        {step === 2 && <CreateProductStepTwo nextStep={handleNextStep} />}
      </div>
    </DefaultLayout>
  )
}

export default CreateNewProduct
