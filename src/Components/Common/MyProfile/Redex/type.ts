const changeAvatar = {
  CHANGE_AVATAR_REQUEST: 'CHANGE_AVATAR_REQUEST',
  CHANGE_AVATAR_FAILURE: 'CHANGE_AVATAR_FAILURE',
  CHANGE_AVATAR_SUCCESS: 'CHANGE_AVATAR_SUCCESS',
}

const deleteMessage = {
  DELETE_MESSAGE: 'DELETE_MESSAGE',
}

const actionTypes = {
  ...changeAvatar,
  ...deleteMessage,
}

export default actionTypes
