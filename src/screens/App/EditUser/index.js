import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { Header } from '../../../components/Header';
import InputFiled from '../../../components/InputField';
import Button from '../../../components/Button';
import { showMessage } from 'react-native-flash-message';
import { editUser } from '../../../Services/App';
export default function EditUser(props) {
    {/*User Data */ }
    const [name, setName] = useState(props?.route?.params?.item?.name ?? '');
    const [email, setEmail] = useState(props?.route?.params?.item?.email ?? '');
    const [city, setCity] = useState(props?.route?.params?.item?.city ?? '')
    {/********** */ }
    const [btnLoader, setBtnLoader] = useState(false);
    const setErrorMessage = (errMessage = '') => {
        showMessage({
            message: 'Error',
            description: errMessage,
            type: 'danger',
        });
    };
    const setSuccessMessage = (message = '') => {
        showMessage({
            message: 'Success',
            description: message,
            type: 'success',
        });
    };
    const EditUser = async () => {
        setBtnLoader(true);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (name.trim() === '' || email.trim() == '' || city.trim() == '') {
            setBtnLoader(false)
            setErrorMessage("Please enter all filelds");
        }
        else if (!reg.test(email)) {
            setBtnLoader(false)
            setErrorMessage("Invalid email");
        }
        else {
            let payload = {
                id: props?.route?.params?.item?.id,
                name,
                city,
                email,
            }
            const response = await editUser(payload);
            if (response?.success) {
                setBtnLoader(false)
                setTimeout(() => {
                    setSuccessMessage("User has been updated successfully")
                }, 1000);
                props.navigation.navigate('ManageUsers')
            }
            else {
                setBtnLoader(false);
                setErrorMessage(response?.error ?? "Somthing went wrong")
            }
        }
    };
    return (
        <ScreenWrapper statusBarColor={AppColors.white}
            scrollEnabled headerUnScrollable={() => (
                <Header
                    title={'Edit Log'}
                    onPress={() => props.navigation.goBack()}
                />
            )}
        >
            <View style={styles.mainViewContainer}>
                <InputFiled
                    label={'Name'}
                    value={name}
                    onChangeText={(val) => setName(val)}
                />
                <InputFiled
                    label={'Email'}
                    value={email}
                    editable={false}
                    onChangeText={(val) => setEmail(val)}
                />
                <InputFiled
                    label={'City'}
                    value={city}
                    onChangeText={(val) => setCity(val)}
                />

                <Button title="Edit User" containerStyle={styles.containerStyle}
                    isLoading={btnLoader} onPress={EditUser}
                />
            </View>
        </ScreenWrapper>
    );
}
