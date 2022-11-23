import {useState} from 'react'
import closeIcon from './../../../../app/Images/icons/close-no-border.svg'
import editIcon from './../../../../app/Images/icons/edit-icon.svg'

const Variations = () => {
  const [option, setOptions] = useState('')

  const optionList = [
    'Add variation',
    'Create variations from all attributes',
    'Delete all variations',
  ]

  const renderOptionList = () => {
    return (
      <>
        <option value='' hidden></option>
        {optionList.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </>
    )
  }

  const handleChangeOption = (e: any) => {
    setOptions(e.target.value)
  }

  return (
    <div className='variations'>
      <div className='heading'>
        <select
          className='product-type__select w-100'
          value={option}
          onChange={handleChangeOption}>
          {renderOptionList()}
        </select>
      </div>

      <div className='content mt-4'>
        <div className='variation__item d-flex justify-content-end align-items-center py-3'>
          <img src={closeIcon} alt='close' className='close cursor-pointer' />
          <div className='separator'></div>

          <h3 className='variation__id m-0 mx-4 fw-medium'>#123456</h3>

          <div className='variation__select flex-grow-1'></div>

          <img src={editIcon} alt='edit' className='edit cursor-pointer' />
        </div>
      </div>
    </div>
  )
}
export default Variations
