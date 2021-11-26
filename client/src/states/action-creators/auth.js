import axios from "axios";
import * as AuthActionTypes from "../action-types/auth";

export const login = (loginInput, history) => async (dispatch) => {
  try {
    dispatch({
      type: AuthActionTypes.LOADING,
    });

    const { data } = await axios.post(
      "http://localhost:4000/auth/login",
      loginInput
    );

    dispatch({
      type: AuthActionTypes.LOG_IN_SUCCESS,
    });

    dispatch({
      type: AuthActionTypes.GET_USER_PROFILE,
      payload: data.user,
    });

    if (data.token) {
      axios.defaults.headers.common["authorization"] = `Bearer ${data.token}`;
    }

    localStorage.setItem("token", data.token);

    setTimeout(() => {
      history.push("/");
    }, 1000);
  } catch (error) {
    dispatch({
      type: AuthActionTypes.ERROR,
      payload: error.response.data.message,
    });
  }
};

export const register = (registerInput) => async (dispatch) => {
  try {
    dispatch({
      type: AuthActionTypes.LOADING,
    });

    await axios.post("http://localhost:4000/auth/register", registerInput);

    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: "Create account success",
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: AuthActionTypes.ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getUserProfile = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:4000/auth/profile", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(data.user);

    dispatch({
      type: AuthActionTypes.GET_USER_PROFILE,
      payload: data.user,
    });
  } catch (error) {
    console.log(error.resonse);
    dispatch({
      type: AuthActionTypes.ERROR,
      payload: "Something went wrong",
    });
  }
};

export const logout = (history) => async (dispatch) => {
  try {
    dispatch({
      type: AuthActionTypes.LOG_OUT,
    });

    localStorage.clear();

    setTimeout(() => {
      history.push("/login");
    }, 1000);
  } catch (error) {
    console.log(error.response);
  }
};
