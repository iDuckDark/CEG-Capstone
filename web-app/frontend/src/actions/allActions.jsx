import axios from "axios";
const httpClient = axios.create();
httpClient.defaults.timeout = 600000;

export function getUsers() {
    return dispatch => {
        return axios
            .get("https://ceg-capstone.herokuapp.com/users")
            .then(response => {
                dispatch({ type: "getUsersSuccess", payload: response.data });
            })
            .catch(error => {
                dispatch({ type: "getUsersFailed", payload: error });
                throw error;
            });
    };
}
