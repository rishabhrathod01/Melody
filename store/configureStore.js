import { createStore , combineReducers , applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import trackReducer from './reducers/TrackReducer';

const rootReducer = combineReducers({
    track    : trackReducer,
});

const configureStore = () =>{
    return createStore(rootReducer, applyMiddleware(thunkMiddleware,));
}

export default configureStore;
