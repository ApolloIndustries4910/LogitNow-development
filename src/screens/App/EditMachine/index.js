import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { showMessage } from 'react-native-flash-message';
import dayjs from 'dayjs';
import { Header } from '../../../components/Header';
import InputFiled from '../../../components/InputField';
import Dropdown from '../../../components/Dropdown'
import Button from '../../../components/Button';
import { addMachines, eidtMachines } from '../../../Services/App';
import { useDispatch, useSelector } from 'react-redux';
import { changeMachineState } from '../../../Redux/Actions/Config';
import { addMachine, updateMachineState } from '../../../Redux/Actions/Machines';
export default function EditMachines(props) {
    const [name, setName] = useState(props.route.params?.item?.name ?? '');
    const [isAvialable, setIsAvialable] = useState('Is available');
    const machines = useSelector((state) => state.Machines.machines);
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.route.params?.item?.isAvialable) {
            setIsAvialable('Yes')
        }
        else if (!props.route.params?.item?.isAvialable) {
            setIsAvialable('No')
        }
    }, [])
    const setErrorMessage = (errMessage = '') => {
        showMessage({
            message: 'Error',
            description: errMessage,
            type: 'danger',
            duration: 2000
        });
    };
    const [availbleOptions, setAvailbleOptions] = useState(['Yes', 'No'])
    const setSuccessMessage = (message = '') => {
        showMessage({
            message: 'Success',
            description: message,
            type: 'success',
        });
    };
    const [btnLoader, setBtnLoader] = useState(false)
    const handlToEditMachines = async () => {
        setBtnLoader(true);
        var unified_emoji_ranges = ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]'];
        var regEmoji = new RegExp(unified_emoji_ranges.join('|'), 'g');
        var specialCharReg = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (name.trim() === '' || isAvialable == 'Is available') {
            setBtnLoader(false)
            setErrorMessage("Please enter all filelds");
        }
        else if (name.match(regEmoji)) {
            setBtnLoader(false)
            setErrorMessage('machine can not contain emoji');
        }
        else if (specialCharReg.test(name)) {
            setBtnLoader(false)
            setErrorMessage('machine can not contain special character');
        }
        else {
            let payload = {
                id: props.route.params.item?.id,
                name,
                addedBy: props.route.params.item?.addedBy,
                isAvialable: isAvialable == 'Yes' ? true : false,
                createdAt: dayjs().valueOf()
            }
            const response = await eidtMachines(payload)
            if (response?.success) {
                setBtnLoader(false);
                dispatch(addMachine(payload))
                dispatch(updateMachineState(true))
                setTimeout(() => {
                    setSuccessMessage('Machine Updated Successfully')
                }, 1000);
                props.navigation.navigate('ManageMachines')
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
                    title={'Edit Machine'}
                    onPress={() => props.navigation.goBack()}
                />
            )}
        >
            <View style={styles.mainViewContainer}>
                <InputFiled
                    label={'Name'}
                    value={name}
                    placeholder={'Enter Machine Name'}
                    onChangeText={(val) => setName(val)}

                />
                <Dropdown
                    label={'Machine Available?'}
                    options={availbleOptions}
                    defaultValue={isAvialable}
                    onSelect={(val) => setIsAvialable(val)}
                    arryObject={false}
                    dropDownStyle={styles.dropDownStyle}
                />

                <Button title="Edit Machine" containerStyle={styles.containerStyle}
                    isLoading={btnLoader} onPress={handlToEditMachines}
                />

            </View>
        </ScreenWrapper>
    );
}
