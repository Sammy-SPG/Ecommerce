const UserReducer = (state, data) => {
    switch (data.type) {
        case "login": {
            if (!Object.prototype.hasOwnProperty.call(state.user, data.body.id)) state.user = data.body;
            return { ...state };
        }
        case 'SignOff': {
            return { user: {} }
        }
        default: {
            return state;
        }
    }
}

export default UserReducer;