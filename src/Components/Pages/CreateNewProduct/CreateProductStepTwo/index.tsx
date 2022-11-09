import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import uploadIcon from './../../../../app/Images/icons/upload-brand.svg'
import closeIcon from './../../../../app/Images/icons/close-square.svg'
import './style.scss'
import ButtonPrimary from 'Components/Common/ButtonPrimary'
import {useEffect, useState} from 'react'

interface Props {
  nextStep: () => void
}

const CreateProductStepTwo = (props: Props) => {
  const {nextStep} = props

  const [checkUsePhotoContent, setCheckUsePhotoContent] =
    useState<boolean>(false)
  const [thumbnail, setThumbnail] = useState<any>('')
  const [photoGallery, setPhotoGallery] = useState<string[]>([])
  const [skipStep, setSkipStep] = useState<boolean>(true)

  console.log(photoGallery)

  useEffect(() => {
    if (thumbnail || photoGallery.length > 0) {
      setSkipStep(false)
    } else {
      setSkipStep(true)
    }
  }, [thumbnail, photoGallery.length])

  const handleChangeThumbnail = (e: any) => {
    let file = e.target.files[0]

    file = URL.createObjectURL(file)

    setThumbnail(file)
  }

  const handleRemoveThumbnail = () => {
    setThumbnail('')
  }

  const handleUploadPhotoGallery = (e: any) => {
    const selectedFileList = e.target.files
    const selectedFileListArr = Array.from(selectedFileList)

    const fileList = selectedFileListArr.map((file: any) =>
      URL.createObjectURL(file)
    )

    setPhotoGallery((previousPhotoList: string[]) => {
      const newPhotoGallery = [...previousPhotoList, ...fileList]
      const tenPhotoGallery = newPhotoGallery.slice(0, 10)
      return tenPhotoGallery
    })
  }

  const renderPhotoGalleryList = () =>
    photoGallery.map((img: string, index: number) => (
      <div key={index}>
        <img src={img} alt={`index ${index + 1}`} />
        <img
          src={closeIcon}
          alt='close'
          className='close-img cursor-pointer'
          onClick={() =>
            setPhotoGallery(photoGallery.filter((item) => img !== item))
          }
        />
      </div>
    ))

  const renderUploadMultiplePhoto = () =>
    !checkUsePhotoContent && (
      <div className='create-product__preview-img mb-4'>
        {renderPhotoGalleryList()}
        {photoGallery.length < 10 && (
          <div>
            <input
              type='file'
              hidden
              id='upload-multi-img'
              multiple
              onChange={handleUploadPhotoGallery}
            />
            <label
              htmlFor='upload-multi-img'
              className='w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer border'>
              <img src={uploadIcon} alt='upload' />
              <p className='m-0 mt-2 fw-semibold'>Add more photos</p>
              <span className='mt-2'>(max: 10 files)</span>
            </label>
          </div>
        )}
      </div>
    )

  const renderUploadThumbnail = () =>
    thumbnail ? (
      <div className='border-0'>
        <img
          src={thumbnail}
          alt='thumbnail'
          className='thumbnail-img w-100 h-100'
        />
        <img
          src={closeIcon}
          alt='close'
          className='close-thumbnail cursor-pointer'
          onClick={handleRemoveThumbnail}
        />
      </div>
    ) : (
      <div className='border bg-white'>
        <input
          type='file'
          hidden
          id='upload-thumbnail'
          multiple
          onChange={handleChangeThumbnail}
        />
        <label
          htmlFor='upload-thumbnail'
          className='d-flex flex-column align-items-center justify-content-center cursor-pointer w-100 h-100'>
          <img src={uploadIcon} alt='upload' />
          <p className='m-0 mt-2 fw-semibold'>Click here to change</p>
        </label>
      </div>
    )

  return (
    <>
      <div className='create-product__bottom p-4 mb-3'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <div className='create-product__upload-heading-left'>
            <input
              type='checkbox'
              checked={checkUsePhotoContent}
              onChange={() => setCheckUsePhotoContent(!checkUsePhotoContent)}
              id='use-photo-content'
              className='cursor-pointer'
            />
            <label
              htmlFor='use-photo-content'
              className='fw-medium cursor-pointer'>
              Recommended - Use the photos from the content
            </label>
          </div>
          <div className='create-product__upload-heading-right'>
            <span
              className='fw-medium cursor-pointer'
              onClick={() => setPhotoGallery([])}>
              Clear all photos
            </span>
          </div>
        </div>

        {renderUploadMultiplePhoto()}

        <div className='create-product__upload-thumbnail'>
          <label
            htmlFor='upload-thumbnail'
            className='cursor-pointer fw-medium mb-2'>
            Thumbnail
          </label>

          {renderUploadThumbnail()}
        </div>
      </div>

      <ButtonPrimary onClick={nextStep} className='create-product__upload-btn'>
        <span>{skipStep ? 'Skip' : 'Next'}</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </ButtonPrimary>
    </>
  )
}

export default CreateProductStepTwo
