

//---------------------------------------------------------------------------------------------
//ex => makeSureOfExistanceOfEntireStateInStorageANDRedux(userReducer, REDUX_ACTIONS.addToMainCart, STORAGE_KEYS.user, dispatch)
//a function that grab data from localStorage|sessionStorage and saves into redux
export const makeSureOfExistanceOfEntireStateInStorageANDRedux = (reduxState, reduxActionType, storageKey, dispatch) => {
    //you have to put it in the componentDidMount to prevent infinit number of updation
    //reduxActionType must be action for replacing the entire reduxState
    //first we have to get the storage_state from the session-storage|local-storage
    let session_state_in_json_form, session_state
    let local_state_in_json_form, local_state
    session_state_in_json_form = sessionStorage.getItem(storageKey)
    local_state_in_json_form = localStorage.getItem(storageKey)
    if (session_state_in_json_form) {
        session_state = JSON.parse(session_state_in_json_form)
       
    }
    if(local_state_in_json_form) {
        local_state = JSON.parse(local_state_in_json_form)
        
    }

    if (session_state) {
        //if storage_state exists we have to copy it to the redux store again
        //because it has higher priority in compare to the redux
        return dispatch({ type: reduxActionType, payload: session_state })
    }
    if(local_state){
        return dispatch({ type: reduxActionType, payload: local_state })
    }
}
