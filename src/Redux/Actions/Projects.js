import { ADDPROJECTS, CHANGESTATUSPROJECT, CHANGESTATUSUSER } from "../Types";
export const addProjects = (payload) => {
    return {
        type: ADDPROJECTS,
        payload: payload
    };
};
export const changeStatusMember = (payload) => {
    return {
        type: CHANGESTATUSUSER,
        payload: payload
    };
};
export const changeStatusProject = (payload) => {
    return {
        type: CHANGESTATUSPROJECT,
        payload: payload
    };
};