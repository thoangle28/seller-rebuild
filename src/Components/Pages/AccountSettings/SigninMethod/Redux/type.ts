const changePassword = {
  CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
}

const deleteMessage = {
  DELETE_MESSAGE: 'DELETE_MESSAGE',
}

const actionTypes = {
  ...changePassword,
  ...deleteMessage,
}

export default actionTypes
