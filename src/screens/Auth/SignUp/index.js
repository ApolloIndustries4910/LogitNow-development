import React, { useState, createRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Redux/Actions/Auth';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { showMessage } from 'react-native-flash-message';
import InputFiled from '../../../components/InputField';
import auth from '@react-native-firebase/auth';
import { insertUserData } from '../../../Services/Auth';
import RNBootSplash from "react-native-bootsplash";
import { Header } from '../../../components/Header';
import { chekValidUser } from '../../../utills/Methods';
export default function SignUp(props) {
    const dispatch = useDispatch();
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [pasword, setPasword] = useState('');
    const [cityOfOperation, setCityOfOperation] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [btnLoader, setBtnLoader] = useState(false);
    const paswdRef = createRef(null);
    const cityRef = createRef(null);
    const emailRef = createRef(null);
    const compIdRef = createRef(null);
    const cityOperationRef = createRef(null);
    const companyNameRef = createRef(null);
    const isAdmin = props.route.params?.isAdmin;
    const setErrorMessage = (errMessage = '') => {
        showMessage({
            message: 'Error',
            description: errMessage,
            type: 'danger',
            duration: 2000
        });
    };
    setTimeout(() => {
        RNBootSplash.hide()
    }, 2000);
    const loginMethod = async () => {
        setBtnLoader(true);
        let dataValidation = {
            companyId,
            email
        }
        const response = await chekValidUser(dataValidation);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var unified_emoji_ranges = ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]'];
        var regEmoji = new RegExp(unified_emoji_ranges.join('|'), 'g');
        var specialCharReg = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (email.trim() === '' || pasword.trim() === '' || name.trim() === '' || city.trim() === '' || (companyId.trim() === '' && !isAdmin)
            || (cityOfOperation.trim() === '' && isAdmin) || (companyName.trim() === '' && isAdmin)
        ) {
            setBtnLoader(false)
            setErrorMessage("Please enter all filelds");
        }
        //Name
        else if (name.match(regEmoji) && specialCharReg.test(name)) {
            setBtnLoader(false)
            setErrorMessage('Name can not contain special characters and emoji');
        }
        else if (name.match(regEmoji)) {
            setBtnLoader(false)
            setErrorMessage('name can not contain emoji');
        }
        else if (specialCharReg.test(name)) {
            setBtnLoader(false)
            setErrorMessage('Name can not contain special characters');
        }

        else if (pasword.match(regEmoji)) {
            setBtnLoader(false)
            setErrorMessage('Password can not contain emoji');
        }
        //Company Id
        else if (companyId.match(regEmoji) && specialCharReg.test(companyId)) {
            setBtnLoader(false)
            setErrorMessage('company id can not contain special characters and emoji');
        }
        else if (companyId.match(regEmoji)) {
            setBtnLoader(false)
            setErrorMessage('Company Id can not contain emoji');
        }
        else if (specialCharReg.test(companyId)) {

        }
         //City 
         else if(specialCharReg.test(city) && city.match(regEmoji))
         {
            setBtnLoader(false)
            setErrorMessage('City can not contain special characters and emoji');
         }
        else if (specialCharReg.test(city)) {
            setBtnLoader(false)
            setErrorMessage('City can not contain special characters');
        }
        else if(city.match(regEmoji))
        {
            setBtnLoader(false)
            setErrorMessage('City can not contain emoji');
        }  
       //City of operation
        else if(cityOfOperation.match(regEmoji) && specialCharReg.test(cityOfOperation))
        {
            setBtnLoader(false)
            setErrorMessage('City of operation can not contain emoji and special chracter');
        }
        else if (cityOfOperation.match(regEmoji)) {
            setBtnLoader(false)
            setErrorMessage('City of operation can not contain emoji');
        }
        else if (specialCharReg.test(cityOfOperation)) {
            setBtnLoader(false)
            setErrorMessage('City can not contain special character');
        }
        //Company Name
        else if(companyName.match(regEmoji) && specialCharReg.test(companyName))
        {
            setBtnLoader(false)
            setErrorMessage('Company name can not contain emoji and special chracter');
        }
        else if (companyName.match(regEmoji)) {
            setBtnLoader(false)
            setErrorMessage('Company  can not contain emoji');
        }
        else if (specialCharReg.test(companyName)) {
            setBtnLoader(false)
            setErrorMessage('company can not contain special characters');
        }
        else if (reg.test(email) == false) {
            setBtnLoader(false);
            setErrorMessage("Invalid Email");
        }
        else if (response?.success && !response?.isValidUser && !isAdmin) {
            setBtnLoader(false);
            setErrorMessage(response?.errorText)
        }
        else if (!response?.success) {
            setBtnLoader(false);
            setErrorMessage("Something went wrong")
        }
        else {
            auth()
                .createUserWithEmailAndPassword(email, pasword)
                .then(async (result) => {
                    let payload = {};
                    if (isAdmin) {
                        payload = {
                            id: result?.user?.uid,
                            name: name,
                            email: email,
                            isAdmin,
                            city,
                            cityOfOperation,
                            companyName,
                            invitedUsers: []
                        }
                    }
                    else {
                        payload = {
                            id: result?.user?.uid,
                            name: name,
                            email: email,
                            isAdmin,
                            city,
                            companyId,
                            status: true
                        }
                    }
                    const response = await insertUserData(result?.user?.uid, payload);
                    if (response?.success) {
                        setBtnLoader(false);
                        dispatch(login(payload))
                    }
                    else {
                        setErrorMessage(response?.message ?? "Something went wrong")
                    }
                })
                .catch(error => {
                    setBtnLoader(false)
                    if (error.code === 'auth/email-already-in-use') {
                        setErrorMessage("Email already in used");
                    }
                    else if (error.code === 'auth/invalid-email') {
                        setErrorMessage("Invalid email");
                    }
                    else {
                        setErrorMessage(error?.message ?? "Somthing went wrong");
                    }
                });
        }

    };
    return (
        <ScreenWrapper statusBarColor={AppColors.white}
            scrollEnabled headerUnScrollable={() => (
                <Header title={'Signup'}
                    onPress={() => props.navigation.goBack()}
                />
            )}
        >
            <View style={styles.mainViewContainer}>
                <Text style={styles.secondHeader}>Create Your Account</Text>
                <InputFiled
                    label={'Name'}
                    placeholder={'Enter Your Name'}
                    value={name}
                    onChangeText={(val) => setName(val)}
                    returnKeyType='next'
                    onSubmit={() => cityRef.current.focus()}
                />
                <InputFiled
                    label={'City'}
                    placeholder={'Enter Your City'}
                    value={city}
                    ref={cityRef}
                    onChangeText={(val) => setCity(val)}
                    returnKeyType='next'
                    onSubmit={() => emailRef.current.focus()}
                />
                <InputFiled
                    label={'Email'}
                    placeholder={'Enter Your Email'}
                    keyboardType={'email-address'}
                    value={email}
                    ref={emailRef}
                    onChangeText={(val) => setEmail(val)}
                    returnKeyType='next'
                    onSubmit={() => paswdRef.current.focus()}
                />
                <InputFiled
                    label={'Password'}
                    placeholder={'Enter Password'}
                    keyboardType='default'
                    value={pasword}
                    onChangeText={(val) => setPasword(val)}
                    rightIcon
                    onPressVisibile={() => { setSecureTextEntry(!secureTextEntry) }}
                    secureTextEntry={secureTextEntry}
                    ref={paswdRef}
                    returnKeyType='next'
                    onSubmit={() => { !isAdmin ? compIdRef.current.focus() : cityOperationRef.current.focus() }}
                />
                {
                    !isAdmin && (
                        <InputFiled
                            label={'Company Id'}
                            placeholder={'Enter Your Company Id'}
                            value={companyId}
                            onChangeText={(val) => setCompanyId(val)}
                            ref={compIdRef}
                        />
                    )
                }
                {
                    isAdmin && (
                        <>
                            <InputFiled
                                label={'City Of Operation'}
                                placeholder={'Enter Your City Of Operation'}
                                value={cityOfOperation}
                                ref={cityOperationRef}
                                onSubmit={() => companyNameRef.current.focus()}
                                onChangeText={(val) => setCityOfOperation(val)}
                            />
                            <InputFiled
                                label={'Company Name'}
                                placeholder={'Enter Your Company Name'}
                                value={companyName}
                                ref={companyNameRef}
                                onChangeText={(val) => setCompanyName(val)}
                            />
                        </>
                    )
                }
                {/* <View style={styles.lowerContainer}>
                    <Text style={styles.lowerTextStyle} >
                        Already have account
                    </Text>
                </View> */}
                <Button title="Signup" onPress={loginMethod}
                    containerStyle={styles.containerStyle}
                    isLoading={btnLoader}
                />

            </View>
        </ScreenWrapper>
    );
}
