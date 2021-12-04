import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { showMessage } from 'react-native-flash-message';
import dayjs from 'dayjs';
import { Header } from '../../../components/Header';
import InputFiled from '../../../components/InputField';
import Dropdown from '../../../components/Dropdown'
import Button from '../../../components/Button';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addLog } from '../../../Redux/Actions/Log';
import firestore from '@react-native-firebase/firestore'
import { areSlotsConflicting } from '../../../utills/Methods';
import { height } from 'react-native-dimension';
export default function AddLog(props) {
    var duration = require('dayjs/plugin/duration')
    dayjs.extend(duration)
    const user = useSelector((state) => state.Auth.user);
    const logData = useSelector((state) => state.Log.logs);
    const dispatch = useDispatch();
    const projectDetail = props.route.params?.item;
    const [machineOptions, setMachineOptions] = useState([])
    const checkInTime = useSelector((state) => state.Log.checkIn);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedMachine, setSelectedMachine] = useState('Select Machine');
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [isDatePickerVisibleEndTime, setIsDatePickerVisibleEndTime] = useState(false);
    const [description, setDescription] = useState('');
    const [btnLoader, setBtnLoader] = useState(false);
    const [startTimeValueOf, setStartTimeValueOf] = useState(dayjs(checkInTime).valueOf());
    const [endTimeValueOf, setEndTimeValueOf] = useState('');
    const currentDate = useSelector((state) => state.Log.currentDate);
    const checkOutTime = useSelector((state) => state.Log.checkOut);
    const handleConfirm = (date) => {
        setStartTime(dayjs(date).format('h:mm A'))
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
            duration: 2000
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
        let mounted = true;
        if (mounted) {
            setStartTime(dayjs(checkInTime).format('hh:mm A'))
            setStartTimeValueOf(dayjs(checkInTime).valueOf())
        }
        return () => mounted = false
    }, []);
    const AddLog = async () => {
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
            console.log('======> ',newSlot, currentSlot);
            if (areSlotsConflicting(newSlot, currentSlot)) {
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
        else if (selectedMachine == 'Select Sub Project') {
            setBtnLoader(false);
            setErrorMessage("Please Select a sub project");
        }
        else if (startTime === endTime) {
            setBtnLoader(false)
            setErrorMessage("Start time and End Time cannot be same");
        }
        else if (dayjs(endTimeValueOf).diff(startTimeValueOf) < 0) {
            setBtnLoader(false)
            setErrorMessage("End Time cannot be before Start Time");
        }
        /*else if (dayjs(startTimeValueOf).diff(checkInTime) < 0) {
            setBtnLoader(false)
            setErrorMessage("Start time cannot be before the Check-in Time ");
        }*/
       
        else if(isConflicting)
        {
            setBtnLoader(false)
            setErrorMessage("A log is already exist within the selected duration");
        }
        else {
            const id = firestore().collection('Random').doc()?.id
            let payload = {
                id: id,
                projectName,
                projectId: projectDetail?.id,
                userId: user?.id,
                machineName: selectedMachine,
                description,
                subProject,
                companyId: projectDetail?.addedBy,
                companyName: projectDetail?.companyName,
                startTime,
                startTimeValueOf,
                endTimeValueOf,
                endTime,
                createdAt: currentDate
            }
            setBtnLoader(false);
            setTimeout(() => {
                setSuccessMessage('Your Log added successfully')
            }, 1000);
            dispatch(addLog(payload))
            props.navigation.navigate('Home')
        }
    };
    const [projectName, setProjectName] = useState(projectDetail?.name);
    const [subProject, setSubProject] = useState('Select Sub Project');
    const [subProjectOption, setSubProjectOption] = useState(projectDetail?.subProjects)
    const handleMachines = async () => {
        if (projectDetail?.machines?.length > 0) {
            let tempArray = [];
            projectDetail?.machines?.forEach(async (item) => {
                const doc = await firestore().collection('Machines').doc(item?._documentPath?._parts[1]).get()
                if (doc.exists) {
                    tempArray.push({ ...doc.data(), id: doc.ref.id })
                }
                setMachineOptions([...tempArray])
            });
        }
    }
    useEffect(() => {
        handleMachines()
    }, [])
    return (
        <ScreenWrapper statusBarColor={AppColors.white}
            scrollEnabled headerUnScrollable={() => (
                <Header
                    title={'Add Log'}
                    onPress={() => props.navigation.goBack()}
                />
            )}
        >
            <View style={styles.mainViewContainer}>
                <InputFiled
                    label={'Time Start'}
                    rightIcon
                    rightIconType={'clock'}
                    editable={false}
                    value={startTime}
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
                    onSelect={(val) => setSelectedMachine(val?.name)}
                    dropDownStyle={machineOptions?.length < 3 && ({ height: height(machineOptions?.length * 5) })}
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
                    placeholder={'Write something..'}
                    onChangeText={(val) => setDescription(val)}
                />
                <InputFiled
                    label={'Time End'}
                    placeholder={'Select Time'}
                    rightIcon
                    rightIconType={'clock'}
                    editable={false}
                    value={endTime}
                    onPress={() => setIsDatePickerVisibleEndTime(true)}
                />
                <Button title="Add Log" containerStyle={styles.containerStyle}
                    isLoading={btnLoader} onPress={AddLog}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    date={new Date(checkInTime)}
                    onConfirm={(date) => handleConfirm(date)}
                    onCancel={() => setIsDatePickerVisible(false)}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisibleEndTime}
                    mode="time"
                    date={checkOutTime ? new Date(checkOutTime) : new Date(currentDate)}
                    onConfirm={(date) => handleConfirmEndTime(date)}
                    onCancel={() => setIsDatePickerVisibleEndTime(false)}
                />
            </View>
        </ScreenWrapper>
    );
}
