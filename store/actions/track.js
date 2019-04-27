import {
    ADD_TRACKS ,
} from './actionTypes';

export const addTracks = (tracks) =>{
    return{
        type : ADD_TRACKS,
        tracks
    }
}
