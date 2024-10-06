import { combineReducers, createStore } from "redux";
import { createSelector } from 'reselect'

import userReducer from "./user/reducer"
import { useSelector, useDispatch as _useDispatch, TypedUseSelectorHook } from "react-redux";
import { UserReduxActionsT} from './user/types'
import { composeWithDevTools} from 'redux-devtools-extension'
//--------- exporting types ----------//
export * from './user/types'





//combined reducer
const rootReducer = combineReducers({
  user: userReducer,
 
});
export default rootReducer;


//store
export const store = createStore(rootReducer,composeWithDevTools());
// export const store = createStore(rootReducer);



//combined redux state type
export type RootState = ReturnType<typeof rootReducer>    //then we have to export the return type of combinedReducer


//-------- to create a useDispatch func which is type aware -------//
type StoreEvent = UserReduxActionsT 
export function useDispatch() {
  const dispatch = _useDispatch()
  return (event: StoreEvent) => {
    dispatch<any>(event)
  }
}


//-------- to create a useSelector func which is type aware -------//
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector



