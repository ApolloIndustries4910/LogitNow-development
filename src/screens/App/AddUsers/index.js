import React, { useState } from 'react';
import { Linking, Text, View } from 'react-native';
import styles from './styles';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { showMessage } from 'react-native-flash-message';
import { Header } from '../../../components/Header';
import InputFiled from '../../../components/InputField';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addMembers } from '../../../Services/App';
import { updateUser } from '../../../Redux/Actions/Auth';
import firestore from '@react-native-firebase/firestore';
import RNSmtpMailer from "react-native-smtp-mailer";
export default function AddUsers(props) {
    const [email, setEmail] = useState('');
    const user = useSelector((state) => state.Auth.user);
    const [invitedUser, setInvitedUser] = useState(user?.invitedUsers ?? [])
    const [btnLoader, setBtnLoader] = useState(false);
    const dispatch = useDispatch();
    var companyId = user?.id;
    const setErrorMessage = (errMessage = '') => {
        showMessage({
            message: 'Error',
            description: errMessage,
            type: 'danger',
            duration: 2000
        });
    };
    const handlToInviteUser = async () => {
        setBtnLoader(true);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (user?.inVitedUsers)
            var checkEmail = user?.inVitedUsers.some(item => item?.email == email);
        if (email.trim() === '') {
            setBtnLoader(false)
            setErrorMessage("Please enter all filelds");
        }
        else if (checkEmail) {
            setBtnLoader(false)
            setErrorMessage("User already invited");
        }
        else if (!reg.test(email)) {
            setBtnLoader(false)
            setErrorMessage("Invalid email");
        }
        else {
            const id = firestore().collection('Random').doc()?.id;
            let temparray = [...invitedUser];
            temparray.push({
                id,
                email,
                companyId,
                status: 'invited'
            })
            let payload = {
                ...user,
                invitedUsers: temparray
            }
            RNSmtpMailer.sendMail({
                mailhost: "smtp.gmail.com",
                port: "465",
                ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
                username: "logitloggers7",
                password: "#>@PE'$-T}/c]B7#",
                recipients: email,
                subject: "Company Id",
                htmlBody: `<h1>Company Id of ${user?.companyName}</h1><p>${user?.id}</p>`,
                attachmentNames: [
                    "image.jpg",
                    "firstFile.txt",
                    "secondFile.csv",
                    "pdfFile.pdf",
                    "zipExample.zip",
                    "pngImage.png"
                ], // required in android, these are renames of original files. in ios filenames will be same as specified in path. In a ios-only application, no need to define it
            })
                .then(async () => {
                    const response = await addMembers(user?.id, payload);
                    if (response?.success) {
                        setBtnLoader(false);
                        dispatch(updateUser(payload))
                        props.navigation.navigate('ManageUsers');
                    }
                    else {
                        setBtnLoader(false);
                        setErrorMessage(response?.error ?? "Something went wrong")
                    }
                })
                .catch(err => {
                    console.log(err)
                    setBtnLoader(false);
                    setErrorMessage(err?.message ?? "Something went wrong")
                });
        }
    };
    return (
        <ScreenWrapper statusBarColor={AppColors.white}
            headerUnScrollable={() => (
                <Header
                    title={'Invite users'}
                    onPress={() => props.navigation.goBack()}
                />
            )}
        >
            <View style={styles.mainViewContainer}>
                <Text style={styles.companyIdText}>Company Id :{user?.id}</Text>
                <InputFiled
                    label={'Email'}
                    value={email}
                    placeholder={'Enter Email'}
                    keyboardType={'email-address'}
                    onChangeText={(val) => setEmail(val)}
                />

                <Button title="Invite User" containerStyle={styles.containerStyle}
                    isLoading={btnLoader} onPress={handlToInviteUser}
                    onPress={handlToInviteUser}
                />

            </View>
        </ScreenWrapper>
    );
}
