import axios from 'axios';
import * as actionTypes from './actionTypes';
import { generateBase64FromImage } from '../../utils/images';

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

    // console.log(b64(image));
    return dispatch => {
        dispatch(uploadStart());
        const uploadData = {
            title: title,
            content: body,
            // imageUrl: b64(image),
            tag : tag
        };
        const formData = new FormData();
        formData.append('title',title);
        formData.append('content',body);
        formData.append('imageUrl',image);
        formData.append('tag',tag);

        let url = 'http://localhost:8080/feed/post';
        const config = {
            headers: {
                // 'content-type': ' multipart/form-data;',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                // "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(url, formData, config)
        .then(response => {
            console.log(response);
            dispatch(uploadSuccess());
        })
        .catch(err => {
            console.log(err.response);
            // dispatch(authFail(err.response.data.data[0].msg));
        });
        
    };
};

