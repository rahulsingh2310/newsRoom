import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    title: null,
    body: null,
    image: null,
    tag: false,
    loading: false,
    authRedirectPath: '/',
    error: null,
};

const uploadStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const uploadSuccess = (state, action) => {
    return updateObject( state, { 
        title: action.title,
        body: action.content,
        image: action.image,
        tag: action.tag,
        error: null,
        loading: false
     } );
};

const uploadFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.UPLOAD_START: return uploadStart(state, action);
        case actionTypes.UPLOAD_SUCCESS: return uploadSuccess(state, action);
        case actionTypes.UPLOAD_FAIL: return uploadFail(state,action);
        default:
            return state;
    }
};

export default reducer;

