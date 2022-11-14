import {useState, useRef, useEffect} from 'react'
import closeIcon from './../../../../app/Images/icons/close-no-border.svg'
import arrowIcon from './../../../../app/Images/arrow-down.png'
import addIcon from './../../../../app/Images/icons/add.svg'
import closeCircleIcon from './../../../../app/Images/icons/close-circle.svg'
import useDebounce from 'app/Hooks/UseDebounce'
import {useOnClickOutside} from 'app/Hooks/UseClickOutSide'

const dataCategories = [
  {
    id: 1,
    name: 'Categories 1',
  },
  {
    id: 2,
    name: 'Categories 2',
  },
  {
    id: 3,
    name: 'Categories 3',
  },
  {
    id: 4,
    name: 'Categories 4',
  },
  {
    id: 5,
    name: 'Categories 5',
  },
  {
    id: 6,
    name: 'Categories 6',
  },
  {
    id: 7,
    name: 'Categories 7',
  },
]

const Categories = () => {
  const [showCategories, setShowCategories] = useState<boolean>(false)
  const [categoriesList, setCategoriesList] = useState<any[]>([])
  const [categoriesListSearch, setCategoriesListSearch] = useState<any[]>([])
  const [categoriesListSelected, setCategoriesListSelected] = useState<any[]>(
    []
  )
  const [filterCategories, setFilterCategories] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const categoriesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useOnClickOutside(categoriesRef, () => setShowCategories(false))

  const valueDebounce = useDebounce(filterCategories, 800)

  useEffect(() => {
    setCategoriesList(dataCategories)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const newCategoriesListSearch = categoriesList.filter((categories) =>
      categories.name.toLocaleLowerCase().trim().includes(filterCategories)
    )
    setCategoriesListSearch(newCategoriesListSearch)
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueDebounce])

  const handleFilterCategories = (e: any) => {
    setFilterCategories(e.target.value)
    setShowCategories(true)
    setLoading(true)
  }

  const handleRemoveCategoriesSelected = (categories: any) => {
    const findId = categoriesList.findIndex((item) => item.id > categories.id)

    findId === -1
      ? setCategoriesList((pre) => [...pre, {...categories}])
      : categoriesList.splice(findId, 0, categories)

    const newCategoriesListUserSelected = categoriesListSelected.filter(
      (item) => item.id !== categories.id
    )
    setCategoriesListSelected(newCategoriesListUserSelected)
  }

  const handleRemoveAllCategoriesSelected = () => {
    setFilterCategories('')
    setCategoriesListSelected([])
    setCategoriesList(dataCategories)
  }

  const handleSelectedCategories = (categories: any) => {
    const newCategoriesList = categoriesList.filter(
      (item) => item.id !== categories.id
    )
    const newCategoriesListSearch = categoriesListSearch.filter(
      (item) => item.id !== categories.id
    )
    setCategoriesListSelected((pre) => [...pre, categories])
    setCategoriesListSearch(newCategoriesListSearch)
    setCategoriesList(newCategoriesList)
    inputRef.current?.focus()
  }

  const renderCategoriesList = () => {
    return categoriesList.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>No Categories Found</p>
    ) : (
      categoriesList.map((categories) => (
        <div
          onClick={() => handleSelectedCategories(categories)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={categories.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{categories.name}</p>
        </div>
      ))
    )
  }

  const renderCategoriesListSearch = () => {
    return categoriesListSearch.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>No Categories Found</p>
    ) : (
      categoriesListSearch.map((categories) => (
        <div
          onClick={() => handleSelectedCategories(categories)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={categories.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{categories.name}</p>
        </div>
      ))
    )
  }

  const renderCategoriesListSelected = () => {
    return categoriesListSelected.map((categories) => (
      <div
        className='item__selected d-flex align-items-center'
        key={categories.id}>
        <p className='fw-medium text-black m-0'>{categories.name}</p>
        <img
          src={closeCircleIcon}
          alt='close'
          className='cursor-pointer'
          onClick={() => handleRemoveCategoriesSelected(categories)}
        />
      </div>
    ))
  }

  return (
    <div className='categories d-flex'>
      <h3 className='m-0 fw-medium me-4 fw-normal'>Categories</h3>

      <div className='select-custom-wrap d-flex align-items-center'>
        <img
          src={closeIcon}
          alt='close'
          className='close-img cursor-pointer'
          onClick={handleRemoveAllCategoriesSelected}
        />

        <div className='separator'></div>

        <div
          ref={categoriesRef}
          className='d-flex flex-grow-1 align-items-center'>
          <div className='select d-flex align-items-center flex-wrap ps-3'>
            <div
              className={`d-flex flex-wrap w-100 selected__list ${
                categoriesListSelected.length > 0 ? '' : 'm-0'
              }`}>
              {renderCategoriesListSelected()}
              <input
                type='text'
                className={`flex-grow-1 ${
                  categoriesListSelected.length > 0 ? '' : 'no-item'
                } `}
                autoComplete='off'
                value={filterCategories}
                onChange={handleFilterCategories}
                ref={inputRef}
                hidden={categoriesList.length <= 0}
                onClick={() => {
                  setShowCategories(!showCategories)
                }}
              />
            </div>
          </div>

          {showCategories && (
            <div className='select__children-list py-2'>
              {filterCategories ? (
                loading ? (
                  <p className='m-0 ms-2 fw-medium py-2 text-center'>
                    Loading data. Please wait...
                  </p>
                ) : (
                  renderCategoriesListSearch()
                )
              ) : (
                renderCategoriesList()
              )}
            </div>
          )}

          <div
            onClick={() => setShowCategories(!showCategories)}
            className='arr-img h-100 d-flex align-items-center'>
            <img src={arrowIcon} alt='arrow' />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Categories
