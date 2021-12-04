import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsByUsers } from '../../../Services/App';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import workerImage from '../../../assets/images/worker.jpg'
import { showMessage } from 'react-native-flash-message';
import dayjs from 'dayjs';
import { width } from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import { SureModal } from '../../../components/Modal';
import { checkOut, clearCheckIn, clearCheckOut, updateCurrentDate } from '../../../Redux/Actions/Log';
import { logout } from '../../../Redux/Actions/Auth';
import auth from '@react-native-firebase/auth';
export default function ProjectSelection(props) {
    const user = useSelector((state) => state.Auth.user);
    const dispatch = useDispatch();
    const [project, setProject] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const currentDate = useSelector((state) => state.Log.currentDate);
    const checkInTimeRedux = useSelector((state) => state.Log.checkIn);
    const checkOutTime = useSelector((state) => state.Log.checkOut);
    console.log("check in time  ", checkInTimeRedux);
    console.log("check out time  ", checkOutTime)
    const setErrorMessage = (errMessage = '') => {
        showMessage({
            message: 'Error',
            description: errMessage,
            type: 'danger',
            duration: 2000
        });
    };
    const handleToGetProject = async () => {
        setPageLoading(true)
        const response = await getProjectsByUsers(user?.companyId);
        if (response?.success) {
            setPageLoading(false)
            setProject(response?.data)
        }
        else {
            setPageLoading(false)
            setErrorMessage("Somthing went wrong")
        }

    }
    useEffect(() => {
        handleToGetProject()
    }, [])
    const [sureModalVisible, setSureModalVisible] = useState(false);
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemContainer}
                activeOpacity={1}
                onPress={() => props?.navigation?.navigate('Home', { item: item })}
            >
                <Text style={styles.itemText}>{item?.name}</Text>
            </TouchableOpacity>
        )
    }
    const logOut = async () => {

        // setYesBtnLoader(true)
        if (dayjs(currentDate).format('dddd, DD MMMM YYYY') == dayjs().format('dddd, DD MMMM YYYY')) {

            if (checkInTimeRedux == '' && checkOutTime == '') {
                setSureModalVisible(false)
                await auth().signOut(),
                    dispatch(logout())
            }
            else if (checkInTimeRedux != '' && checkOutTime == '') {
                setSureModalVisible(false)
                dispatch(checkOut(dayjs().valueOf()))
                await auth().signOut(),
                    dispatch(logout())
            }
            else {
                 setSureModalVisible(false)
                dispatch(checkOut(dayjs().valueOf()))
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
            headerUnScrollable={() => (
                <View style={styles.headerContainer}>
                    <Text style={styles.userNameText}>Hi! {user?.name}</Text>
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
            )}
        >
            <View style={styles.mainViewContainer}>
                <Image
                    source={workerImage} style={styles.imageStyle}
                />
                <FlatList
                    ListHeaderComponent={() => (
                        project?.length > 0 && (
                            <Text style={styles.header}>What will we do today?</Text>
                        )
                    )}
                    contentContainerStyle={project?.length == 0 && (styles.contentContainerStyle)}
                    data={project}
                    keyExtractor={(item, index) => String(item?.id + index)}
                    renderItem={renderItem}
                    refreshing={pageLoading}
                    onRefresh={() => {
                        setProject([]);
                        handleToGetProject()
                    }}
                    ListEmptyComponent={() => (
                        !pageLoading ?
                            <Text style={styles.textStyle}>No Project Found</Text>
                            :
                            <ActivityIndicator size={'small'} color={AppColors.black} />
                    )}
                />
                <SureModal
                    isVisible={sureModalVisible}
                    // loader={yesBtnLoader}
                    onClose={() => setSureModalVisible(false)}
                    text={"you want to logout?"}
                    onPressYes={logOut}
                />
            </View>
        </ScreenWrapper>
    );
}
