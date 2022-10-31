import axiosConfig from 'APIs/AxiosConfig'
import actionTypes from './type'

const getProductListRequest = () => ({
  type: actionTypes.GET_PRODUCT_LIST_REQUEST,
})

const getProductListFailure = (payload: string) => ({
  type: actionTypes.GET_PRODUCT_LIST_FAILURE,
  payload,
})

const getProductListSuccess = (payload: any) => ({
  type: actionTypes.GET_PRODUCT_LIST_SUCCESS,
  payload,
})

export const getProductList = (payload: any) => async (dispatch: any) => {
  dispatch(getProductListRequest())

  try {
    const endPoint = '/products-by-user'
    const res = await axiosConfig.post(endPoint, payload)
    const {data, code, message} = res.data

    code === 200
      ? dispatch(getProductListSuccess(data.productsList))
      : dispatch(getProductListFailure(message))
  } catch (error) {
    dispatch(getProductListFailure(error.message))
  }
}
