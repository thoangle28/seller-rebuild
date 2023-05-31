import useDebounce from 'app/Hooks/UseDebounce'
import {useState, useEffect, useRef, Fragment} from 'react'
import addIcon from './../../../../app/Images/icons/add.svg'
import closeIcon from './../../../../app/Images/icons/close-no-border.svg'
import arrowIcon from './../../../../app/Images/arrow-down.png'
import {useOnClickOutside} from 'app/Hooks/UseClickOutSide'
import closeCircleIcon from './../../../../app/Images/icons/close-circle.svg'
interface Props {
  productType: string
  listUseForVariations: any[]
  onChangeListUseForVariations: (id: number) => any
  setListUseForVariations: any
  childrenAttributeListSelected: any
  setChildrenAttributeListSelected: any
}

const Attributes = (props: Props) => {
  const {
    productType,
    listUseForVariations,
    onChangeListUseForVariations,
    setListUseForVariations,
    childrenAttributeListSelected,
    setChildrenAttributeListSelected,
  } = props

  const [loading, setLoading] = useState<boolean>(false)
  const [checkVisibleOnTheProduct, setCheckVisibleOnTheProduct] = useState<
    any[]
  >([])
  const [isActiveId, setActiveId] = useState<number>()
  const [showAttributeList, setShowAttributeList] = useState<boolean>(false)
  const [attributeList, setAttributeList] = useState<any[]>([])
  const [filterAttribute, setFilterAttribute] = useState<string>('')
  const [attributeListSearch, setAttributeListSearch] = useState<any[]>([])
  const [attributeListSelected, setAttributeListSelected] = useState<any[]>([])

  const [loadingChildren, setLoadingChildren] = useState<boolean>(false)
  const [showChildrenAttributeList, setShowChildrenAttributeList] =
    useState<boolean>(false)
  const [childrenAttributeList, setChildrenAttributeList] = useState<any[]>([])
  const [childrenAttributeListSearch, setChildrenAttributeListSearch] =
    useState<any[]>([])
  const [filterChildrenAttribute, setFilterChildrenAttribute] =
    useState<string>('')
  const attributeSelectedRef = useRef<HTMLDivElement>(null)
  const childrenAttributeRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useOnClickOutside(attributeSelectedRef, () => setShowAttributeList(false))
  useOnClickOutside(childrenAttributeRef, () =>
    setShowChildrenAttributeList(false)
  )

  const valueDebounce = useDebounce(filterAttribute, 800)
  const valueChildrenDebounce = useDebounce(filterChildrenAttribute, 800)

  useEffect(() => {
    setAttributeList(dataListAttribute)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const newAttributeListSearch = attributeList.filter((attr) =>
      attr.name.toLocaleLowerCase().trim().includes(filterAttribute)
    )
    setAttributeListSearch(newAttributeListSearch)

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueDebounce])

  useEffect(() => {
    const newChildrenAttributeListSearch = childrenAttributeList.filter(
      (attr) =>
        attr.name.toLocaleLowerCase().trim().includes(filterChildrenAttribute)
    )
    setChildrenAttributeListSearch(newChildrenAttributeListSearch)

    setLoadingChildren(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueChildrenDebounce])

  useEffect(() => {
    if (!isActiveId) {
      return
    }
    const attrActive = dataListAttribute.find((item) => item.id === isActiveId)
    const childrenAttrSelected = childrenAttributeListSelected.find(
      (item: any) => item.parentId === isActiveId
    )

    attrActive &&
      (childrenAttrSelected
        ? setChildrenAttributeList(() => {
            const idChildrenAttrSelected = childrenAttrSelected.attr.map(
              (item: any) => item.id
            )

            const newChildrenAttr = attrActive.options.filter(
              (item: any) => !idChildrenAttrSelected.includes(item.id)
            )

            return newChildrenAttr
          })
        : setChildrenAttributeList(attrActive.options))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveId])

  const toggleAttr = (id: number) => {
    setActiveId(isActiveId === id ? undefined : id)
    setFilterChildrenAttribute('')
  }

  const dataListAttribute = [
    {
      id: 1,
      name: 'test 1',
      options: [
        {id: 1, name: 'children attr 1'},
        {id: 2, name: 'children attr 2'},
      ],
    },
    {
      id: 2,
      name: 'test 2',
      options: [
        {id: 1, name: 'children attr 3'},
        {id: 2, name: 'children attr 4'},
      ],
    },
    {
      id: 3,
      name: 'test 3',
      options: [
        {id: 1, name: 'children attr 5'},
        {id: 2, name: 'children attr 6'},
      ],
    },
    {
      id: 4,
      name: 'test 4',
      options: [
        {id: 1, name: 'children attr 7'},
        {id: 2, name: 'children attr 8'},
      ],
    },
  ]

  const handleToggleCheckVisibleOnTheProduct = (id: number) => {
    setCheckVisibleOnTheProduct((pre) => {
      const isCheck = checkVisibleOnTheProduct.includes(id)
      if (isCheck) {
        return checkVisibleOnTheProduct.filter((item) => item !== id)
      } else {
        return [...pre, id]
      }
    })
  }

  const handleFilterAttr = (e: any) => {
    setFilterAttribute(e.target.value)
    setShowAttributeList(true)
    setLoading(true)
  }

  const handleFilterChildrenAttribute = (e: any) => {
    setFilterChildrenAttribute(e.target.value)
    setShowChildrenAttributeList(true)
    setLoadingChildren(true)
  }

  const handleSelectAttr = (attr: any) => {
    const newAttributeList = attributeList.filter((item) => item.id !== attr.id)

    setAttributeListSelected((pre) => [...pre, attr])
    setAttributeList(newAttributeList)
    setFilterAttribute('')
    setActiveId(undefined)
    setCheckVisibleOnTheProduct((pre) => [...pre, attr.id])
  }

  const handleSelectedChildrenAttribute = (attr: any) => {
    const newChildrenAttributeList = childrenAttributeList.filter(
      (item) => item.id !== attr.id
    )

    const newChildrenAttributeListSearch = childrenAttributeListSearch.filter(
      (item) => item.id !== attr.id
    )

    const findAttrActive = childrenAttributeListSelected.find(
      (item: any) => item.parentId === isActiveId
    )

    findAttrActive
      ? childrenAttributeListSelected
          .find((item: any) => item.parentId === isActiveId)
          .attr.push(attr)
      : setChildrenAttributeListSelected((pre: any) => {
          return [...pre, {parentId: isActiveId, attr: [attr]}]
        })

    setChildrenAttributeListSearch(newChildrenAttributeListSearch)
    setChildrenAttributeList(newChildrenAttributeList)
    setFilterChildrenAttribute('')
    inputRef.current?.focus()
  }

  const handleRemoveAttributeSelected = (attr: any) => {
    const findId = attributeList.findIndex((item) => item.id > attr.id)
    const findIndexAttrRemove = childrenAttributeListSelected.findIndex(
      (item: any) => item.parentId === attr.id
    )
    const newAttributeListUserSelected = attributeListSelected.filter(
      (item) => item.id !== attr.id
    )

    findIndexAttrRemove !== -1 &&
      childrenAttributeListSelected.splice(findIndexAttrRemove, 1)

    findId === -1
      ? setAttributeList((pre) => [...pre, {...attr}])
      : attributeList.splice(findId, 0, attr)

    setAttributeListSelected(newAttributeListUserSelected)
    setListUseForVariations(
      listUseForVariations.filter((item) => item !== attr.id)
    )
  }

  const handleRemoveChildrenAttributeSelected = (attr: any) => {
    const findChildrenAttr = childrenAttributeListSelected.find(
      (item: any) => item.parentId === isActiveId
    )

    const findIndex = childrenAttributeList.findIndex(
      (item) => item.id > attr.id
    )

    findIndex === -1
      ? setChildrenAttributeList((pre) => [...pre, attr])
      : childrenAttributeList.splice(findIndex, 0, attr)

    findIndex === -1
      ? setChildrenAttributeListSearch((pre) => [...pre, attr])
      : childrenAttributeListSearch.splice(findIndex, 0, attr)

    findChildrenAttr &&
      setChildrenAttributeListSelected(() => {
        const removeAttrActive = childrenAttributeListSelected.filter(
          (item: any) => item.parentId !== findChildrenAttr.parentId
        )
        const newChildrenListSelected = findChildrenAttr.attr.filter(
          (item: any) => item.id !== attr.id
        )

        removeAttrActive.push({
          parentId: findChildrenAttr.parentId,
          attr: newChildrenListSelected,
        })
        return removeAttrActive
      })

    inputRef.current?.focus()
  }

  const handleRemoveAllChildrenAttrSelected = () => {
    const findChildrenAttrRemove = childrenAttributeListSelected.find(
      (item: any) => item.parentId === isActiveId
    )
    const findAttrActive = dataListAttribute.find(
      (item) => item.id === isActiveId
    )

    findChildrenAttrRemove &&
      setChildrenAttributeListSelected(() => {
        return childrenAttributeListSelected.filter(
          (item: any) => item.parentId !== findChildrenAttrRemove.parentId
        )
      })

    findAttrActive && setChildrenAttributeList(findAttrActive.options)
    setFilterChildrenAttribute('')
  }

  const renderAttrList = () => {
    return attributeList.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>No Attributes Found</p>
    ) : (
      attributeList.map((attribute) => (
        <div
          onClick={() => handleSelectAttr(attribute)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={attribute.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{attribute.name}</p>
        </div>
      ))
    )
  }

  const renderAttrListSearch = () => {
    return attributeListSearch.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>No Attributes Found</p>
    ) : (
      attributeListSearch.map((attribute) => (
        <div
          onClick={() => handleSelectAttr(attribute)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={attribute.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{attribute.name}</p>
        </div>
      ))
    )
  }

  const renderAttrListSelected = () => {
    return attributeListSelected.map((attr) => {
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
          {checkActive && renderAttrActive(attr)}
        </Fragment>
      )
    })
  }

  const renderAttrActive = (attr: any) => {
    const childrenAttrActive = childrenAttributeListSelected.find(
      (item: any) => item.parentId === isActiveId
    )
    return (
      <div className='attributes__selected-detail d-flex flex-column'>
        <div className='top mt-3'>
          <div className='d-flex'>
            <input
              type='checkbox'
              id='check-visible-on-product'
              checked={checkVisibleOnTheProduct.includes(attr.id)}
              onChange={() => handleToggleCheckVisibleOnTheProduct(attr.id)}
              hidden
            />
            <label
              htmlFor='check-visible-on-product'
              className=' cursor-pointer fw-medium'>
              Visible on the product page
            </label>
            <label
              htmlFor='check-visible-on-product'
              className={`checkbox-custom ms-3 cursor-pointer ${
                checkVisibleOnTheProduct.includes(attr.id) ? 'bg-primary' : ''
              }`}>
              <div
                className={`${
                  checkVisibleOnTheProduct.includes(attr.id) ? 'active' : ''
                }`}></div>
            </label>
          </div>
          {productType && (
            <div className='d-flex mt-4'>
              <input
                type='checkbox'
                id='use-for-variations'
                checked={listUseForVariations.includes(attr.id)}
                onChange={() => onChangeListUseForVariations(attr.id)}
                hidden
              />
              <label
                htmlFor='use-for-variations'
                className=' cursor-pointer fw-medium'>
                Used for variations
              </label>
              <label
                htmlFor='use-for-variations'
                className={`checkbox-custom ms-3 cursor-pointer ${
                  listUseForVariations.includes(attr.id) ? 'bg-primary' : ''
                }`}>
                <div
                  className={`${
                    listUseForVariations.includes(attr.id) ? 'active' : ''
                  }`}></div>
              </label>
            </div>
          )}
        </div>
        <div className='bot d-flex align-items-start my-3'>
          <h3 className='m-0 fw-medium me-3'>Value(s)</h3>

          <div className='select-custom-wrap d-flex align-items-center'>
            <img
              src={closeIcon}
              alt='close'
              className='close-img cursor-pointer'
              onClick={handleRemoveAllChildrenAttrSelected}
            />

            <div className='separator'></div>

            <div
              ref={childrenAttributeRef}
              className='d-flex flex-grow-1 align-items-center'>
              <div className='select d-flex align-items-center flex-wrap ps-3'>
                <div
                  className={`d-flex flex-wrap w-100 selected__list  ${
                    childrenAttrActive?.attr.length > 0 ? 'has-item' : 'm-0'
                  }`}>
                  {renderChildrenAttrListSelected()}
                  <input
                    type='text'
                    className={`flex-grow-1 ${
                      childrenAttrActive?.attr.length > 0 ? '' : 'no-item'
                    } `}
                    autoComplete='off'
                    value={filterChildrenAttribute}
                    onChange={handleFilterChildrenAttribute}
                    ref={inputRef}
                    hidden={childrenAttributeList?.length <= 0}
                    onClick={() => {
                      setShowChildrenAttributeList(!showChildrenAttributeList)
                    }}
                  />
                </div>
              </div>

              {showChildrenAttributeList && (
                <div className='select__children-list py-2'>
                  {filterChildrenAttribute ? (
                    loadingChildren ? (
                      <p className='m-0 ms-2 fw-medium py-2 text-center'>
                        Loading data. Please wait...
                      </p>
                    ) : (
                      renderChildrenAttrListSearch()
                    )
                  ) : (
                    renderChildrenAttrList()
                  )}
                </div>
              )}

              <div
                onClick={() =>
                  setShowChildrenAttributeList(!showChildrenAttributeList)
                }
                className='arr-img h-100 d-flex align-items-center'>
                <img src={arrowIcon} alt='arrow' />
              </div>
            </div>
          </div>

          <span className='fw-medium ms-3 cursor-pointer'>Add new</span>
        </div>
      </div>
    )
  }

  const renderChildrenAttrList = () => {
    return childrenAttributeList.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>No Attributes Found</p>
    ) : (
      childrenAttributeList.map((attribute) => (
        <div
          onClick={() => handleSelectedChildrenAttribute(attribute)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={attribute.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{attribute.name}</p>
        </div>
      ))
    )
  }

  const renderChildrenAttrListSearch = () => {
    return childrenAttributeListSearch.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>No Attributes Found</p>
    ) : (
      childrenAttributeListSearch.map((attribute) => (
        <div
          onClick={() => handleSelectedChildrenAttribute(attribute)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={attribute.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{attribute.name}</p>
        </div>
      ))
    )
  }

  const renderChildrenAttrListSelected = () => {
    const childrenAttributeListSelectedActive =
      childrenAttributeListSelected.find(
        (item: any) => item.parentId === isActiveId
      )

    return childrenAttributeListSelectedActive?.attr.map((attr: any) => (
      <div className='item__selected d-flex align-items-center' key={attr.id}>
        <p className='fw-medium text-black m-0'>{attr.name}</p>
        <img
          src={closeCircleIcon}
          alt='close'
          className='cursor-pointer'
          onClick={() => handleRemoveChildrenAttributeSelected(attr)}
        />
      </div>
    ))
  }

  return (
    <div className='attributes position-relative'>
      <div className='attributes__heading d-flex'>
        <h3 className='m-0 me-3 fw-medium'>Custom Product Attribute</h3>
        <div
          className='flex-grow-1 position-relative'
          onClick={() => setShowAttributeList(!showAttributeList)}
          ref={attributeSelectedRef}>
          <input
            type='text'
            id='custom-attributes'
            className='fw-medium px-3 w-100'
            autoComplete='off'
            value={filterAttribute}
            onChange={handleFilterAttr}
          />

          {showAttributeList && (
            <div className='attributes__list-select py-2 mt-2 position-absolute w-100 bg-white'>
              {filterAttribute ? (
                loading ? (
                  <p className='m-0 ms-2 fw-medium py-2 text-center'>
                    Loading data. Please wait...
                  </p>
                ) : (
                  renderAttrListSearch()
                )
              ) : (
                renderAttrList()
              )}
            </div>
          )}
        </div>

        <span className='m-0 ms-3 fw-medium cursor-pointer'>Add new</span>
      </div>
      <div className='attributes__bottom d-flex flex-column top-0'>
        <div>{renderAttrListSelected()}</div>
      </div>
    </div>
  )
}
export default Attributes
