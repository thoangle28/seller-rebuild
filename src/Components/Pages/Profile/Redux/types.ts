const getInfoUser = {
  GET_INFO_USER_REQUEST: 'GET_INFO_USER_REQUEST',
  GET_INFO_USER_FAILURE: 'GET_INFO_USER_FAILURE',
  GET_INFO_USER_SUCCESS: 'GET_INFO_USER_SUCCESS',
}

const editInfoUser = {
  EDIT_INFO_USER_REQUEST: 'EDIT_INFO_USER_REQUEST',
  EDIT_INFO_USER_FAILURE: 'EDIT_INFO_USER_FAILURE',
  EDIT_INFO_USER_SUCCESS: 'EDIT_INFO_USER_SUCCESS',
}

const deleteMessage = {
  DELETE_MESSAGE: 'DELETE_MESSAGE',
}

const actionTypes = {
  ...getInfoUser,
  ...editInfoUser,
  ...deleteMessage,
}

export default actionTypes
