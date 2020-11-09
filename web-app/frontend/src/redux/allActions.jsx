import axios from "axios";

const httpClient = axios.create();
httpClient.defaults.timeout = 600000;

const BACKEND_URL = process.env.GATSBY_BACKEND_URL;

export const getUsers = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${BACKEND_URL}/users`);
            dispatch({ type: "getUsersSuccess", payload: response.data });
        } catch (error) {
            dispatch({ type: "getUsersFailed", payload: error });
            throw error;
        }
    };
};

export function getSSAR() {
    return async dispatch => {
        try {
            const response = await axios.get(`${BACKEND_URL}/mongoDB/ssar`);
            dispatch({ type: "getSSARSuccess", payload: response.data });
        } catch (error) {
            dispatch({ type: "getSSARFailed", payload: error });
            throw error;
        }
    };
}

export function getIP() {
    return async dispatch => {
        try {
            const response = await axios.get(`${BACKEND_URL}/mongoDB/ip`);
            dispatch({ type: "getIPSuccess", payload: response.data });
        } catch (error) {
            dispatch({ type: "getIPFailed", payload: error });
            throw error;
        }
    };
}

export function setIP(ip) {
    return async dispatch => {
        try {
            const response = await axios.post(`${BACKEND_URL}/mongoDB/ip`, {
                ip,
            });
            dispatch({ type: "setIPSuccess", payload: response.data });
        } catch (error) {
            dispatch({ type: "setIPFailed", payload: error });
            throw error;
        }
    };
}
