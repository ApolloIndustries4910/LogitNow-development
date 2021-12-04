import { ADDLOG, CHECKIN, CHECKINAPI, CHECKOUT, CHECKOUTAPI, CLEARCHECKIN, CLEARCHECKOUT, DELETELOGS, EDITLOGS, GETLOGS, TRUNCATELOGS, UPDATECURRENTDATE, UPDATELOG } from '../Types';
import dayjs from 'dayjs';
const intialState = {
  logs: [],
  isLogPushed: false,
  checkIn: '',
  checkOut: '',
  currentDate:dayjs().valueOf()
}
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ADDLOG: {
      let tempArray = [...state?.logs];
      const index = tempArray.findIndex(item => item?.id == action?.payload?.id);
      if (index != -1) {
        tempArray[index] = action.payload
      }
      else {
        tempArray = [ action.payload,...state?.logs]
      }
      return {
        ...state,
        logs: tempArray,
        isLogPushed: false
      }
    }
    case GETLOGS: {
      return {
        ...state,
        logs: action?.payload,
        isLogPushed: true
      }
    }
    case DELETELOGS: {
      let tempArray = [...state?.logs];
      const index = tempArray.findIndex(item => item?.id == action?.payload?.id);
      if (index != -1) {
        tempArray.splice(index, 1)
      }
      return {
        ...state,
        logs: tempArray
      }
    }
    case TRUNCATELOGS: {
      return {
        ...state,
        logs: []
      }
    }
    case UPDATELOG: {
      return {
        ...state,
        isLogPushed: true
      }
    }
    case CHECKIN: {
      return {
        ...state,
        checkIn: action?.payload,
        isLogPushed: false,
      }
    }
    case CHECKOUT: {
      return {
        ...state,
        isLogPushed: false,
        checkOut: action?.payload
      }
    }
    case CHECKINAPI:{
      return {
        ...state,
        checkIn: action?.payload
      }
    }
    case CHECKOUTAPI:{
      return {
        ...state,
        checkOut: action?.payload
      }
    }
    case CLEARCHECKIN: {
      return {
        ...state,
        checkIn: ''
      }
    }
    case CLEARCHECKOUT: {
      return {
        ...state,
        checkOut: ''
      }
    }
    case UPDATECURRENTDATE: {
      return {
        ...state,
        currentDate: action?.payload,
      }
    }
    default:
      return state
  }
}
export default reducer;