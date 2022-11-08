import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import uploadIcon from './../../../../app/Images/icons/upload-brand.svg'
import closeIcon from './../../../../app/Images/icons/close-square.svg'
import './style.scss'
import ButtonPrimary from 'Components/Common/ButtonPrimary'
import {useState, useEffect} from 'react'

interface Props {
  nextStep: () => void
}

const CreateProductStepTwo = (props: Props) => {
  const {nextStep} = props

  const [checkUsePhotoContent, setCheckUsePhotoContent] =
    useState<boolean>(false)
  const [thumbnail, setThumbnail] = useState<any>('')

  useEffect(() => {
    return () => {
      thumbnail && URL.revokeObjectURL(thumbnail.preview)
    }
  }, [thumbnail])

  const handleChangeThumbnail = (e: any) => {
    const file = e.target.files[0]

    file.preview = URL.createObjectURL(file)

    setThumbnail(file)
  }

  const handleRemoveThumbnail = () => {
    URL.revokeObjectURL(thumbnail.preview)
    setThumbnail('')
  }

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
              Recommanded - Use the photos from the content
            </label>
          </div>
          <div className='create-product__upload-heading-right'>
            <span className='fw-medium cursor-pointer'>Clear all photos</span>
          </div>
        </div>

        {!checkUsePhotoContent && (
          <div className='create-product__preview-img mb-4'>
            <div>
              <img
                src='https://znews-photo.zingcdn.me/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
                alt='hi hi'
              />
              <img
                src={closeIcon}
                alt='close'
                className='close-img cursor-pointer'
              />
            </div>
            <div>
              <input type='file' hidden id='upload-multi-img' multiple />
              <label
                htmlFor='upload-multi-img'
                className='w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer'>
                <img src={uploadIcon} alt='upload' />
                <p className='m-0 fw-semibold'>Add more photos</p>
                <span>(max: 10 files)</span>
              </label>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}

        <div className='create-product__upload-thumbnail'>
          <label
            htmlFor='upload-thumbnail'
            className='cursor-pointer fw-medium mb-2'>
            Thumbnail
          </label>

          {thumbnail ? (
            <div className='border-0'>
              <img
                src={thumbnail.preview}
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
                <p className='m-0 fw-semibold'>Click here to change</p>
              </label>
            </div>
          )}
        </div>
      </div>

      <ButtonPrimary onClick={nextStep} className='create-product__upload-btn'>
        <span>Skip</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </ButtonPrimary>
    </>
  )
}

export default CreateProductStepTwo
