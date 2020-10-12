import axios from "axios";

const httpClient = axios.create();
httpClient.defaults.timeout = 600000;

const BACKEND_URL = process.env.GATSBY_BACKEND_URL;

export const getUsers = () => {
    return dispatch => {
        return axios
            .get(`${BACKEND_URL}/users`)
            .then(response => {
                dispatch({ type: "getUsersSuccess", payload: response.data });
            })
            .catch(error => {
                dispatch({ type: "getUsersFailed", payload: error });
                throw error;
            });
    };
};

export function getSSAR() {
    return dispatch => {
        return axios
            .get(`${BACKEND_URL}/mongoDB/ssar`)
            .then(response => {
                dispatch({ type: "getSSARSuccess", payload: response.data });
            })
            .catch(error => {
                dispatch({ type: "getSSARFailed", payload: error });
                throw error;
            });
    };
}

export function getIP() {
    return dispatch => {
        return axios
            .get(`${BACKEND_URL}/mongoDB/ip`)
            .then(response => {
                dispatch({ type: "getIPSuccess", payload: response.data });
            })
            .catch(error => {
                dispatch({ type: "getIPFailed", payload: error });
                throw error;
            });
    };
}

export function setIP(ip) {
    return dispatch => {
        return axios
            .post(`${BACKEND_URL}/mongoDB/ip`, { ip })
            .then(response => {
                dispatch({ type: "setIPSuccess", payload: response.data });
            })
            .catch(error => {
                dispatch({ type: "setIPFailed", payload: error });
                throw error;
            });
    };
}
