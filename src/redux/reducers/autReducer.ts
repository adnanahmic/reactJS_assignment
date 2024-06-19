export interface User {
    "id": 0,
    first_name: "string",
    last_name: "string"
}

interface State {
    loading: boolean,
    error: string | null | undefined,
    token: null | string,
    user: any | User | null
}

const initialState = {
    token: localStorage.getItem('token') ?? null,
    user: null,
    loading: false,
    error: null
}

export enum ActionType {
    POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST',
    POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS',
    POST_LOGIN_FAIL = 'POST_LOGIN_FAIL',

    GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST',
    GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS',
    GET_USER_INFO_FAIL = 'GET_USER_INFO_FAIL',

    LOGOUT = 'LOGOUT'
}

interface actionPending {
    type: ActionType.POST_LOGIN_REQUEST;
    payload: null
}

interface actionSuccess {
    type: ActionType.POST_LOGIN_SUCCESS;
    payload: null | string | any
}

interface actionFail {
    type: ActionType.POST_LOGIN_FAIL;
    payload: string | null;
}

interface userActionPending {
    type: ActionType.GET_USER_INFO_REQUEST;
    payload: null
}

interface userActionSuccess {
    type: ActionType.GET_USER_INFO_SUCCESS;
    payload: object | null | undefined
}

interface userActionFail {
    type: ActionType.GET_USER_INFO_FAIL;
    payload: null | undefined | string
}

interface logout {
    type: ActionType.LOGOUT,
    payload: null
}

export type Action = actionPending | actionSuccess | actionFail | userActionFail | userActionPending | userActionSuccess | logout;

export const authReducer = (state: State = initialState, action: Action) => {

    switch (action.type) {
        case ActionType.POST_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ActionType.POST_LOGIN_SUCCESS:

            localStorage.setItem('token', action.payload)

            return {
                ...state,
                loading: false,
                token: action.payload
            }


        case ActionType.POST_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case ActionType.GET_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ActionType.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload

            }
        case ActionType.GET_USER_INFO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload

            }

        case ActionType.LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                token: null
            }


        default:
            return state;
    }
}