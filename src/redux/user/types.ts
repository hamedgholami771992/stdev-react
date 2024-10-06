
import {LoginResponseT} from '../../utils/requests'

//type of action types
export enum UserReduxActionTypesT {
    saveAuthUser = 'SAVE_USER',
    appendUserInfo = 'APPEND_USER_INFO',
    removeAuthUser = 'REMOVE_AUTH_USER',
    saveWholeStateFromStorage = 'SAVE_WHOLE_USER_FROM_STORAGE',
    saveWholeStateFromLocalStorage = 'SAVE_WHOLE_USER_FROM_LOCAL_STORAGE',
    updateTokens = 'UPDATE_TOKENS',
    updateUserInfo = 'UPDATE_USER_INFO'
}

//type of each individual actions
type Action_Save_Auth_User_T = {
    type: UserReduxActionTypesT.saveAuthUser,
    payload: LoginResponseT,
    rememberMe: boolean
}

type Action_Append_User_Info_T = {
    type: UserReduxActionTypesT.appendUserInfo,
    payload: LoginResponseT
}

type Action_Save_whole_User_FROM_STORAGE_T = {
    type: UserReduxActionTypesT.saveWholeStateFromStorage,
    payload: UserReduxT
}

type Action_Update_tokens_T = {
    type: UserReduxActionTypesT.updateTokens,
    payload: {
        access: string
        refresh: string
    }
}

type Action_Remove_Auth_User_T = {
    type: UserReduxActionTypesT.removeAuthUser
}

type Action_Update_User_Info_T = {
    type: UserReduxActionTypesT.updateUserInfo,
    payload: {
        firstName?: string
        lastName?: string
        email?: string
    }
}

//type of all actions
export type UserReduxActionsT = Action_Save_Auth_User_T | Action_Append_User_Info_T | Action_Save_whole_User_FROM_STORAGE_T |
    Action_Update_tokens_T | Action_Remove_Auth_User_T | Action_Update_User_Info_T


//type of redux state
export type UserReduxT = {
    id: null | number
    accessToken: null | string
    refreshToken: null | string
    email: null | string
    firstName: null | string
    lastName: null | string
    image: null | string
    isActive: null | boolean
}
