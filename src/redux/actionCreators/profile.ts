import { Dispatch } from "redux";
import API from '../../config/http.config';
import { ActionType, Action } from '../reducers/autReducer';

export const getUser = (successCallBack: () => void = () => { }) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_USER_INFO_REQUEST,
            payload: null
        })

        try {
            const res = await API.get(`/users/me`)
            dispatch({
                type: ActionType.GET_USER_INFO_SUCCESS,
                payload: res?.data?.user
            });

            successCallBack()

        } catch (err: any) {
            dispatch({
                type: ActionType.GET_USER_INFO_FAIL,
                payload: err.message
            });
        }
    }
}

export const logOutAction = (successCallBack: () => void) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOGOUT,
            payload: null
        })
        successCallBack()
    }
}