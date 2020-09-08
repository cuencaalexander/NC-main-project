import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            // comment.id = state.length; // json-server adds the id
            // comment.date = new Date().toISOString(); //added in the POST comment action creator
            return {...state, comments: state.comments.concat(comment)}; //we update the comments prop of the prev state
        default:
            return state;
    }
}