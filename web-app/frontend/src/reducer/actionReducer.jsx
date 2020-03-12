const defaultState = {
    users: "heree",
    ssar: "ssar default",
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
            // console.log
            return newState;
        }
        default:
            return newState;
    }
}
