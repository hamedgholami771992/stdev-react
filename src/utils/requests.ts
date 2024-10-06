import axios, { AxiosRequestHeaders } from "axios";
import CONFIG from '../config.json'
import { UserReduxActionsT, UserReduxActionTypesT } from '../redux/index'

import { PATHES } from './constants'








type ArgBX32 = {
  dispatch: (a: UserReduxActionsT) => void
  navigate: (a: NavigateArg1T, b?: NavigateArg2T) => void,
}

const signout_and_redirect_to_login = ({ dispatch, navigate }: ArgBX32) => {
  dispatch({ type: UserReduxActionTypesT.removeAuthUser })
  navigate({ pathname: PATHES.login }, { replace: true })
}

//------------------------------------------------------------------------------------------
type ToastObjT = {
  error: (a: string) => void
}
type NavigateArg1T = {
  pathname: string
}
type NavigateArg2T = {
  replace?: boolean,
  state?: object
}

type AxiosOptionsT = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  headers?: AxiosRequestHeaders
  data?: any
}
type SendGenralReqT = {
  axiosOptions: AxiosOptionsT
  toast: ToastObjT,
  dispatch: (a: UserReduxActionsT) => void
  navigate: (a: NavigateArg1T, b?: NavigateArg2T) => void,
  refresh_token: string
}

type FetchOptions = {
  method: "POST" | 'PUT' | 'DELETE' | 'GET' | 'PATCH'
  url: string
  headers: { [key: string]: any },
  data?: string | any
}
//this function wraps all the requests sent to the server and checks whether the response tells that, the token is invalid
//if it does, it sends a request to refresh the token, and after recieving the updated token
//sends another request to that path, to get the response from the server
export const send_general_req = async ({ axiosOptions, toast, dispatch, navigate, refresh_token }: SendGenralReqT, has_refreshed_token_before?: boolean) => {
  let refreshed_token_before = has_refreshed_token_before ? has_refreshed_token_before : false
  const axios_options_for_refreshing_the_token: AxiosOptionsT = {
    method: 'POST',
    url: `${CONFIG.BASE_URL}/api/user/refresh/`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      refresh: refresh_token
    }
  }
  //first we have to stop sending another req for refreshing token for second-time, and we have to sign-out the user  
  if (axiosOptions.url === axios_options_for_refreshing_the_token.url && axiosOptions.method === axios_options_for_refreshing_the_token.method && refreshed_token_before) {
    return signout_and_redirect_to_login({ dispatch, navigate })
  }
  //first we have to send the req
  let response
  try {
    response = await axios(axiosOptions)
    //in the case of a req for refreshing the token 
    if (axiosOptions.url === axios_options_for_refreshing_the_token.url && axiosOptions.method === axios_options_for_refreshing_the_token.method) {
      //in the case of any error while refreshing the tokens, we have to throw an error to handle this condition in the catch block
      if (response.status !== 200) {
        const error: any = new Error('')
        error.response = response
        throw error
      }
      //in the case of successful response while refreshing the token, we have to save those tokens into redux and session-storage
      dispatch({ type: UserReduxActionTypesT.updateTokens, payload: response.data })
    }
    //in the case of a req for other pathes
    else {
      //in the case of any error we have to throw an error to handle this condition in the catch block
      if (response.status !== 200 && response.status !== 201) {
        const error: any = new Error('')
        error.response = response
        throw error
      }
    }
    //returning whole response body to make it accessible for handling other things
    return response
  }
  catch (err) {
    //in the case of any error in a req for refreshing the token 
    if (axiosOptions.url === axios_options_for_refreshing_the_token.url && axiosOptions.method === axios_options_for_refreshing_the_token.method) {
      //in the case of any error while refreshing the tokens, we have to sign-out the user and redirect to login
      signout_and_redirect_to_login({ dispatch, navigate })
    }
    //in the case of any error in a req for other pathes
    else {
      //in the case of 401 res
      if (err.response.status === 401) {
        try {
          const refreshing_res = await send_general_req({ axiosOptions: axios_options_for_refreshing_the_token, toast, dispatch, navigate, refresh_token }, refreshed_token_before)
          //if we get a successful res for refreshing the token
          if (refreshing_res && refreshing_res.status === 200) {
            refreshed_token_before = true
            const new_access_token = refreshing_res.data.access
            const new_refresh_token = refreshing_res.data.refresh
            const new_axios_options: AxiosOptionsT = {
              ...axiosOptions,
              headers: {
                ...axiosOptions.headers,
                Authorization: `JWT ${new_access_token}`
              }
            }
            let last_try_response
            try {
              last_try_response = send_general_req({ axiosOptions: new_axios_options, dispatch, navigate, refresh_token: new_refresh_token, toast }, refreshed_token_before)

              if (last_try_response.status !== 200 || last_try_response.status !== 201) {
                throw new Error('an error occures while trying for second time')
              }
              //if we get a 200 res for last try, we have to return last_try_response 
              return last_try_response
            }
            catch (err) {
              //if any error occures while last_try_response, we have to return it
              return last_try_response
            }
          }
          //in the case of any error for refreshing the token
          else {
            throw new Error('an error occures while refreshing the token')
          }
        }
        catch (err) {
          //if any error occures while refreshing the tokens, we have to return the first response 
          return response
        }
      }

      //in the case of other kinds of errory req, we have to show the error to the user
      else {
        toast.error(err.response.data.message)
      }
      return err.response
    }
  }
}

//----------------------------------------------------------------------
//type which is needed for passing tools of send_general_req
type GeneralReqArg = {
  toast: ToastObjT,
  dispatch: (a: UserReduxActionsT) => void
  navigate: (a: NavigateArg1T, b?: NavigateArg2T) => void,
  refresh_token: string
}

//-------------------------------------------------------------------
export type SendRegisterReqT = FormData
export enum SendRegisterFormDataFields {
  first_name = "first_name",
  last_name = "last_name",
  email = "email",
  password = "password",
  image = "image"
}
export type RegisterUserResponseT = {
  message: string
}
export const sendRegisterRequest = async (data: SendRegisterReqT, { dispatch, navigate, refresh_token, toast }: GeneralReqArg) => {
  const options: AxiosOptionsT = {
    method: 'POST',
    url: `${CONFIG.BASE_URL}/api/user/sign-up/`,
    headers: { 'Content-Type': 'application/json' },
    data
  }
  return await axios(options)
}


//----------------------------------------------------------------------
type SendLoginReqT = {
  email: string
  password: string
}
export type LoginResponseT = {
  user: {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    is_active: boolean,
    image: string
  },
  token: {
    refresh: string,
    access: string
  }
}
export const sendLoginRequset = async (data: SendLoginReqT, { dispatch, navigate, refresh_token, toast }: GeneralReqArg) => {
  const options: AxiosOptionsT = {
    method: 'POST',
    url: `${CONFIG.BASE_URL}/api/user/sign-in/`,
    headers: { 'Content-Type': 'application/json' },
    data: data
  };
  return await axios(options)
}


//----------------------------------------------------------------------
export type GetUserInfoResponseT = {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  is_active: boolean,
  image: string
}
export const sendGetUserInfoRequset = async (accessToken: string, { dispatch, navigate, refresh_token, toast }: GeneralReqArg) => {
  const options: AxiosOptionsT = {
    method: 'GET',
    url: `${CONFIG.BASE_URL}/api/user/me/`,
    headers: { 'Authorization': `JWT ${accessToken}` },
  };
  return await send_general_req({ axiosOptions: options, dispatch, navigate, refresh_token, toast })
}
//----------------------------------------------------------------------
export type SendLogoutReqT = {
  refresh: string
}
export type SendLogoutResponseT = {
  message: string
}
export const sendLogoutRequset = async (accessToken: string, refresh_token: string) => {
  const options: AxiosOptionsT = {
    method: 'POST',
    url: `${CONFIG.BASE_URL}/api/user/logout/`,
    headers: { 'Authorization': `JWT ${accessToken}` },
    data: {
      refresh: refresh_token
    }
  };
  return await axios(options)
}
//-------------------------------------------------------------------
export type GetUserPostsResT = {
  count: number,
  next: null | number,
  previous: null | number,
  results: any[]
}

export const sendGetUserPostsRequset = async (accessToken: string, { dispatch, navigate, refresh_token, toast }: GeneralReqArg) => {
  const options: AxiosOptionsT = {
    method: 'GET',
    url: `${CONFIG.BASE_URL}/api/post/crud/`,
    headers: { 'Authorization': `JWT ${accessToken}` },
  };
  return await send_general_req({ axiosOptions: options, dispatch, navigate, refresh_token, toast })
}
//------------------------------------------------------------------

export const sendDeleteUserPostRequest = async (accessToken: string, postId: string | number, { dispatch, navigate, refresh_token, toast }: GeneralReqArg) => {
  const options: AxiosOptionsT = {
    method: 'DELETE',
    url: `${CONFIG.BASE_URL}/api/post/crud/${postId}`,
    headers: { 'Authorization': `JWT ${accessToken}` },
  };
  return await send_general_req({ axiosOptions: options, dispatch, navigate, refresh_token, toast })
}
//------------------------------------------------------------------
export enum SendUpdateUserPostDataFields {
  title = "title",
  description = "description",
  image = "image",
  category = "category",

}

export const sendUpdateUserPostRequest = async (accessToken: string, postId: string, data: FormData, { dispatch, navigate, refresh_token, toast }: GeneralReqArg) => {
  const options: AxiosOptionsT = {
    method: 'PUT',
    url: `${CONFIG.BASE_URL}/api/post/crud/${postId}`,
    headers: { 'Authorization': `JWT ${accessToken}` },
    data
  };
  return await send_general_req({ axiosOptions: options, dispatch, navigate, refresh_token, toast })
}
//-----------------------------------------------------------------
export enum SendCreateUserPostDataFields {
  title = "title",
  description = "description",
  image = "image",
  category = "category",

}
export const sendCreateUserPostRequest = async (accessToken: string, data: FormData, { dispatch, navigate, refresh_token, toast }: GeneralReqArg) => {
  const options: AxiosOptionsT = {
    method: 'POST',
    url: `${CONFIG.BASE_URL}/api/post/crud/`,
    headers: { 'Authorization': `JWT ${accessToken}` },
    data
  };
  return await send_general_req({ axiosOptions: options, dispatch, navigate, refresh_token, toast })
}
//--------------------------------------------------------------
export const sendShowUserPostRequest = async (accessToken: string, postId: string, { dispatch, navigate, refresh_token, toast }: GeneralReqArg) => {
  const options: AxiosOptionsT = {
    method: 'GET',
    url: `${CONFIG.BASE_URL}/api/post/crud/${postId}`,
    headers: { 'Authorization': `JWT ${accessToken}` },
  };
  return await send_general_req({ axiosOptions: options, dispatch, navigate, refresh_token, toast })
}
