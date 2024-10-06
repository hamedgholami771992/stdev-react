

import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import Fallback from "./components/fallback/fallback";


import { Route, Routes } from 'react-router-dom';



import { PATHES, STORAGE_KEYS } from './utils/constants'
import { makeSureOfExistanceOfEntireStateInStorageANDRedux } from './utils/others'

import { useDispatch, useTypedSelector, UserReduxActionTypesT } from './redux/index'

import styles from './app.module.scss'
import AuthRoute from './components/others/authRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/login/login";
import { Images } from "./assets/images";
import ButtonA from "./components/buttons/buttonA";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import EditPost from "./pages/editPost/editPost";
import CreatePost from "./pages/createPost/createPost";
import ShowPost from "./pages/showPost/showPost";
import { useSelector } from "react-redux";


const { app } = styles


function App(props) {
  const dispatch = useDispatch()
  const userReduxState = useTypedSelector(state => state.user)


  // it gets the state from session|local storage and adds it into redux
  useEffect(() => {
    makeSureOfExistanceOfEntireStateInStorageANDRedux(userReduxState, UserReduxActionTypesT.saveWholeStateFromStorage, STORAGE_KEYS.user, dispatch)

  }, [])

  // //we have to show to homePage if user has the token in his redux store
  let userHasTokenToSeeTheHomePage = false
  if (userReduxState.accessToken) {
    userHasTokenToSeeTheHomePage = true
  }





  return (
    <div className={app}>




      <Suspense fallback={<Fallback />}>
        <Routes>
          {
            //we only want to render the login page if user doesnt have the token
            !userHasTokenToSeeTheHomePage &&
            <>
              <Route path={PATHES.login} element={<Login />} />
              <Route path={PATHES.register} element={<Register />} />
            </>
          }
          {
            userHasTokenToSeeTheHomePage &&
            <>
              <Route path={PATHES.home} element={<AuthRoute key={PATHES.home}><Home /></AuthRoute>} />
              <Route path={PATHES.editPost} element={<AuthRoute key={PATHES.editPost}><EditPost /></AuthRoute>} />
              <Route path={PATHES.createPost} element={<AuthRoute key={PATHES.createPost}><CreatePost /></AuthRoute>} />
              <Route path={PATHES.showPost} element={<AuthRoute key={PATHES.showPost}><ShowPost /></AuthRoute>} />
            </>
          }
        </Routes>
        <ToastContainer />
      </Suspense>
    </div>
  );
}

export default App;
