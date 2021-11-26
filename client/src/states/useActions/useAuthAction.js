import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as AuthActionTypes from "../action-creators/auth";

export const useAuthAction = () => {
  const dispatch = useDispatch();

  return bindActionCreators(AuthActionTypes, dispatch);
};
