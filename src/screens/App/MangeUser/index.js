import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { showMessage } from 'react-native-flash-message';
import { Header } from '../../../components/Header';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import firestore from '@react-native-firebase/firestore'
export default function ManageUsers(props) {
    const user = useSelector((state) => state.Auth.user)
    const [invitationUsers, setInvitationUsers] = useState([]);
    const [empolyees, setEmpolyees] = useState([]);
    const [pageLoading, setPageLoading] = useState(false)

    useEffect(() => {
        getUsers();
        return window.subscribe;
    }, []);
    const getUsers = async () => {
        try {
            setPageLoading(true)
            window.subscribe = firestore()
                .collection('Users')
                .onSnapshot(async (tempData) => {
                    if (tempData) {
                        let employeesData = [];
                        let inviteUsersData = [];
                        for (let i = 0; i < tempData.docs.length; i++) {
                             let doc=tempData.docs[i];
                             if(doc.exists)
                             {
                                if (doc?.data()?.id == user?.id) {
                                    inviteUsersData = doc?.data()?.invitedUsers
                                }
                                else if (doc?.data()?.companyId == user?.id) {
                                    const tempDataInner = await firestore().collection('Users').doc(doc.ref.id).collection('Tasks').get();
                                    let task = []
                                    tempDataInner.forEach(item => {
                                        task.push({...item.data(),taskDate:item.ref.id})
                                    })
                                    employeesData.push({ ...doc.data(), id: doc.ref.id, task: task })
                                }
                             }
                        }
                        setInvitationUsers(inviteUsersData);
                        setEmpolyees(employeesData)
                        employeesData = [];
                        inviteUsersData = [];
                        setPageLoading(false);
                    }
                });
        } catch (error) {
            setPagloading(false);

        }
    };
    const [currentTab, setCurrentTab] = useState(0);
    const renderItems = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemContainer}
                activeOpacity={0.9}
                onPress={() => props.navigation.navigate('UserDetail', { item: item })}
            >
                <View style={styles.innerContainerFirst}>
                    <Text style={styles.header} numberOfLines={1}>Name</Text>
                    <Text style={styles.textStyle} numberOfLines={1}> {item?.name}</Text>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.header} numberOfLines={1}>City</Text>
                    <Text style={styles.textStyle} numberOfLines={1}>{item?.city}</Text>
                </View>
                <View style={styles.innerContainerEmail}>
                    <Text style={styles.header} numberOfLines={1}>Email</Text>
                    <Text style={styles.textStyle} >{item?.email}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const renderItemsInvitation = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemContainerInvitation}
                activeOpacity={0.9}

            >
                <Text style={styles.textStyle} > Email :{item?.email}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <ScreenWrapper statusBarColor={AppColors.white}
            headerUnScrollable={() => (
                <Header
                    title={'Manage Users'}
                    prefixIcon={false}
                />
            )}
        >
            <View style={styles.mainViewContainer}>
                <View style={styles.tabContainer}>
                    <TouchableOpacity style={currentTab == 0 ? styles.innerContainerTabActive : styles.innerContainerTabInActive}
                        onPress={() => setCurrentTab(0)}
                    >
                        <Text style={styles.headerTab}>Invited Users</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={currentTab == 1 ? styles.innerContainerTabActive : styles.innerContainerTabInActive}
                        onPress={() => setCurrentTab(1)}
                    >
                        <Text style={styles.headerTab}>Empolyees</Text>
                    </TouchableOpacity>
                </View>
                {
                    currentTab == 0 ?
                        <>
                            <FlatList
                                data={invitationUsers ?? []}
                                renderItem={renderItemsInvitation}
                                contentContainerStyle={invitationUsers?.length == 0 && (styles.contentContainerStyle)}
                                keyExtractor={(item, index) => String(item?.id + index)}
                                showsVerticalScrollIndicator={false}
                                ListFooterComponent={() => (
                                    invitationUsers?.length > 0 && (
                                        <Button title="Invite User"
                                            onPress={() => props.navigation.navigate('AddUsers')}
                                            containerStyle={styles.containerStyle}
                                        />
                                    )
                                )}
                                ListEmptyComponent={() => (
                                    pageLoading ?
                                        <ActivityIndicator size="small" color={AppColors.black} />
                                        :
                                        <Text >No User Found </Text>
                                )}
                            />
                            {
                                invitationUsers?.length == 0 && (
                                    <Button title="Invite User" containerStyle={styles.containerStyleAbsolute}
                                        onPress={() => props.navigation.navigate('AddUsers')}
                                    />
                                )
                            }

                        </>
                        :
                        <>
                            <FlatList
                                data={empolyees ?? []}
                                renderItem={renderItems}
                                contentContainerStyle={empolyees?.length == 0 && (styles.contentContainerStyle)}
                                keyExtractor={(item, index) => String(item?.id + index)}
                                showsVerticalScrollIndicator={false}
                                // ListFooterComponent={() => (
                                //     empolyees?.length > 0 && (
                                //         <Button title="Invite User"
                                //             onPress={() => props.navigation.navigate('AddUsers')}
                                //             containerStyle={styles.containerStyle}
                                //         />
                                //     )
                                // )}
                                ListEmptyComponent={() => (
                                    pageLoading ?
                                        <ActivityIndicator size="small" color={AppColors.black} />
                                        :
                                        <Text >No User Found </Text>
                                )}
                            />
                            {/* {
                                empolyees?.length == 0 && (
                                    <Button title="Invite User" containerStyle={styles.containerStyleAbsolute}
                                        onPress={() => props.navigation.navigate('AddUsers')}
                                    />
                                )
                            } */}

                        </>
                }

            </View>
        </ScreenWrapper>
    );
}
