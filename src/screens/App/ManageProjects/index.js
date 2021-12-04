import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { showMessage } from 'react-native-flash-message';
import { Header } from '../../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import { getProjects } from '../../../Services/App';
import dayjs from 'dayjs';
import { SureModal } from '../../../components/Modal';
export default function ManageProjects(props) {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.Projects.projects);
    const user = useSelector((state) => state.Auth.user);
    const [projectData, setProjectData] = useState([]);
    const [pageLodaing, setPageLodaing] = useState(false)
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
    const handleProjects = async () => {
        setPageLodaing(true)
        const response = await getProjects(user?.id);
        if (response?.success) {
            setProjectData(response?.data);
            setPageLodaing(false)
        }
        else {
            setErrorMessage(response?.error);
            setPageLodaing(false)
        }
    }
    useEffect(() => {
        handleProjects();
    }, [projects])
    const changeStatus = async () => {

    }
    {/*Sure Modal Variable */ }
    const [sureModalVisible, setSureModalVisible] = useState(false);
    const [yesBtnLoader, setYesBtnLoader] = useState(false);
    const renderItems = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemContainer}
                activeOpacity={0.9}
                onPress={() => props.navigation.navigate('DetailProject', { item: item })}
            >
                <Text style={styles.textStyleCreatedAt} numberOfLines={1}>Created At: {dayjs(item?.createdAt).format('DD MMMM YYYY')}</Text>
                <Text style={styles.textStyleCreatedAt} numberOfLines={1}>Name: {item?.name}</Text>
                <Text style={styles.textStyleCreatedAt} numberOfLines={1}>Status: {item?.status}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <ScreenWrapper statusBarColor={AppColors.white}
            headerUnScrollable={() => (
                <Header
                    title={'Manage Projects'}
                    prefixIcon={false}
                />
            )}
        >
            <View style={styles.mainViewContainer}>
                <FlatList
                    data={projectData}
                    renderItem={renderItems}
                    contentContainerStyle={projectData?.length == 0 && (styles.contentContainerStyle)}
                    keyExtractor={(item, index) => String(item?.id + index)}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => (
                        projectData?.length > 0 && (
                            <Button title="Add Project"
                                onPress={() => props.navigation.navigate('AddProjects')}
                                containerStyle={styles.containerStyle}
                            />
                        )
                    )}
                    ListEmptyComponent={() => (
                        !pageLodaing ?
                            <Text>No Project Found </Text>
                            :
                            <ActivityIndicator size="small" color={AppColors.black} />
                    )}
                />

                {
                    projectData?.length == 0 && (
                        <Button title="Add Project" containerStyle={styles.containerStyleAbsolute}
                            onPress={() => props.navigation.navigate('AddProjects')}
                        />
                    )
                }

                <SureModal
                    isVisible={sureModalVisible}
                    loader={yesBtnLoader}
                    onClose={() => setSureModalVisible(false)}
                    text={"to change status?"}
                    onPressYes={changeStatus}
                />
            </View>
        </ScreenWrapper>
    );
}
