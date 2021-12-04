import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { Header } from '../../../components/Header';
import InputFiled from '../../../components/InputField';
import Dropdown from '../../../components/Dropdown'
import Button from '../../../components/Button';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from 'dayjs';
import { addLog } from '../../../Redux/Actions/Log';
import { showMessage } from 'react-native-flash-message';
import { getProjectOnly } from '../../../Services/App';
import firestore from '@react-native-firebase/firestore';
import { height } from 'react-native-dimension';
import { areSlotsConflicting } from '../../../utills/Methods';
export default function EditLog(props) {
    const user = useSelector((state) => state.Auth.user);
    const dispatch = useDispatch();
    const logData = useSelector((state) => state.Log.logs);
    const [machineOptions, setMachineOptions] = useState([])
    const [selectedMachine, setSelectedMachine] = useState(props?.route?.params?.item?.machineName);
    const editItems = props?.route?.params?.item ?? '';
    const [startTime, setStartTime] = useState(props?.route?.params?.item?.startTime);
    const [endTime, setEndTime] = useState(props?.route?.params?.item?.endTime);
    const [description, setDescription] = useState(props?.route?.params?.item?.description);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [isDatePickerVisibleEndTime, setIsDatePickerVisibleEndTime] = useState(false);
    const [startTimeValueOf, setStartTimeValueOf] = useState('');
    const checkInTime = useSelector((state) => state.Log.checkIn);
    const [endTimeValueOf, setEndTimeValueOf] = useState('');
    const [btnLoader, setBtnLoader] = useState(false);
    const currentDate = useSelector((state) => state.Log.currentDate);
    const handleConfirm = (date) => {
        setStartTime(dayjs(date).format('h:mm A'));
        setStartTimeValueOf(dayjs(date).valueOf());
        setIsDatePickerVisible(false)
    };
    const handleConfirmEndTime = (date) => {
        setEndTime(dayjs(date).format('h:mm A'));
        setEndTimeValueOf(dayjs(date).valueOf())
        setIsDatePickerVisibleEndTime(false)
    }
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
    useEffect(() => {
        let mounted = true
        if (mounted) {
            setStartTimeValueOf(props?.route?.params?.item?.startTimeValueOf);
            setEndTimeValueOf(props?.route?.params?.item?.endTimeValueOf)
        }
        return () => mounted = false
    }, []);
    const [subProject, setSubProject] = useState(editItems?.subProject);
    const [subProjectOption, setSubProjectOption] = useState([])
    const getProject = async () => {
        const response = await getProjectOnly(editItems?.projectId);
        if (response?.success) {
            let subPrject = response?.data[0]?.subProjects;
            let machines = response?.data[0]?.machines;
            let machineArray = [];
            let subProjectArray = [];
            if (machines?.length > 0) {
                machines?.forEach(async (item) => {
                    const doc = await firestore().collection('Machines').doc(item?._documentPath?._parts[1]).get()
                    if (doc.exists) {
                        machineArray.push({ ...doc.data(), id: doc.ref.id })
                    }
                    setMachineOptions([...machineArray])
                });
            }

            if (subPrject?.length > 0) {
                subPrject.forEach(item => {
                    if (item != editItems?.subProject) {
                        subProjectArray.push(item)
                    }
                });
            }
            setSubProjectOption(subProjectArray)
        }
    }
    useEffect(() => {
        getProject()
    }, [])
    const EditLog = async () => {
        setBtnLoader(true);
        let newSlot = {
            startTime: dayjs(startTimeValueOf).format('hh:mm A'),
            endTime: dayjs(endTimeValueOf).format('hh:mm A')
        }
        let isConflicting = false
        for (let i = 0; i < logData?.length; i++) {

            const currentSlot = {
                startTime: dayjs(logData[i].startTimeValueOf).format('hh:mm A'),
                endTime: dayjs(logData[i].endTimeValueOf).format('hh:mm A')
            }
            if (logData[i].id != props?.route?.params?.item?.id && areSlotsConflicting(newSlot, currentSlot)) {
                isConflicting = true
                break;
            }
        }
        if (startTime.trim() === '' || endTime.trim() == '') {
            setBtnLoader(false)
            setErrorMessage("Please enter all filelds");
        }
        else if (selectedMachine == 'Select Machine') {
            setBtnLoader(false);
            setErrorMessage("Please Select a Machine");
        }
        else if (startTime === endTime) {
            setBtnLoader(false)
            setErrorMessage("Start time and End Time cannot be same");
        }
        else if (dayjs(endTimeValueOf).diff(startTimeValueOf) < 0) {
            setBtnLoader(false)
            setErrorMessage("End Time cannot be before Start Time");
        }
        else if (dayjs(startTimeValueOf).diff(checkInTime) < 0) {
            setBtnLoader(false)
            setErrorMessage("Start time cannot be before the Check-in Time ");
        }
        else if (isConflicting) {
            setBtnLoader(false)
            setErrorMessage("A log is already exist within the selected duration");
        }
        else {
            let payload = {
                id: editItems?.id,
                projectName,
                projectId: editItems?.projectId,
                userId: user?.id,
                machineName: selectedMachine,
                description: description,
                subProject,
                companyId: editItems?.companyId,
                companyName: editItems?.companyName,
                startTime: startTime,
                endTime: endTime,
                createdAt: editItems?.createdAt
            }
            setBtnLoader(false)
            setTimeout(() => {
                setSuccessMessage("Your Log has been updated successfully")
            }, 1000);
            dispatch(addLog(payload))
            props.navigation.navigate('Home')
        }
    };
    const projectName = editItems?.projectName;
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
                    label={'Time Start'}
                    rightIcon
                    rightIconType={'clock'}
                    value={startTime}
                    editable={false}
                    onPress={() => setIsDatePickerVisible(true)}
                />
                <InputFiled
                    label={'Projet Name'}
                    editable={false}
                    value={projectName}
                />
                <Dropdown
                    label={'Machine Used'}
                    options={machineOptions}
                    defaultValue={selectedMachine}
                    dropDownStyle={machineOptions?.length < 3 && ({ height: height(machineOptions?.length * 5) })}
                    onSelect={(val) => setSelectedMachine(val?.name)}
                />
                <Dropdown
                    label={'Sub Project Used'}
                    options={subProjectOption}
                    defaultValue={subProject}
                    onSelect={(val) => setSubProject(val?.name)}
                    dropDownStyle={subProjectOption?.length < 3 && ({ height: height(subProjectOption?.length * 5) })}
                />
                <InputFiled
                    label={'Description (optional)'}
                    numoflines={5}
                    multiline
                    value={description}
                    onChangeText={(val) => setDescription(val)}
                    placeholder={'Write something..'}
                />
                <InputFiled
                    label={'Time End'}
                    value={endTime}
                    rightIcon
                    rightIconType={'clock'}
                    editable={false}
                    onPress={() => setIsDatePickerVisibleEndTime(true)}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    date={new Date(currentDate)}
                    onConfirm={(date) => handleConfirm(date)}
                    onCancel={() => setIsDatePickerVisible(false)}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisibleEndTime}
                    mode="time"
                    date={new Date(currentDate)}
                    onConfirm={(date) => handleConfirmEndTime(date)}
                    onCancel={() => setIsDatePickerVisibleEndTime(false)}
                />
                <Button title="Edit Log" containerStyle={styles.containerStyle}
                    isLoading={btnLoader} onPress={() => EditLog()}
                />
            </View>
        </ScreenWrapper>
    );
}
