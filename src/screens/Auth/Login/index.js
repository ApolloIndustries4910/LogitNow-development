import React, { useState, createRef } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Redux/Actions/Auth';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { showMessage } from 'react-native-flash-message';
import InputFiled from '../../../components/InputField';
import auth from '@react-native-firebase/auth';
import { getUser } from '../../../Services/Auth';
import RNBootSplash from "react-native-bootsplash";
import { ForgotPasswdModal, SelectionModal } from '../../../components/Modal';
export default function Login(props) {
    const user = useSelector((state) => state.Auth.user);
    const dispatch = useDispatch();
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [email, setEmail] = useState('');
    const [pasword, setPasword] = useState('');
    const [btnLoader, setBtnLoader] = useState(false);
    const paswdRef = createRef(null);
    const setErrorMessage = (errMessage = '') => {
        showMessage({
            message: 'Error',
            description: errMessage,
            type: 'danger',
            duration: 2000
        });
    };
    const setSuccessMessage = (succesMessage = '') => {
        showMessage({
            message: 'Success',
            description: succesMessage,
            type: 'success',
            duration: 2000
        });
    };
    setTimeout(() => {
        RNBootSplash.hide()
    }, 2000);
    const loginMethod = () => {
        setBtnLoader(true)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var unified_emoji_ranges = ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]'];
        var regEmoji = new RegExp(unified_emoji_ranges.join('|'), 'g');
        if (email.trim() === '' || pasword.trim() === '') {
            setBtnLoader(false)
            setErrorMessage("Please enter all filelds");
        }
        else if (reg.test(email) == false) {
            setBtnLoader(false);
            setErrorMessage("Invalid Email");
        }
        else if (pasword.match(regEmoji)) {
            setBtnLoader(false)
            setErrorMessage('Password can not contain emoji');
        }
        else {
            auth()
                .signInWithEmailAndPassword(email, pasword)
                .then(async (result) => {
                    const response = await getUser(result?.user?.uid);
                    if (response?.success) {
                        if (response?.exists) {
                            setBtnLoader(false)
                            dispatch(login(response?.data));
                        }
                        else {
                            setBtnLoader(false)
                            setErrorMessage("User not exist")
                        }
                    }
                    else {
                        setBtnLoader(false)
                        setErrorMessage(response?.error ?? 'Somthing Went wrong')
                    }
                })
                .catch(error => {
                    setBtnLoader(false)
                    if (error?.code === 'auth/user-not-found') {
                        setErrorMessage("No User Found");
                    }
                    else if (error?.code === 'auth/wrong-password') {
                        setErrorMessage("Password is invalid");
                    }
                    else {
                        setErrorMessage(error?.message ?? "Somthing went wrong")
                    }
                });
        }

    };
    //Forgot Password Modal Variables
    const [forgotPaswdModalVis, setForgotPaswdModalVis] = useState(false);
    const [forgotModalBtnLoader, setForgotModalBtnLoader] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [error, setError] = useState('');
    const reSetPaswd = async () => {
        try {
            setForgotModalBtnLoader(true)
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (forgotEmail.trim() === '') {
                setForgotModalBtnLoader(false),
                    setError("* Please Enter Email");
                setTimeout(() => {
                    setError('');
                    setForgotEmail('')
                }, 5000);
            }
            else if (!reg.test(forgotEmail)) {
                setForgotModalBtnLoader(false),
                    setError("* Invalid email")
                setTimeout(() => {
                    setError('')
                    setForgotEmail('')
                }, 5000);
            }
            else {
                auth().sendPasswordResetEmail(forgotEmail)
                    .then(function () {
                        setForgotPaswdModalVis(false);
                        setForgotModalBtnLoader(false);
                        setSuccessMessage("Please check your email...")
                    }).catch(function (e) {
                        setForgotPaswdModalVis(false);
                        setForgotModalBtnLoader(false);
                        setError(e?.message ?? 'Something went wrong');
                        setTimeout(() => {
                            setError('')
                        }, 5000);
                    })

            }
        } catch (error) {
            setError(error?.message ?? 'Something went wrong');
            setTimeout(() => {
                setError('');
                setForgotEmail('')
            }, 5000);
            // setErrorMessage(error?.message);
        }
    }

    const [selectionModalView, setSelectionModalView] = useState(false);
    return (
        <ScreenWrapper statusBarColor={AppColors.white}
            scrollEnabled
        >
            <View style={styles.mainViewContainer}>
                <Text style={styles.firstHeader}>LogitNow Loggers</Text>
                <Text style={styles.secondHeader}>Log in to your account</Text>
                <InputFiled
                    label={'Email'}
                    placeholder={'Enter Your Email'}
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    returnKeyType='next'
                    onSubmit={() => paswdRef.current.focus()}
                />
                <InputFiled
                    label={'Password'}
                    placeholder={'Enter Password'}
                    value={pasword}
                    keyboardType='default'
                    onChangeText={(val) => setPasword(val)}
                    rightIcon
                    onPressVisibile={() => { setSecureTextEntry(!secureTextEntry) }}
                    secureTextEntry={secureTextEntry}
                    ref={paswdRef}
                />
                <View style={styles.lowerContainer}>
                    <Text style={styles.lowerTextStyle} onPress={() => setSelectionModalView(true)}>
                        Create Account
                    </Text>
                    <Text style={styles.lowerTextStyle} onPress={() => setForgotPaswdModalVis(true)}>
                        Forgot Password
                    </Text>
                </View>
                <Button title="Log In" onPress={loginMethod}
                    containerStyle={styles.containerStyle}
                    isLoading={btnLoader}
                />
                <ForgotPasswdModal
                    isVisible={forgotPaswdModalVis}
                    isLoading={forgotModalBtnLoader}
                    onClose={() => setForgotPaswdModalVis(false)}
                    value={forgotEmail}
                    onChangeText={(val) => setForgotEmail(val)}
                    onPress={reSetPaswd}
                    error={error}
                />
                <SelectionModal
                    isVisible={selectionModalView}
                    onClose={() => setSelectionModalView(false)}
                    onPressAdmin={() => {setSelectionModalView(false),props.navigation.navigate('SignUp', { isAdmin: true })}}
                    onPressUser={()=> {setSelectionModalView(false),props.navigation.navigate('SignUp', { isAdmin: false })}}
                />
            </View>
        </ScreenWrapper>
    );
}
