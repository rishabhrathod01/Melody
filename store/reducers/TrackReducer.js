import 
{ ADD_TRACKS
} from '../actions/actionTypes';

const INITIAL_STATE = {
    tracks : null,
};

const TrackReducer = (state=INITIAL_STATE, action) => {
    
    switch (action.type) {
        
        case ADD_TRACKS  : 
            return{
                ...state,
                tracks:[...action.tracks]
            }        
        default : return state
        }
};
  
export default TrackReducer;