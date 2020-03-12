import axios from "axios";

const httpClient = axios.create();
httpClient.defaults.timeout = 600000;

const BACKEND_URL_DEV = "http://localhost:3000/";
const BACKEND_URL_PROD = "https://ceg-capstone.herokuapp.com/";

const BACKEND_URL = BACKEND_URL_PROD;

export function getUsers() {
    return dispatch => {
        return axios
            .get(`${BACKEND_URL}users`)
            .then(response => {
                dispatch({ type: "getUsersSuccess", payload: response.data });
            })
            .catch(error => {
                dispatch({ type: "getUsersFailed", payload: error });
                throw error;
            });
    };
}

export function getSSAR() {
    return dispatch => {
        return axios
            .get(`${BACKEND_URL}users/ssar`)
            .then(response => {
                dispatch({ type: "getSSARSuccess", payload: response.data });
            })
            .catch(error => {
                dispatch({ type: "getSSARFailed", payload: error });
                throw error;
            });
    };
}
