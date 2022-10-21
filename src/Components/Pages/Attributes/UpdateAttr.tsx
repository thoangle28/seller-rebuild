import { useFormik } from 'formik'
import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/Hooks/hooks'
import { changeUpdateMode, updateAttribute, updateChildAttr } from './Redux/actions'
import { iUpdateAttr, iUpdateChildAttribute } from 'app/Models'
interface updateForm {
    isChildUpdate: boolean,
    oldAttribute: string,
    getAllDataPayload: any,
    idTerm: number,
}

const UpdateAttr: FC<updateForm> = (props: updateForm) => {
    const { isChildUpdate, oldAttribute, getAllDataPayload, idTerm } = props
    const [parentId, setparentId] = useState(0)
    const dispatch = useAppDispatch();
    const updateAttrForm = {
        new_attribute_name: '',
    }

    const { attributeList } = useAppSelector(state => state.attributesReducer)

    const updateChildAttrForm = {
        id_term: '',
        parent_id: '',
        new_attribute_term_name: '',
    }

    const updateAttr = useFormik({
        initialValues: updateAttrForm,
        onSubmit: values => {
            const updateAttrPayload: iUpdateAttr = {
                old_attribute_name: oldAttribute,
                new_attribute_name: values.new_attribute_name,
                access_token: getAllDataPayload.access_token,
            }
            dispatch(updateAttribute(updateAttrPayload, updateAttr.resetForm(), getAllDataPayload))
        },
    });

    const renderUpdateAttrForm = () => {
        return <div className='attributes__create'>
            <div className='attributes__title text-uppercase pb-3'>
                UPDATE ATTRIBUTE
            </div>

            <div className='attributes__content p-4'>
                <div className='attributes__content-top pb-3'>
                    <div className='attributes__content-title text-capitalize pb-2'>
                        Update Parent Attribute
                    </div>

                </div>

                <div className='attributes__content-bot'>
                    <div className='attributes__content-title text-capitalize pb-2'>
                        New Attribute Name
                    </div>
                    <form onSubmit={updateAttr.handleSubmit}>
                        <input type="text" name="new_attribute_name" onChange={updateAttr.handleChange} id="" />
                        <div className='mt-3'>
                            <button className='btn btn-primary'>Update</button>
                            <button onClick={() => dispatch(changeUpdateMode(false))} className='btn btn-danger'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }

    const updateChildAttribute = useFormik({
        initialValues: updateChildAttrForm,
        onSubmit: values => {
            const updateAttrPayload: iUpdateChildAttribute = {
                parent_id: values.parent_id,
                id_term: idTerm,
                new_attribute_term_name: values.new_attribute_term_name,
                access_token: getAllDataPayload.access_token,
            }
            dispatch(updateChildAttr(updateAttrPayload, updateChildAttribute.resetForm(), getAllDataPayload))
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
        return <div className='attributes__create'>
            <div className='attributes__title text-uppercase pb-3'>
                UPDATE CHILD ATTRIBUTE
            </div>

            <div className='attributes__content p-4'>
                <div className='attributes__content-bot'>
                    <div className='attributes__content-title text-capitalize pb-2'>
                        Update Child Attribute
                    </div>
                    <form onSubmit={updateChildAttribute.handleSubmit}>
                        <select name="parent_id" onChange={updateChildAttribute.handleChange}>
                            {renderListOptions}
                        </select>
                        <input type="text" name="new_attribute_term_name" onChange={updateChildAttribute.handleChange} id="" />
                        <div className='mt-3'>
                            <button className='btn btn-primary'>Update</button>
                            <button onClick={() => dispatch(changeUpdateMode(false))} className='btn btn-danger'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }

    return <>
        {isChildUpdate ? renderUpdateChildAttrForm() : renderUpdateAttrForm()}
    </>

}

export default UpdateAttr