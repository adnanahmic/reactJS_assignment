import { combineReducers } from 'redux';
import { flowerReducer } from './flowerReducer';
import { signUpReducer } from './signUpReducer';
import { authReducer } from './autReducer';

const reducers = combineReducers({
    flowers: flowerReducer,
    signUps: signUpReducer,
    auth: authReducer

});

export default reducers;
//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof reducers>;