import { LOGIN, LOGOUT, UPDATEUSER } from '../Types';
export const login = payload => {
    return {
        type: LOGIN,
        payload: payload
    }
};
export const updateUser = payload => {
    return {
        type: UPDATEUSER,
        payload: payload
    }
};
export const logout = () => {
    return {
        type: LOGOUT,
        payload: { uid: '' }
    }
};