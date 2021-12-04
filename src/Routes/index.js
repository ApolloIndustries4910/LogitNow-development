import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader'
import Home from '../screens/App/UserHome';
import AddLog from '../screens/App/AddLog';
import EditLog from '../screens/App/EditLog';
import NetInfo from "@react-native-community/netinfo";
import { addLogs, getLogs, getMachineList } from '../Services/App';
import { addLog, checkIn, checkOut, getLogsFromApi, truncateLogs, updateLog } from '../Redux/Actions/Log';
import { showMessage } from 'react-native-flash-message';
import { addMachines, setLoaderVisible } from '../Redux/Actions/Config';
import SignUp from '../screens/Auth/SignUp';
import dayjs from 'dayjs';
import BottomNavigator from '../Routes/Bottom'
import AddMachines from '../screens/App/AddMachines';
import { truncateMachines } from '../Redux/Actions/Config'
import {checkInResponse, checkOutResponse} from '../Redux/Actions/Log'
import ProjectSelection from '../screens/App/ProjectSelection';
const Stack = createStackNavigator();
export default function Routes() {
  const isLogin = useSelector(state => state.Auth.isLogin);
  const logData = useSelector((state) => state.Log.logs);
  const user = useSelector((state) => state.Auth.user);
  const isLogPush = useSelector(state => state.Log.isLogPushed);
  const isMachinesPushed = useSelector(state => state.Config.isMachinePushed);
  const checkInTime = useSelector((state) => state.Log.checkIn);
  const checkOutTime = useSelector((state) => state.Log.checkOut);
  const currentDate = useSelector((state) => state.Log.currentDate);
  const dispatch = useDispatch();
  const setErrorMessage = (errMessage = '') => {
    showMessage({
      message: 'Error',
      description: errMessage,
      type: 'danger',
    });
  };
  const [isConnected, setIsConnected] = useState(false)
  useEffect(() => {
    let mounted = true
    if (isConnected && !isLogPush && mounted && !user?.isAdmin && isLogin) {
      handleTasks()
    }
    return () => mounted = false
  }, [logData, isConnected, isLogPush, checkOutTime, checkInTime])
  const handleTasks = async () => {
    let date = dayjs(currentDate).format('dddd, DD MMMM YYYY');
    console.log("Add Log called")
    let payLoad = {
      checkInTime: checkInTime ?? '',
      checkOutTime: checkOutTime ?? '',
      tasks: logData ?? []
    }
    const response = await addLogs(payLoad, user, date);
    if (response?.success) {
      dispatch(updateLog())
    }
    else {
      setErrorMessage(response?.error)
    }
  }

  useEffect(() => {
    let mounted = true
    if (mounted && isConnected && isLogin && !user?.isAdmin)
      handleGetLogs();
    return () => mounted = false
  }, [isConnected, user, currentDate])

  const handleGetLogs = async () => {
    console.log("Get Log called ")
    dispatch(setLoaderVisible(true))
    let date = dayjs(currentDate).format('dddd, DD MMMM YYYY');
    const resposne = await getLogs(user, date);
    if (resposne?.success) {
      dispatch(checkInResponse(resposne?.checkInTime))
      dispatch(checkOutResponse(resposne?.checkOutTime))
      if (resposne?.data?.length > 0) {
        dispatch(getLogsFromApi(resposne?.data))
        dispatch(setLoaderVisible(false))
      }
      else {
        dispatch(truncateLogs())
        dispatch(setLoaderVisible(false))
      }
    }
    else {
      console.log(resposne?.error)
      //  setErrorMessage(resposne?.error)
    }
  }

  useEffect(() => {
    // Subscribe
    window.unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      setIsConnected(state.isConnected)
      console.log("Is connected?", state.isConnected);
    });

    return window.unsubscribe;
  }, [])
  return (
    <NavigationContainer>
      <Loader />
      {!isLogin ? (
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      ) : (
        user?.isAdmin ?
          <Stack.Navigator initialRouteName="BottomNavigator" headerMode="none">
            <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          </Stack.Navigator>
          :
          <Stack.Navigator initialRouteName="ProjectSelection" headerMode="none">
            <Stack.Screen name="ProjectSelection" component={ProjectSelection} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddLog" component={AddLog} />
            <Stack.Screen name="EditLog" component={EditLog} />
          </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

