import { ADDPROJECTS, CHANGESTATUSPROJECT, CHANGESTATUSUSER } from '../Types';
const intialState = {
  projects: [],
  statusChangeUser: true,
  statusChangeProject:true
}
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ADDPROJECTS: {
      let tempArray = [...state?.projects];
      const index = tempArray.findIndex(item => item?.id == action?.payload?.id);
      if (index != -1) {
        tempArray[index] = action.payload
      }
      else {
        tempArray = [action.payload, ...state?.projects]
      }
      return {
        ...state,
        projects: tempArray,
      }
    }
    case CHANGESTATUSUSER: {
      return {
        ...state,
        statusChangeUser: action.payload
      }
    }
    case CHANGESTATUSPROJECT: {
      return {
        ...state,
        statusChangeProject: action.payload
      }
    }
    default:
      return state
  }
}
export default reducer;