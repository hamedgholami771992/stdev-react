import React, { useState, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  PATHES,
  STATUS,
  REDUX_ACTIONS,
  SESSION_STORAGE_KEYS,
} from "../functions/contants";
import SpinnerB from "./spinner/spinnerB";
import { isAValidUser } from "../functions/requests";
import { useDispatch } from "react-redux";
import { userDataPopulator } from "../functions/data";
import { useNavigate } from "react-router-dom";
import useToggleAppSideDrawer from "../01-level1/useToggleAppSideDrawer";
//this route uses just redux state(existatnce of token in redux)
//and doest not send req to backend to check the authentication state
//for this we have to send req in App.js once component did mounted
//if it was any token in localStorage --> we have to catch it --> send it to the backend  --> validate the user
//if token was valid --> stores the token in redux & localStorage
//if token was invalid --> removes it from localStorage

const UserRoute = (props) => {
  const [firstRender, setFirstRender] = useState(true);
  const { token: userToken } = useSelector((state) => state.user);
  const [userIsConfirmed, setUserIsConfirmed] = useState("NOT_VALIDATED_YET");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useToggleAppSideDrawer({ show: props.shouldShowSideDrawer });

  useEffect(async () => {
    const validateUser = async (token, mustValidateInEachPage) => {
      if (mustValidateInEachPage === true) {
        const res = await isAValidUser(token);
        const data = await res.json();

        if (data.status === STATUS.succeededWithData) {
          setUserIsConfirmed("IS_VALID");
          const populatedUserData = userDataPopulator(data.content.user);
          return dispatch({
            type: REDUX_ACTIONS.saveLastUserInfo,
            payload: populatedUserData,
          });
        }

        //if we get unsuccessful response and user is not valid we have to remove user related info from redux and localStorage
        setUserIsConfirmed("IS_INVALID");
        navigate({ pathname: PATHES.login }, { state: { from: props.path } });
        dispatch({
          type: REDUX_ACTIONS.saveUserInfo,
          payload: {
            phoneNumber: null,
            firstName: null,
            lastName: null,
            addresses: [],
            token: null,
          },
        });
      } else {
        setUserIsConfirmed("IS_VALID");
      }
    };

    if (userToken) {
      await validateUser(userToken, false);
      return;
    }
    //if we are in the first render of comp but we havent recieved the token yet ,we have to do nothing for waiting to get the token
    else if (!userToken && firstRender) {
      const userFromLocalStorage = JSON.parse(
        localStorage.getItem(SESSION_STORAGE_KEYS.user)
      );
      if (userFromLocalStorage.token) {
        await validateUser(userFromLocalStorage.token, false);
        return;
      } else {
        setUserIsConfirmed("IS_INVALID");
        navigate({ pathname: PATHES.login }, { state: { from: props.path } });
      }
    }
    //if we passed the first render but we havent get the token yet,we can set the state to invalidate
    else if (!userToken && !firstRender) {
      //if userToken is null,we have to set the state to invalid and redirect user to the login page
      setUserIsConfirmed("IS_INVALID");
      navigate({ pathname: PATHES.login }, { state: { from: props.path } });
    }
    setFirstRender(false);
  }, [userToken]);

  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: "white",
          position: "relative",
          zIndex: "0",
          minHeight: "100vh",
        }}
      >
        {userIsConfirmed === "NOT_VALIDATED_YET" && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <SpinnerB />
          </div>
        )}
        {userIsConfirmed === "IS_VALID" && props.children}
        {userIsConfirmed === "IS_INVALID" && (
          <Navigate
            to={{ pathname: PATHES.login }}
            state={{ from: props.path }}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default UserRoute;
