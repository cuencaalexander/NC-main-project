import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const fetchCampsites = () => dispatch => {
    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites') //the fetch might take time
        .then(response => { //as long as there is a response from server this promise considers the fetch(..) resolved. Rejected only if no response from the server.
            if (response.ok) {//good response
                return response;
            } else {//bad response 404, etc. Server is up and running. Promise was resolved not rejected, but with failed status code
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {//no response from server at all
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));
    // setTimeout(() => {
    //     dispatch(addCampsites(CAMPSITES));
    // }, 2000);
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
})

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => { //as long as there is a response from server this promise considers the fetch(..) resolved. Rejected only if no response from the server.
            if (response.ok) {//good response
                return response;
            } else {//bad response 404, etc
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {//no response from server at all
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})

export const postComment = (campsiteId, rating, author, text) => dispatch => {
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "Post",
        body: JSON.stringify(newComment), //stringify converts a JavaScript object or value to a JSON string.
        headers: { //has to be an obj to contain 1 or more objs
            "Content-Type": "application/json"
        }
    })
    .then(response => { //as long as there is a response from server this promise considers the fetch(..) resolved. Rejected only if no response from the server.
        if (response.ok) {//good response
            return response;
        } else {//bad response 404, etc
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
        error => { throw error; } //throws an error to the next catch block
    ) // when the POST request is successful the json-server will send back the data that I sent, like an echo, but it'll insert a unique ID with it
    .then(response => response.json())
    .then(response => dispatch(addComment(response))) //the redux store will be updated with this dispatch
    .catch(error => {
        console.log('post comment', error.message);
        alert('Your comment could not be posted\nError: ' + error.message)
    });//it will catch any rejected promises or throws
};

export const fetchPromotions = () => dispatch => {

    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => { //as long as there is a response from server this promise considers the fetch(..) resolved. Rejected only if no response from the server.
            if (response.ok) {//good response
                return response;
            } else {//bad response 404, etc
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {//no response from server at all
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
})

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

export const fetchPartners = () => dispatch => {
    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.statusText}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
}

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
})

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

export const postFeedback = (feedback) => dispatch => {
    return fetch(baseUrl + 'feedback', {
        method: "Post",
        body: JSON.stringify(feedback), //stringify converts a JavaScript object or value to a JSON string.
        headers: { //has to be an obj to contain 1 or more objs
            "Content-Type": "application/json"
        }
    })
    .then(response => { //as long as there is a response from server this promise considers the fetch(..) resolved. Rejected only if no response from the server.
        if (response.ok) {//good response
            return response;
        } else {//bad response 404, etc
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
        error => { throw error; } //throws an error to the next catch block
    ) // when the POST request is successful the json-server will send back the data that I sent, like an echo, but it'll insert a unique ID with it
    .then(response => response.json())
    .then(response => alert(`Thank you for your feedback ${JSON.stringify(response)}`))
    .catch(error => {
        console.log('post comment', error.message);
        alert('Your contact info could not be posted\nError: ' + error.message)
    });//it will catch any rejected promises or throws
};