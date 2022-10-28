import {useFormik} from 'formik'
import {FC} from 'react'
import {useAppDispatch, useAppSelector} from 'app/Hooks/hooks'
import {
  changeUpdateMode,
  updateAttribute,
  updateChildAttr,
} from './Redux/actions'
import {iUpdateAttr, iUpdateChildAttribute} from 'app/Models'
import createNewAttributeSchema from './Schema'
import {editChildrenAttr} from './Schema'
import iconError from './../../../app/Images/icons/icon-error.svg'
import Loading from 'Components/Common/Loading'
interface updateForm {
  isChildUpdate: boolean
  oldAttribute: string
  getAllDataPayload: any
  idTerm: number
  parentId?: string | number
  childLabel?: string
}

const UpdateAttr: FC<updateForm> = (props: updateForm) => {
  const {
    isChildUpdate,
    oldAttribute,
    getAllDataPayload,
    parentId,
    childLabel,
    idTerm,
  } = props

  const dispatch = useAppDispatch()

  const {isFailure, message, isLoading} = useAppSelector(
    (state) => state.attributesReducer
  )

  const updateAttrForm = {
    newAttribute: oldAttribute,
  }

  const {attributeList} = useAppSelector((state) => state.attributesReducer)

  const updateChildAttrForm = {
    id_term: idTerm,
    parent_id: parentId,
    new_attribute_term_name: childLabel,
  }

  const handleChangeInput = (e: any) => {
    updateAttr.handleChange(e)
    updateAttr.setSubmitting(false)
    updateAttr.setFieldTouched('newAttribute', false, false)
  }

  const updateAttr = useFormik({
    initialValues: updateAttrForm,
    validationSchema: createNewAttributeSchema,
    onSubmit: (values) => {
      const updateAttrPayload: iUpdateAttr = {
        old_attribute_name: oldAttribute,
        new_attribute_name: values.newAttribute,
        access_token: getAllDataPayload.access_token,
      }
      dispatch(updateAttribute(updateAttrPayload, getAllDataPayload))
    },
  })

  const renderUpdateAttrForm = () => {
    return (
      <div className='attributes__create'>
        <div className='attributes__title text-uppercase pb-3'>
          UPDATE ATTRIBUTE
        </div>

        <div className='attributes__content p-4'>
          {isLoading ? (
            <Loading />
          ) : (
            <div className='attributes__content-bot'>
              <form onSubmit={updateAttr.handleSubmit}>
                {isFailure && message && (
                  <div
                    className='mess-box d-flex flex-column py-2 align-items-center mb-3'
                    style={{backgroundColor: 'rgba(197, 34, 31, 0.2)'}}>
                    <img src={iconError} alt='icon error' />
                    <h3 className='m-0 mt-2 text-danger'>{message}</h3>
                  </div>
                )}

                <label
                  htmlFor='editAttribute'
                  className='attributes__content-title text-capitalize pb-2 cursor-pointer'>
                  New Attribute Name
                </label>
                <input
                  type='text'
                  className={
                    updateAttr.errors.newAttribute &&
                    updateAttr.touched.newAttribute
                      ? 'attributes__content-input attributes__content-input--error w-100'
                      : 'attributes__content-input w-100'
                  }
                  name='newAttribute'
                  value={updateAttr.values.newAttribute}
                  onChange={handleChangeInput}
                  onBlur={updateAttr.handleBlur}
                  id='editAttribute'
                />

                {updateAttr.errors.newAttribute &&
                  updateAttr.touched.newAttribute && (
                    <p className='attributes__content-text-error m-0 pt-2'>
                      {updateAttr.errors.newAttribute}
                    </p>
                  )}

                <div className='mt-3'>
                  <button
                    className='btn btn-primary'
                    disabled={updateAttr.isSubmitting}>
                    Update
                  </button>
                  <button
                    onClick={() => dispatch(changeUpdateMode(false))}
                    className='btn btn-danger ms-3'>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    )
  }

  const updateChildAttribute = useFormik({
    initialValues: updateChildAttrForm,
    validationSchema: editChildrenAttr,
    onSubmit: (values) => {
      const updateAttrPayload: iUpdateChildAttribute = {
        parent_id: values.parent_id as number,
        id_term: idTerm,
        new_attribute_term_name: values.new_attribute_term_name as string,
        access_token: getAllDataPayload.access_token,
      }
      dispatch(updateChildAttr(updateAttrPayload, getAllDataPayload))
    },
  })

  const renderListOptions = attributeList.map((item: any) => {
    return (
      <option value={item.id} key={item.id}>
        {item.label}
      </option>
    )
  })

  const renderUpdateChildAttrForm = () => {
    return (
      <div className='attributes__create'>
        <div className='attributes__title text-uppercase pb-3'>
          UPDATE CHILD ATTRIBUTE
        </div>

        <div className='attributes__content p-4'>
          {isLoading ? (
            <Loading />
          ) : (
            <div className='attributes__content-bot'>
              {isFailure && message && (
                <div
                  className='mess-box d-flex flex-column py-2 align-items-center mb-3'
                  style={{backgroundColor: 'rgba(197, 34, 31, 0.2)'}}>
                  <img src={iconError} alt='icon error' />
                  <h3 className='m-0 mt-2 text-danger'>{message}</h3>
                </div>
              )}

              <form onSubmit={updateChildAttribute.handleSubmit}>
                <div className='mb-3'>
                  <div className='attributes__content-title text-capitalize pb-2'>
                    Parent Attribute
                  </div>

                  <select
                    className='w-100 attributes__content-select'
                    name='parent_id'
                    value={updateChildAttribute.values.parent_id || ''}
                    onChange={updateChildAttribute.handleChange}>
                    <option value=''>None</option>
                    {renderListOptions}
                  </select>
                </div>

                <label
                  htmlFor='editAttribute'
                  className='attributes__content-title text-capitalize pb-2 cursor-pointer'>
                  Children Attribute Name
                </label>
                <input
                  type='text'
                  className={
                    updateAttr.errors.newAttribute &&
                    updateAttr.touched.newAttribute
                      ? 'attributes__content-input attributes__content-input--error w-100'
                      : 'attributes__content-input w-100'
                  }
                  name='new_attribute_term_name'
                  value={updateChildAttribute.values.new_attribute_term_name}
                  onChange={updateChildAttribute.handleChange}
                  onBlur={updateChildAttribute.handleBlur}
                  id='editAttribute'
                />

                <div className='mt-3'>
                  <button
                    className='btn btn-primary'
                    disabled={updateAttr.isSubmitting}>
                    Update
                  </button>
                  <button
                    onClick={() => dispatch(changeUpdateMode(false))}
                    className='btn btn-danger ms-3'>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>{isChildUpdate ? renderUpdateChildAttrForm() : renderUpdateAttrForm()}</>
  )
}

export default UpdateAttr
