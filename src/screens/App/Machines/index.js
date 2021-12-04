import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { showMessage } from 'react-native-flash-message';
import { Header } from '../../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import { SureModal } from '../../../components/Modal';
import auth from '@react-native-firebase/auth';
import { logout } from '../../../Redux/Actions/Auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { width } from 'react-native-dimension';
import { deleteMachines, getMachineList } from '../../../Services/App';
import { changeMachineState } from '../../../Redux/Actions/Config';
import { addMachine, deleteMachinesRedux, truncateMachines, updateMachines, updateMachineState } from '../../../Redux/Actions/Machines';
export default function ManageMachines(props) {
    const machines = useSelector((state) => state.Machines.machines);
    const isLogin = useSelector(state => state.Auth.isLogin);
    const machineState = useSelector((state) => state.Machines.machineState);
    const [sureModalVisible, setSureModalVisible] = useState(false);
    const [machineData, setMachineData] = useState(machines ?? [])
    const [sureModalVisibleEdit, setSureModalVisibleEdit] = useState(false);
    const [sureModalText, setSureModalText] = useState('');
    const [currentItem, setCurrentItem] = useState('');
    const [curdState, setCurdState] = useState('edit');
    const [yesBtnLoader, setYesBtnLoader] = useState(false)
    const dispatch = useDispatch();
    const [pageLoading, setPageLoading] = useState(false);
    const user = useSelector((state) => state.Auth.user);
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
    const crudHandling = async () => {
        setYesBtnLoader(true)
        if (curdState == "edit") {
            setSureModalVisibleEdit(false),
                setYesBtnLoader(false)
            props.navigation.navigate('EditMachines', { item: currentItem })
        }
        else {
            const response = await deleteMachines(currentItem);
            if (response?.success) {
                setYesBtnLoader(false)
                dispatch(deleteMachinesRedux(currentItem))
                dispatch(updateMachineState(true))
                setSureModalVisibleEdit(false),
                    setTimeout(() => {
                        setSuccessMessage('Machine Deleted successfully')
                    }, 1000);
            }
            else {
                setYesBtnLoader(false)
                setSureModalVisibleEdit(false),
                    setTimeout(() => {
                        setErrorMessage(response?.error ?? "Something went wrong")
                    }, 1000);
            }
        }
    }
    const handleMachines = async () => {
        setPageLoading(true)
        const response = await getMachineList(user?.id);
        if (response?.success) {
            setMachineData(response?.data)
            setPageLoading(false)
            dispatch(updateMachines(response?.data))
            dispatch(updateMachineState(false))
        }
        else {
            setPageLoading(false)
            setErrorMessage("Somthing went wrong")
        }
    }
    useEffect(() => {
        if (machineState && isLogin)
            handleMachines()
    }, [machineState])
    const renderItems = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemContainer}
                activeOpacity={0.9}
            >
                <View style={styles.innerContainerFirst}>
                    <Text style={styles.textStyle} numberOfLines={1}>{item?.name}</Text>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.textStyle}>Is Available: {item?.isAvialable ? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.innerContainer}>
                    <TouchableOpacity style={styles.btnContainer}
                        activeOpacity={1}
                        onPress={() => { setCurdState('edit'), setSureModalText("to edit " + item?.name), setCurrentItem(item), setSureModalVisibleEdit(true) }}
                    >
                        <AntDesign
                            name={'edit'}
                            color={AppColors.black}
                            size={width(5)}

                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnContainer}
                        activeOpacity={1}
                        onPress={() => { setCurdState('delete'), setSureModalText("to delete " + item?.name), setCurrentItem(item), setSureModalVisibleEdit(true) }}
                    >
                        <AntDesign
                            name={'delete'}
                            color={AppColors.red}
                            size={width(5)}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScreenWrapper statusBarColor={AppColors.white}
            headerUnScrollable={() => (
                <Header
                    title={'Manage Machines'}
                    prefixIcon={false}
                    suffixIcon
                    onPressSuffixIcon={() => setSureModalVisible(true)}
                />
            )}
        >
            <View style={styles.mainViewContainer}>
                <FlatList
                    data={machineData}
                    renderItem={renderItems}
                    contentContainerStyle={machineData?.length == 0 && (styles.contentContainerStyle)}
                    keyExtractor={(item, index) => String(item?.id + index)}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => (
                        machineData?.length > 0 && (
                            <Button title="Add Machine"
                                onPress={() => props.navigation.navigate('AddMachines')}
                                containerStyle={styles.containerStyle}
                            />
                        )
                    )}
                    ListEmptyComponent={() => (
                        pageLoading ?
                            <ActivityIndicator size="small" color={AppColors.black} />
                            :
                            <Text >No Machine Found </Text>
                    )}
                />
                {
                    machineData?.length == 0 && (
                        <Button title="Add Machine"
                            onPress={() => props.navigation.navigate('AddMachines')}
                            containerStyle={styles.containerStyleAbsolute}
                        />
                    )
                }

                <SureModal
                    isVisible={sureModalVisible}
                    onClose={() => setSureModalVisible(false)}
                    text={"you want to logout?"}
                    onPressYes={async () => {
                        await auth().signOut()
                        setSureModalVisible(false)
                        dispatch(logout())
                        dispatch(updateMachineState(true))
                    }}
                />
                <SureModal
                    isVisible={sureModalVisibleEdit}
                    loader={yesBtnLoader}
                    onClose={() => setSureModalVisibleEdit(false)}
                    text={sureModalText}
                    onPressYes={crudHandling}
                />
            </View>
        </ScreenWrapper>
    );
}
