import axios from 'axios';
import { Dispatch } from "redux";
import { BASE_URL } from '../../config/http.config';
import { ActionType, Action } from '../reducers/signUpReducer';

export interface SignUpPayload {
    "email": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string",
    "date_of_birth": "string"
}


export const signUpAction = (data: SignUpPayload, successCallback = () => { }, failureCallback = () => { }) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.POST_SIGNUP_REQUEST,
            payload: undefined
        })

        try {
            const res = await axios.post(`${BASE_URL}/users/register`, data);

            dispatch({
                type: ActionType.POST_SIGNUP_SUCCESS,
                payload: res?.data?.auth_token
            });


            successCallback()

        } catch (err: any) {
            dispatch({
                type: ActionType.POST_SIGNUP_FAIL,
                payload: err.message
            });

            failureCallback()
        }
    }
} 