import axios from 'axios';
import { Dispatch } from "redux";
import { BASE_URL } from '../../config/http.config';
import { ActionType, Action } from '../reducers/autReducer';
export interface LoginPayload {
    "email": "string",
    "password": "string"
}


export const loginAction = (data: LoginPayload, successCallback: () => void, failureCallback = () => { }) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.POST_LOGIN_REQUEST,
            payload: null
        })

        try {
            const res = await axios.post(`${BASE_URL}/users/login`, data);

            dispatch({
                type: ActionType.POST_LOGIN_SUCCESS,
                payload: res?.data?.auth_token
            });

            successCallback()

        } catch (err: any) {
            dispatch({
                type: ActionType.POST_LOGIN_FAIL,
                payload: err.message
            });

            failureCallback()
        }
    }
} 