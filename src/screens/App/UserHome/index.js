import React, { useEffect, useState } from 'react';
import AppColors from '../../../utills/AppColors';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/Actions/Auth';
import DateTimeInfo from '../../../components/DateTimeInfo';
import TaskImage from '../../../assets/images/task.png';
import Button from '../../../components/Button';
import { CheckOutConfirmationModal, CheckOutDoneModal, SureModal } from '../../../components/Modal';
import dayjs from 'dayjs';
import TaskInfo from '../../../components/TaskInfo';
import { showMessage } from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import { checkIn, checkOut, clearCheckIn, clearCheckOut, deleteLogs, updateCurrentDate } from '../../../Redux/Actions/Log';
import datePicker from '../../../assets/images/datePicker.png';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { height, width } from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { getProjects, getProjectsByUsers } from '../../../Services/App';
export default function Home(props) {
    var advancedFormat = require('dayjs/plugin/advancedFormat')
    dayjs.extend(advancedFormat)
    var duration = require('dayjs/plugin/duration')
    dayjs.extend(duration)
    const user = useSelector((state) => state.Auth.user);
    const logData = useSelector((state) => state.Log.logs);
    console.log("Log Data  ", logData)
    const checkInTimeRedux = useSelector((state) => state.Log.checkIn);
    console.log("Check in Time Redux  ", checkInTimeRedux)
    const checkOutTime = useSelector((state) => state.Log.checkOut);
    console.log("Check out Time Redux  ", checkOutTime)
    const dispatch = useDispatch();
    const [checkOutModalVis, setCheckOutModalVis] = useState(false)
    const [checkInStatus, setCheckInStatus] = useState(false)
    const [checkOutDoneModalVis, setCheckOutDoneModalVis] = useState(false);
    const [taskData, setTaskData] = useState([]);
    const [checkInTime, setCheckInTime] = useState('');
    const [currentTime, setCurrentTime] = useState(dayjs().valueOf());
    const [checkInTimeValueOf, setCheckInTimeValueOf] = useState('');
    const [differTime, setDifferTime] = useState('');
    const [continueLoder, setContinueLoder] = useState(false);
    const [statusChangeBtnLoader, setStatusChangeBtnLoader] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
    const currentDate = useSelector((state) => state.Log.currentDate);
    const [sureModalVisible, setSureModalVisible] = useState(false);
    const [yesBtnLoader, setYesBtnLoader] = useState(false);
    const setErrorMessage = (errMessage = '') => {
        showMessage({
            message: 'Error',
            description: errMessage,
            type: 'danger',
        });
    }
    const renderItem = ({ item }) => {
        if (props.route.params?.item?.name == item?.projectName) {
            return (
                <TaskInfo
                    item={item}
                    onPressEdit={() => editHandle(item)}
                />
            )
        }
    }
    const editHandle = (item) => {
        if (dayjs(currentDate).format('dddd, DD MMMM YYYY') == dayjs().format('dddd, DD MMMM YYYY')) {
            if (!checkInStatus) {
                setErrorMessage("You can not edit because you have cheked out")
            }
            else {
                props.navigation.navigate('EditLog', { item: item })
            }
        }
        else {
            props.navigation.navigate('EditLog', { item: item })
        }
    }
    useEffect(() => {
        if (checkInTimeRedux != '' && checkOutTime == '') {
            setCheckInStatus(true);
            setCheckInTime(checkInTimeRedux);
            setCurrentTime(dayjs().valueOf())
        }
    }, [])
    useEffect(() => {
        clearInterval(window.timer)
        window.timer = setInterval(() => {
            setCurrentTime(dayjs().valueOf());
        }, 1000 * 60);
    }, [])
    useEffect(() => {
        let mounted = true
        if (mounted && checkInTime != '') {
            let diffrence = dayjs.duration(dayjs(currentTime).diff(dayjs(checkInTime)));
            const hrs = parseInt(diffrence.hours().toFixed(0))
            let min = parseInt(diffrence.minutes().toFixed(0));
            // if (min % 60 == 0) {
            //     setMins(min)
            // }
            let results = ''
            results += hrs + ' hrs '
            results += ' ' + min + ' min '
            setDifferTime(' (' + results + ' )')
        }
        return () => mounted = false
    }, [currentTime])

    useEffect(() => {
        let mounted = true
        if (mounted)
            getLogData()
        return () => mounted = false
    }, [logData])
    const getLogData = async () => {
        let data = [];
        if (logData?.length > 0) {
            logData.forEach(item => {
                if (dayjs(item?.createdAt).format('dddd, DD MMMM YYYY') == dayjs(currentDate).format('dddd, DD MMMM YYYY') && item?.userId == user?.id) {
                    data.push(item)
                }
                else {
                    dispatch(deleteLogs(item))
                }
            });
        }
        setTaskData(data)
    }
    const checkInHandle = () => {
        setStatusChangeBtnLoader(true)
        if (dayjs(currentDate).format('dddd, DD MMMM YYYY') == dayjs().format('dddd, DD MMMM YYYY')) {
            if (!checkInStatus) {
                setCheckInStatus(!checkInStatus);
                setCheckInTime(dayjs().valueOf());
                setCheckInTimeValueOf(dayjs().valueOf());
                setCurrentTime(dayjs().valueOf());
                setCheckInStatus(dayjs().valueOf())
                setStatusChangeBtnLoader(false);
                dispatch(checkIn(dayjs().valueOf()))
                dispatch(clearCheckOut())
            }
            else {
                setStatusChangeBtnLoader(false)
                setCheckOutModalVis(true)
            }
        }
        else {
            setStatusChangeBtnLoader(false)
            setErrorMessage("You can not check in past")
        }
    }
    const addTaskHandle = () => {
        if (dayjs(currentDate).format('dddd, DD MMMM YYYY') == dayjs().format('dddd, DD MMMM YYYY')) {
            if (!checkInStatus) {
                setErrorMessage("You can not Add Log because you have cheked out")
            }
            else {
                props.navigation.navigate('AddLog')
            }
        }
        else {
            props.navigation.navigate('AddLog')
        }
    }
    const handleCheckOut = async () => {
        setContinueLoder(true)
        setContinueLoder(false);
        setCheckOutDoneModalVis(false)
    }
    const handleConfirm = (date) => {
        dispatch(updateCurrentDate(dayjs(date).valueOf()));
        setIsDatePickerVisible(false)
    };
    const logOut = async () => {
        setYesBtnLoader(true)
        if (dayjs(currentDate).format('dddd, DD MMMM YYYY') == dayjs().format('dddd, DD MMMM YYYY')) {
            if (checkInStatus) {
                dispatch(checkOut(dayjs().valueOf()))
                dispatch(updateCurrentDate(dayjs().valueOf()));
                setYesBtnLoader(false);
                setSureModalVisible(false)
                await auth().signOut(),
                    dispatch(logout())
            }
            else {
                setYesBtnLoader(false)
                dispatch(updateCurrentDate(dayjs().valueOf()));
                // dispatch(checkOut(dayjs().valueOf()))
                setSureModalVisible(false)
                await auth().signOut(),
                    dispatch(logout())
            }
        }
        else {
            setYesBtnLoader(false)
            dispatch(updateCurrentDate(dayjs().valueOf()));
            await auth().signOut(),
                dispatch(logout())
        }
    }
    return (
        <ScreenWrapper statusBarColor={AppColors.white}
        >
            <View style={styles.mainViewContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Hi! {user?.name}</Text>
                    <TouchableOpacity style={styles.rightIconContainer}
                        activeOpacity={0.5} onPress={() => setSureModalVisible(true)}
                    >
                        <Entypo
                            name={'log-out'}
                            size={width(6)}
                            color={AppColors.black}
                        />
                    </TouchableOpacity>
                </View>
                <DateTimeInfo
                    date={dayjs(currentDate).format('dddd, Do MMMM YYYY')}
                    startTime={currentTime}
                    time={checkInTime}
                    btnTitle={!checkInStatus ? 'Check In' : 'Check Out'}
                    onPressRighBtn={checkInHandle}
                    statusChangeBtnLoader={statusChangeBtnLoader}
                    differTime={differTime}
                />
                <View style={styles.checkInTimecotainer}>
                    {
                        checkInTimeRedux ?
                            <Text style={styles.checkInTimeText}>Check In Time of {dayjs(currentDate).format('dddd, MMMM YYYY')} :{dayjs(checkInTimeRedux).format('hh mm A')}</Text>
                            :
                            <Text style={styles.checkInTimeText}>Check In Time of {dayjs(currentDate).format('dddd, MMMM YYYY')} : not found</Text>
                    }
                    {
                        checkOutTime?
                        <Text style={styles.checkInTimeText}>Check Out Time of {dayjs(currentDate).format('dddd, MMMM YYYY')} : {dayjs(checkOutTime).format('hh mm A')}</Text>
                        :
                        <Text style={styles.checkInTimeText}>Check Out Time of {dayjs(currentDate).format('dddd, MMMM YYYY')} : not found</Text>
                    }
   
                </View>
                <View style={styles.todayTaskTextContainer}>
                    {
                        dayjs(currentDate).format('dddd, DD MMMM YYYY') == dayjs().format('dddd, DD MMMM YYYY') ?
                            <Text style={styles.todayTaskText}>Today's Tasks</Text>
                            :
                            <Text style={styles.todayTaskText}>{dayjs(currentDate).format('DD MMMM YYYY')} 's Tasks</Text>
                    }
                    <Text style={styles.addTaskText} onPress={() => props.navigation.goBack()}>Switch Project</Text>
                </View>
                <FlatList
                    data={taskData ?? []}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => String(item?.id + index)}
                    contentContainerStyle={{ paddingBottom: height(1) }}
                    ListFooterComponent={() => (
                        <Button title="Add Log"
                            containerStyle={(!checkInStatus && dayjs(currentDate).format('dddd, DD MMMM YYYY') == dayjs().format('dddd, DD MMMM YYYY')) ? styles.containerStyleDisable : styles.containerStyle}
                            onPress={() => { checkInTimeRedux ? props.navigation.navigate('AddLog', { checkInTime: checkInTimeRedux, item: props.route.params?.item ?? '' }) : setErrorMessage("You can not add Log because you not chek in " + dayjs(currentDate).format('dddd, DD MMMM YYYY')) }}
                        // isLoading={btnLoader}
                        />
                    )}
                    ListEmptyComponent={() => (
                        taskData?.length == 0 && (
                            (dayjs(currentDate).format('dddd, DD MMMM YYYY') == dayjs().format('dddd, DD MMMM YYYY')) ?
                                <>

                                    <Image
                                        resizeMode={'contain'}
                                        source={TaskImage}
                                        style={styles.imageStyle}
                                    />
                                    <Text style={styles.addBlogText}>Check in to add your logs</Text>

                                </>
                                :
                                <Text style={styles.emptyText}>There are no task at {dayjs(currentDate).format('dddd, DD MMMM YYYY')}</Text>
                        )
                    )}
                />

                <TouchableOpacity activeOpacity={1} style={styles.datePickerMainContainer}
                    onPress={() => setIsDatePickerVisible(true)}
                >
                    <Image source={datePicker} style={styles.datePickerImage} />
                </TouchableOpacity>
            </View>
            <CheckOutConfirmationModal
                isVisible={checkOutModalVis}
                date={dayjs().format('dddd, Do MMMM YYYY')}
                hour={dayjs().format('h:mm A')}
                onClose={() => setCheckOutModalVis(false)}
                onPressNotNow={() => setCheckOutModalVis(false)}
                onPressCheckOut={() => {
                    dispatch(checkOut(dayjs().valueOf()))
                    setCheckOutModalVis(false)
                    setCheckInStatus(false)
                    setTimeout(() => {
                        setCheckOutDoneModalVis(true);
                    }, 600);
                }}
            />
            <CheckOutDoneModal
                isVisible={checkOutDoneModalVis}
                onClose={() => setCheckOutDoneModalVis(false)}
                onPressContinue={() => handleCheckOut()}
                onPressLogOut={async () => {
                    setCheckOutDoneModalVis(false),
                        dispatch(clearCheckIn())
                    dispatch(clearCheckOut())
                    dispatch(updateCurrentDate(dayjs().valueOf()));
                    await auth().signOut(),
                        dispatch(logout())
                }}
                continueLoder={continueLoder}
            />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => handleConfirm(date)}
                onCancel={() => setIsDatePickerVisible(false)}
                date={new Date(currentDate)}
                maximumDate={new Date(dayjs().add(1, 'day').valueOf() - 86400000)}
            // minimumDate={new Date(dayjs().subtract(1, 'month').valueOf() - 86400000)}
            />
            <SureModal
                isVisible={sureModalVisible}
                loader={yesBtnLoader}
                onClose={() => setSureModalVisible(false)}
                text={"you want to logout?"}
                onPressYes={logOut}
            />
        </ScreenWrapper>
    );
}
