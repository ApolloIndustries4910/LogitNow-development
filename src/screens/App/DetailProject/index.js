import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { Header } from '../../../components/Header';
import Button from '../../../components/Button';
import dayjs from 'dayjs';
import firestore from '@react-native-firebase/firestore';
export default function DetailProject(props) {
    const itemDetails = props.route.params?.item ?? '';
    const [machines, setMachines] = useState([]);
    const handleProject = async () => {
        if (itemDetails?.machines?.length > 0) {
            let tempArray = [];
            itemDetails?.machines?.forEach(async (item) => {
                const doc = await firestore().collection('Machines').doc(item?._documentPath?._parts[1]).get()
                if (doc.exists) {
                    tempArray.push({ ...doc.data(), id: doc.ref.id })
                }
                setMachines([...tempArray])
            });
        }
    }
    useEffect(() => {
        handleProject();
    }, [])
    return (
        <ScreenWrapper statusBarColor={AppColors.white}
            headerUnScrollable={() => (
                <Header
                    title={'Project Details'}
                    onPress={() => props.navigation.goBack()}
                />
            )}
        >
            <View style={styles.mainViewContainer}>
                <TouchableOpacity style={styles.itemContainer}
                    activeOpacity={0.9}
                >
                    <Text style={styles.textStyleCreatedAt} numberOfLines={1}>Project Name : {itemDetails?.name}</Text>
                    <Text style={styles.textStyleCreatedAt} numberOfLines={1}>Created At: {dayjs(itemDetails?.createdAt).format('DD MMMM YYYY')}</Text>
                    {
                        itemDetails?.subProjects?.length > 0 &&
                        (
                            <>
                                <Text style={styles.textStyleCreatedAt} numberOfLines={1}>Sub Projects</Text>

                                {
                                    itemDetails?.subProjects?.map((item, index) => {
                                        return (
                                            <View style={styles.subProjectMainContainer} key={String(index)}>
                                                <Text style={styles.textStyle} numberOfLines={1} >Name: {item?.name}</Text>

                                            </View>
                                        );
                                    }
                                    )
                                }

                            </>
                        )
                    }
                    {
                        machines?.length > 0 &&
                        (
                            <>
                                <Text style={styles.textStyleCreatedAt} numberOfLines={1}>Machines</Text>
                                {
                                    machines.map((item, index) => {
                                        return (
                                            <View style={styles.subProjectMainContainer} key={String(index)}>
                                                <Text style={styles.textStyle} numberOfLines={1} >Name: {item?.name}</Text>
                                                {/* <View style={styles.btnMainContainerMachine}>
                                                    <AntDesign
                                                        name={'delete'}
                                                        color={AppColors.red}
                                                        size={width(5)}
                                                    />
                                                </View> */}
                                            </View>
                                        );
                                    }
                                    )
                                }

                            </>
                        )
                    }
                </TouchableOpacity>
                <Button title="Edit Project" containerStyle={styles.containerStyle}
                    onPress={() => props.navigation.navigate('AddSubProject', { item: itemDetails, machines })}
                />
            </View>
        </ScreenWrapper>
    );
}
