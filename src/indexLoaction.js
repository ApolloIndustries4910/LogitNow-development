import React, { useEffect } from 'react';
import Routes from './Routes/index';
import { useDispatch } from 'react-redux';
import Auth from '@react-native-firebase/auth';
import { login, logout, updateUser } from './Redux/Actions/Auth';
import firestore from '@react-native-firebase/firestore';
import RNBootSplash from "react-native-bootsplash";
export default function IndexLocation({ navigation }) {
    const dispatch = useDispatch();
    const checkUserAuthentication = async (authUser) => {
        window.authListener()
        if (authUser) {
            const response = await firestore().collection('Users').doc(authUser?.uid).get();
            if (response?.exists) {
              
                dispatch(login(response?.data()))
                RNBootSplash.hide();
            }
            else {
                await Auth().signOut()
                dispatch(logout());
                RNBootSplash.hide();
            }
        }
        else {
            RNBootSplash.hide();
            window.authListener()
        }
    }
    useEffect(() => {
        window.authListener = Auth().onAuthStateChanged(checkUserAuthentication);
        return () => window.authListener()
    })
    return (
        <Routes />
    );
}
