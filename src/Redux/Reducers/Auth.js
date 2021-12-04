import { LOGIN, LOGOUT, UPDATEUSER } from '../Types';
const intialState = {
    user: {
    },
    isLogin: false,
    isUserPushed:false,
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                user: action.payload,
                isLogin: true
            }
        }
        case UPDATEUSER: {
            return {
                ...state,
                user: action.payload
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: {},
                isLogin: false
            }
        }
        default:
            return state

    }
}
export default reducer;