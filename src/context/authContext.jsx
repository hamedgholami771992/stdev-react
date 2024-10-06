// import { createContext, useContext, useReducer } from "react";
// import reducer, { initialState } from "./reducer";

// const AuthStateContext = createContext()
// const AuthDispatchContext = createContext()

// export function useAuthState() {
//   const context = useContext(AuthStateContext)
//   if (!context) {
//     throw Error('error')
//   }
//   return context
// }
// export function useAuthDispatch() {
//   const context = useContext(AuthDispatchContext)
//   if (!context) {
//     throw Error('error')
//   }
//   return context
// }


// export function AuthProvider({ children }) {

//   const [state, dispatch] = useReducer(reducer, initialState)

//   return (
//     <AuthStateContext.Provider value={state}>
//       <AuthDispatchContext.Provider value={dispatch}>
//         {children}
//       </AuthDispatchContext.Provider>
//     </AuthStateContext.Provider>
//   )
// }
