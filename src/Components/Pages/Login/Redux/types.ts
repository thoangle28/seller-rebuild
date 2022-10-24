const apiCalling = {
    CALLING_API_SUCCESS: "CALLING_API_SUCCESS",
    CALLING_API_FAILURE: "CALLING_API_FAILURE",
    CALLING_API_REQUEST: "CALLING_API_REQUEST",
}
const loginActions = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGIN_REQUEST: "LOGIN_REQUEST"
}
const verifyToken = {
    VERIFY_TOKEN_SUCCESS: "VERIFY_TOKEN_SUCCESS",
    VERIFY_TOKEN_FAILURE: "VERIFY_TOKEN_FAILURE",
    VERIFY_TOKEN_REQUEST: "VERIFY_TOKEN_REQUEST",
}


// Example 
const actionTypes = {
    LOGOUT: "LOGOUT",
    ...apiCalling,
    ...loginActions,
    ...verifyToken, 
}

export default actionTypes 