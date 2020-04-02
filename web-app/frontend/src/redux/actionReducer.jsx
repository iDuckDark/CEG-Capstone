const defaultState = {
    users: "heree",
    ssar: "ssar default",
    ip: "",
};

export default function actionReducer(state = defaultState, action) {
    const newState = { ...state };
    switch (action.type) {
        case "getUsersSuccess": {
            newState.users = action.payload;
            return newState;
        }
        case "getSSARSuccess": {
            newState.ssar = action.payload.docs;
            return newState;
        }
        case "getIPSuccess": {
            newState.ip = action.payload.docs;
            return newState;
        }
        default:
            return newState;
    }
}
