const apiCalling = {
    CALLING_API_SUCCESS: "CALLING_API_SUCCESS",
    CALLING_API_FAILURE: "CALLING_API_FAILURE",
    CALLING_API_REQUEST: "CALLING_API_REQUEST",
}
// Example 
const actionTypes = {
    ADD: "ADD",
    ...apiCalling
}

export default actionTypes 