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

    console.log(image);
    return dispatch => {
        dispatch(uploadStart());
        const uploadData = {
            title: title,
            content: body,
            imageUrl: image,
            tag : tag
        };
        const formData = new FormData();
        formData.append('title',title);
        formData.append('content',body);
        formData.append('image',image);
        formData.append('tag',tag);

        let url = 'http://localhost:8080/feed/post';
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        };
        axios.post(url, formData, config)
        .then(response => {
            console.log(response);
            localStorage.removeItem('bodyUpload')
            localStorage.removeItem('tags')
            localStorage.removeItem('titleUpload')

            dispatch(uploadSuccess());
        })
        .catch(err => {
            console.log(err);
            console.log('hsvdvshdv');

            // dispatch(authFail(err.response.data.data[0].msg));
        });
        
    };
};

