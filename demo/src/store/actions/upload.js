import axios from 'axios';
import * as actionTypes from './actionTypes';


export const uploadStart = () => {
    return {
        type: actionTypes.UPLOAD_START
    };
};

export const uploadSuccess = () => {
    return {
        type: actionTypes.UPLOAD_SUCCESS,
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
            content: body,
            imageUrl: image,
            tag : tag
        };

        let url = 'http://localhost:8080/feed/post';
        const config = {
            headers: {
                // 'content-type': 'multipart/form-data',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };
        axios.post(url, uploadData, config)
        .then(response => {
            console.log(response);
            dispatch(uploadSuccess());
        })
        .catch(err => {
            console.log(err);
            // dispatch(authFail(err.response.data.data[0].msg));
        });
        
    };
};

