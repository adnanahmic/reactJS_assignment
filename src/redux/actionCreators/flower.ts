import axios from 'axios';
import { Dispatch } from "redux";
import { Action, ActionType } from '../reducers/flowerReducer';
import { BASE_URL } from '../../config/http.config';

export const getFlowers = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_FLOWERS_REQUEST,
            payload: undefined
        })

        try {
            const res = await axios.get(`${BASE_URL}/flowers`);

            dispatch({
                type: ActionType.GET_FLOWERS_SUCCESS,
                payload: res?.data?.flowers
            });

        } catch (err: any) {
            dispatch({
                type: ActionType.GET_FLOWERS_FAIL,
                payload: err.message
            });
        }
    }
} 