import {ADDMACHINES, DELETEMACHINES, TRUCATEMACHINES, UPDATEMACHINES, UPDATEMACHINESTATE} from '../Types';

export const addMachine = (payload) => {
  return {
    type: ADDMACHINES,
    payload: payload,
  };
};
export const truncateMachines= () => {
  return {
    type: TRUCATEMACHINES,
  };
};
export const updateMachineState= payload => {
  return {
    type: UPDATEMACHINESTATE,
    payload:payload
  };
};
export const deleteMachinesRedux= payload => {
  return {
    type: DELETEMACHINES,
    payload:payload
  };
};
export const updateMachines= payload => {
  return {
    type: UPDATEMACHINES,
    payload:payload
  };
};





