
interface State {
    loading: boolean,
    error: string | null | undefined,
    signUpToken: null | string
}

const initialState = {
    signUpToken: null,
    loading: false,
    error: null
}

export enum ActionType {
    POST_SIGNUP_REQUEST = 'POST_SIGNUP_REQUEST',
    POST_SIGNUP_SUCCESS = 'POST_SIGNUP_SUCCESS',
    POST_SIGNUP_FAIL = 'POST_SIGNUP_FAIL'
}

interface actionPending {
    type: ActionType.POST_SIGNUP_REQUEST;
    payload: null | undefined
}

interface actionSuccess {
    type: ActionType.POST_SIGNUP_SUCCESS;
    payload: string
}

interface actionFail {
    type: ActionType.POST_SIGNUP_FAIL;
    payload: string | null | undefined;
}

export type Action = actionPending | actionSuccess | actionFail;

export const signUpReducer = (state: State = initialState, action: Action) => {

    switch (action.type) {
        case ActionType.POST_SIGNUP_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ActionType.POST_SIGNUP_SUCCESS:

            localStorage.setItem('signUpToken', action.payload)
            return {
                ...state,
                loading: false,
                signUpToken: action.payload
            }

        case ActionType.POST_SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        default:
            return state;
    }
}