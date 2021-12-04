import { ADDLOG, CHECKIN, CHECKINAPI, CHECKOUT, CHECKOUTAPI, CLEARCHECKIN, CLEARCHECKOUT, DELETELOGS, EDITLOGS, GETLOGS, TRUNCATELOGS, UPDATECURRENTDATE, UPDATELOG } from '../Types';
export const addLog = payload => {
    return {
        type: ADDLOG,
        payload: payload
    }
};
export const updateLog = () => {
    return {
        type: UPDATELOG
    }
};
export const deleteLogs = (payload) => {
    return {
        type: DELETELOGS,
        payload:payload
    }
};
export const checkIn = (payload) => {
    return {
        type: CHECKIN,
        payload: payload,
    };
};

export const checkOut = (payload) => {
    return {
        type: CHECKOUT,
        payload: payload,
    };
};

export const clearCheckIn = () => {
    return {
        type: CLEARCHECKIN
    };
};
export const clearCheckOut = () => {
    return {
        type: CLEARCHECKOUT
    };
};

export const updateCurrentDate = (payload) => {
    return {
        type: UPDATECURRENTDATE,
        payload:payload
    };
};

export const truncateLogs = () => {
    return {
        type: TRUNCATELOGS
    };
};

export const getLogsFromApi = (payload) => {
    return {
        type: GETLOGS,
        payload:payload
    };
};

export const checkInResponse=(payload)=>{
    return{
        type:CHECKINAPI,
        payload:payload
    }
}
export const checkOutResponse=(payload)=>{
    return{
        type:CHECKOUTAPI,
        payload:payload
    }
}

