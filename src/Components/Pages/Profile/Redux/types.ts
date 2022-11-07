const getInfoUser = {
  GET_INFO_USER_REQUEST: 'GET_INFO_USER_REQUEST',
  GET_INFO_USER_FAILURE: 'GET_INFO_USER_FAILURE',
  GET_INFO_USER_SUCCESS: 'GET_INFO_USER_SUCCESS',
}

const deleteMessage = {
  DELETE_MESSAGE: 'DELETE_MESSAGE',
}

const actionTypes = {
  ...getInfoUser,
  ...deleteMessage,
}

export default actionTypes
