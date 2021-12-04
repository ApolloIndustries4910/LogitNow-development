import { ADDMACHINES, UPDATEMACHINES, TRUCATEMACHINES, DELETEMACHINES, UPDATEMACHINESTATE } from '../Types';
const intialState = {
  machines: [],
  machineState: true
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ADDMACHINES: {
      let tempArray = [...state?.machines];
      const index = tempArray.findIndex(item => item?.id == action?.payload?.id);
      if (index != -1) {
        tempArray[index] = action.payload
      }
      else {
        tempArray = [action.payload, ...state?.machines]
      }
      return {
        ...state,
        machines: tempArray
      }
    }
    case TRUCATEMACHINES: {
      return {
        ...state,
        machines: [],
      }
    }
    case UPDATEMACHINESTATE: {
      return {
        ...state,
        machineState: action.payload
      }
    }
    case UPDATEMACHINES: {
      return {
        ...state,
        machines: action.payload
      }
    }
    case DELETEMACHINES: {
      let tempArray = [...state?.machines];
      const index = tempArray.findIndex(item => item?.id == action?.payload?.id);
      if (index != -1) {
          tempArray.splice(index,1)
      }
      return {
        ...state,
        machineState: tempArray
      }
    }
    default:
      return state;
  }
};
export default reducer;
