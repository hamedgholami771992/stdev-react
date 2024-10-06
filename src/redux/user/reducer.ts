import { UserReduxT, UserReduxActionTypesT, UserReduxActionsT } from "./types"
import { STORAGE_KEYS } from '../../utils/contants'
import { sendLogoutRequset } from "../../utils/requests"

const initialState: UserReduxT = {
  accessToken: null,
  refreshToken: null,
  email: null,
  firstName: null,
  lastName: null,
  id: null,
  image: null,
  isActive: false
}

const userReducer = (state = initialState, action: UserReduxActionsT): UserReduxT => {
  switch (action.type) {
    //in use
    case UserReduxActionTypesT.saveAuthUser: {
      const newState: UserReduxT = {
        ...state,
        id: action.payload.user.id,
        firstName: action.payload.user.first_name,
        lastName: action.payload.user.last_name,
        email: action.payload.user.email,
        image: action.payload.user.image,
        accessToken: action.payload.token.access,
        refreshToken: action.payload.token.refresh,
      }
      //saving into the sessionStorage if rememberMe is false
      if (!action.rememberMe) {
        sessionStorage.setItem(STORAGE_KEYS.user, JSON.stringify(newState))
      }
      else {
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(newState))
      }
      return newState
    }


    case UserReduxActionTypesT.appendUserInfo: {
      // console.log('action.payload =====>',action.payload)
      const newState: UserReduxT = {
        ...state,
        firstName: action.payload.user.first_name,
        lastName: action.payload.user.last_name,
        email: action.payload.user.email,
        accessToken: action.payload.token.access,
        refreshToken: action.payload.token.refresh,
        image: action.payload.user.image,
        isActive: action.payload.user.is_active
      }
      //saving into the sessionStorage
      sessionStorage.setItem(STORAGE_KEYS.user, JSON.stringify(newState))
      return newState
    }


    case UserReduxActionTypesT.saveWholeStateFromStorage: {
      return { ...action.payload }
    }


    case UserReduxActionTypesT.updateTokens: {
      const newState: UserReduxT = {
        ...state,
        accessToken: action.payload.access,
        refreshToken: action.payload.refresh
      }
      //save into session storage
      sessionStorage.setItem(STORAGE_KEYS.user, JSON.stringify(newState))
      return newState
    }

    case UserReduxActionTypesT.removeAuthUser: {
      const newState = initialState
      sessionStorage.removeItem(STORAGE_KEYS.user)
      localStorage.removeItem(STORAGE_KEYS.user)
      //we also have to send a request to backend for loging the user out
      new Promise((resolve, reject) => {
        if(state.accessToken && state.refreshToken){
          sendLogoutRequset(state.accessToken, state.refreshToken)
        }
      }).catch(err => { })

      return newState
    }



    default:
      return state

  }
}
export default userReducer




