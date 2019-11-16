import axios from 'axios';
import * as actionTypes from './actionTypes';

export const uploadStart = () => {
    return {
        type: actionTypes.UPLOAD_START
    };
};

export const uploadSuccess = (title, content, image, tag) => {
    return {
        type: actionTypes.UPLOAD_SUCCESS,
        title: title,
        body: content,
        image: image,
        tag: tag,
    };
};

export const uploadFail = (error) => {
    return {
        type: actionTypes.UPLOAD_FAIL,
        error: error
    };
};

export const uploadPost= (title ,body, image, tag ) =>{
    return dispatch => {
        dispatch(uploadStart());
        const uploadData = {
            title: title,
            body: body,
            image: image,
            tag : tag
        };

        let url = 'http://localhost:8080/feed/';
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: 'Bearer ' + token
            }
        };
        axios.post(url, authData, config)
        .then(response => {
            dispatch()
        }

        )
        
        };
}

