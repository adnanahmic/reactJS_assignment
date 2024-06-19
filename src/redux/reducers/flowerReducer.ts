export interface Flower {
    "id": number,
    "name": "string",
    "latin_name": "string",
    "sightings": number,
    "profile_picture": "string",
    "favorite": true
}

interface State {
    flowers: Flower[],
    loading: boolean,
    error: string | object | null | undefined
}

const initialState = {
    flowers: [],
    loading: false,
    error: null
}

export enum ActionType {
    GET_FLOWERS_REQUEST = 'GET_FLOWERS_REQUEST',
    GET_FLOWERS_SUCCESS = 'GET_FLOWERS_SUCCESS',
    GET_FLOWERS_FAIL = 'GET_FLOWERS_FAIL'
}

interface actionPending {
    type: ActionType.GET_FLOWERS_REQUEST;
    payload: null | undefined
}

interface actionSuccess {
    type: ActionType.GET_FLOWERS_SUCCESS;
    payload: Flower[];
}

interface actionFail {
    type: ActionType.GET_FLOWERS_FAIL;
    payload: string | object | null | undefined;
}

export type Action = actionPending | actionSuccess | actionFail;

export const flowerReducer = (state: State = initialState, action: Action) => {

    switch (action.type) {
        case ActionType.GET_FLOWERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ActionType.GET_FLOWERS_SUCCESS:
            return {
                ...state,
                loading: false,
                flowers: action.payload
            }

        case ActionType.GET_FLOWERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        default:
            return state;
    }
}