import * as AuthActionTypes from "../action-types/auth";

const initialState = {
  authenticated: localStorage.getItem("token") ? true : false,
  isLoading: false,
  success: "",
  error: "",
  user: {},
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOADING:
      return {
        ...state,
        error: "",
        success: "",
        isLoading: true,
      };
    case AuthActionTypes.LOG_IN_SUCCESS:
      return {
        error: "",
        success: "",
        isLoading: false,
        authenticated: true,
        user: {},
      };

    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        success: action.payload,
        isLoading: false,
        error: "",
        authenticated: false,
        user: {},
      };

    case AuthActionTypes.GET_USER_PROFILE:
      return {
        ...state,
        success: "",
        isLoading: false,
        error: "",
        user: action.payload
      };

    case AuthActionTypes.LOG_OUT:
      return {
        success: "",
        isLoading: false,
        error: "",
        authenticated: false,
        user: {}
      };

    case AuthActionTypes.ERROR:
      return {
        user: {},
        success: "",
        isLoading: false,
        error: action.payload,
      };

    case AuthActionTypes.CLEAR:
      return {
        ...state,
        success: "",
        isLoading: false,
        error: "",
      };

    default:
      return state;
  }
};
