import useDebounce from 'app/Hooks/UseDebounce'
import {useState, useEffect, useRef, Fragment} from 'react'
import addIcon from './../../../../app/Images/icons/add.svg'
import closeIcon from './../../../../app/Images/icons/close-no-border.svg'
import arrowIcon from './../../../../app/Images/arrow-down.png'
import {useOnClickOutside} from 'app/Hooks/UseClickOutSide'

const Attributes = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [checkVisibleOnTheProduct, setCheckVisibleOnTheProduct] =
    useState<boolean>(true)
  const [isActiveId, setActiveId] = useState<number>()
  const [showAttributeList, setShowAttributeList] = useState<boolean>(false)
  const [attributeList, setAttributeList] = useState<any[]>([])
  const [valueSearchAttribute, setValueSearchAttribute] = useState<string>('')
  const [attributeListFound, setAttributeListFound] = useState<any[]>([])
  const [attributeListUserSelected, setAttributeListUserSelected] = useState<
    any[]
  >([])

  const attributeSelectedRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(attributeSelectedRef, () => setShowAttributeList(false))

  const valueDebounce = useDebounce(valueSearchAttribute)

  useEffect(() => {
    setAttributeList(dataListAttribute)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const newAttributeListFound = attributeList.filter((attr) =>
      attr.name.toLocaleLowerCase().trim().includes(valueSearchAttribute)
    )

    setAttributeListFound(newAttributeListFound)
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueDebounce])

  const toggleAttr = (id: number) => {
    setActiveId(isActiveId === id ? undefined : id)
  }

  const dataListAttribute = [
    {id: 1, name: 'test 1'},
    {id: 2, name: 'test 2'},
    {id: 3, name: 'test 3'},
    {id: 4, name: 'test 4'},
    {id: 5, name: 'test 5'},
    {id: 6, name: 'test 6'},
    {id: 7, name: 'test 7'},
    {id: 8, name: 'test 8'},
    {id: 9, name: 'test 9'},
    {id: 10, name: 'test 10'},
    {id: 11, name: 'test 11'},
    {id: 12, name: 'test 12'},
    {id: 13, name: 'test 13'},
    {id: 14, name: 'test 14'},
    {id: 15, name: 'test 15'},
    {id: 16, name: 'test 16'},
    {id: 17, name: 'test 17'},
    {id: 18, name: 'test 18'},
    {id: 19, name: 'test 19'},
    {id: 20, name: 'test 20'},
  ]

  const handleSelectedAttribute = (attr: any) => {
    setAttributeListUserSelected((pre) => [...pre, attr])

    const newAttributeList = attributeList.filter((item) => item.id !== attr.id)
    setAttributeList(newAttributeList)
    setValueSearchAttribute('')
  }

  const handleChangeInput = (e: any) => {
    setValueSearchAttribute(e.target.value)
    setShowAttributeList(true)
    setLoading(true)
  }

  const renderListAttribute = () => {
    return attributeList.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>No Attributes Found</p>
    ) : (
      attributeList.map((attribute) => (
        <div
          onClick={() => handleSelectedAttribute(attribute)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={attribute.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{attribute.name}</p>
        </div>
      ))
    )
  }

  const renderListAttributeFound = () => {
    return attributeListFound.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>No Attributes Found</p>
    ) : (
      attributeListFound.map((attribute) => (
        <div
          onClick={() => handleSelectedAttribute(attribute)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={attribute.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{attribute.name}</p>
        </div>
      ))
    )
  }

  const handleRemoveAttributeSelected = (attr: any) => {
    const findId = attributeList.findIndex((item) => item.id > attr.id)

    findId === -1
      ? setAttributeList((pre) => [...pre, {...attr}])
      : attributeList.splice(findId, 0, attr)

    const newAttributeListUserSelected = attributeListUserSelected.filter(
      (item) => item.id !== attr.id
    )
    setAttributeListUserSelected(newAttributeListUserSelected)
  }

  const renderListAttributeUserSelected = () =>
    attributeListUserSelected.map((attr) => {
      const checkActive = isActiveId === attr.id
      return (
        <Fragment key={attr.id}>
          <div
            onClick={() => toggleAttr(attr.id)}
            className={`attributes__selected-item d-flex align-items-center cursor-pointer ${
              checkActive ? 'active' : ''
            }`}>
            <img
              src={closeIcon}
              alt='close'
              className='close-img'
              onClick={() => handleRemoveAttributeSelected(attr)}
            />
            <div className='separator'></div>
            <h3 className='m-0 fw-500 py-2'>{attr.name}</h3>
            <img src={arrowIcon} alt='arrow' className='arrow' />
          </div>
          {checkActive && (
            <div className='attributes__selected-detail d-flex flex-column'>
              <div className='top d-flex mt-3'>
                <input
                  type='checkbox'
                  id='check-visible-on-product'
                  hidden
                  checked={checkVisibleOnTheProduct}
                  onChange={() =>
                    setCheckVisibleOnTheProduct(!checkVisibleOnTheProduct)
                  }
                />
                <label
                  htmlFor='check-visible-on-product'
                  className=' cursor-pointer fw-medium'>
                  Visible on the product page
                </label>
                <label
                  htmlFor='check-visible-on-product'
                  className={`checkbox-custom ms-3 cursor-pointer ${
                    checkVisibleOnTheProduct ? 'bg-primary' : ''
                  }`}>
                  <div
                    className={`${
                      checkVisibleOnTheProduct ? 'active' : ''
                    }`}></div>
                </label>
              </div>
              <div className='bot d-flex mt-3 align-items-start'>
                <h3 className='m-0 fw-medium me-3 mb-3'>Value(s)</h3>

                <div className='select-custom-wrap d-flex align-items-center'>
                  <img
                    src={closeIcon}
                    alt='close'
                    className='close-img cursor-pointer'
                  />

                  <div className='separator'></div>

                  <div className='select h-100 ps-3'>
                    <input
                      type='text'
                      className='h-100 w-100'
                      id='select-child-attributes'
                    />
                  </div>

                  <label htmlFor='select-child-attributes'>
                    <img src={arrowIcon} alt='arrow' />
                  </label>
                </div>

                <span className='fw-medium ms-3 cursor-pointer'>Add new</span>
              </div>
            </div>
          )}
        </Fragment>
      )
    })

  return (
    <div className='attributes position-relative'>
      <div className='attributes__heading d-flex'>
        <h3 className='m-0 me-3 fw-medium'>Custom Product Attribute</h3>
        {/* search */}
        <div
          className='flex-grow-1 position-relative'
          onClick={() => setShowAttributeList(!showAttributeList)}
          ref={attributeSelectedRef}>
          <input
            type='text'
            id='custom-attributes'
            className='fw-medium px-3 w-100'
            value={valueSearchAttribute}
            onChange={handleChangeInput}
          />

          {showAttributeList && (
            <div className='attributes__list-selected py-2 mt-2 position-absolute w-100'>
              {valueSearchAttribute ? (
                loading ? (
                  <p className='m-0 ms-2 fw-medium py-2 text-center'>
                    Loading...
                  </p>
                ) : (
                  renderListAttributeFound()
                )
              ) : (
                renderListAttribute()
              )}
            </div>
          )}
        </div>

        <span className='m-0 ms-3 fw-medium cursor-pointer'>Add new</span>
      </div>
      <div className='attributes__bottom d-flex flex-column top-0'>
        <div> {renderListAttributeUserSelected()}</div>
      </div>
    </div>
  )
}
export default Attributes
