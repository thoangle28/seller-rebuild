import {useState} from 'react'

const dataOptions = [
  'test1',
  'test2',
  'test3',
  'test4',
  'test5',
  'test6',
  'test11',
  'test21',
  'test31',
  'test41',
  'test51',
  'test61',
]

const Attributes = () => {
  const [optionList, setOptionList] = useState<string[]>([])
  const [attribute, setAttribute] = useState<string>('')
  const [attributeSelected, setAttributeSelected] = useState<string[]>([])

  const renderOptions = () => (
    <>
      <option value='' hidden></option>
      {dataOptions.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </>
  )

  const handleChangeAttribute = (e: any) => {
    setAttribute('')
    setAttributeSelected((pre) => [...pre, e.target.value])
  }

  return (
    <div className='attributes'>
      <div className='attributes__heading d-flex align-items-center'>
        <h3 className='m-0 me-3 fw-medium'>Custom Product Attribute</h3>

        <select
          className='product-type__select flex-grow-1 cursor-pointer fw-medium'
          value={attribute}
          onChange={handleChangeAttribute}>
          {renderOptions()}
        </select>

        <span className='ms-3 fw-medium'>Add new</span>
      </div>
    </div>
  )
}
export default Attributes
