import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { View } from 'react-native';
import styles from './styles';
import AddMachines from '../../screens/App/AddMachines';
import AddProjects from '../../screens/App/AddProject';
import AddUsers from '../../screens/App/AddUsers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ManageMachines from '../../screens/App/Machines';
import ManageProjects from '../../screens/App/ManageProjects';
import ManageUsers from '../../screens/App/MangeUser';
import DetailProject from '../../screens/App/DetailProject';
import AddSubProject from '../../screens/App/AddSubProject';
import EditMachines from '../../screens/App/EditMachine';
import UserDetail from '../../screens/App/UserDetail';
import EditUser from '../../screens/App/EditUser';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function MyTabBar({ }) {
    return (
        <Tab.Navigator
            lazy={false}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === 'Manage Machines') {
                        return (
                            <View style={styles.settinTab}>
                                <AntDesign
                                    name="setting"
                                    color={iconName = focused ? AppColors.black : AppColors.gray}
                                    size={width(6)}
                                />
                            </View>
                        );
                    }
                    if (route.name == 'Manage Projects') {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <AntDesign
                                    name="setting"
                                    color={iconName = focused ? AppColors.black : AppColors.gray}
                                    size={width(6)}
                                />
                            </View>
                        );
                    }
                    if (route.name == 'Manage Users') {
                        return (
                            <MaterialCommunityIcons
                                name={'account-settings'}
                                color={
                                    (iconName = focused
                                        ? AppColors.black
                                        : AppColors.gray)
                                }
                                size={width(6)}
                            />
                        );
                    }
                },

            })}
            tabBarOptions={{
                style: styles.tabStyles,
                activeTintColor: AppColors.black,
                inactiveTintColor: AppColors.darkGray,
                keyboardHidesTabBar: true,
            }}

        >
            <Tab.Screen name="Manage Machines">
                {() => (
                    <Stack.Navigator initialRouteName="ManageMachines" screenOptions={{
                        headerShown: false
                    }}>
                        <Stack.Screen name="ManageMachines" component={ManageMachines} />
                        <Stack.Screen name="AddMachines" component={AddMachines} />
                        <Stack.Screen name="EditMachines" component={EditMachines} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="Manage Projects">
                {() => (
                    <Stack.Navigator initialRouteName="ManageProjects" headerMode="none">
                        <Stack.Screen name="ManageProjects" component={ManageProjects} />
                        <Stack.Screen name="AddProjects" component={AddProjects} />
                        <Stack.Screen name="DetailProject" component={DetailProject} />
                        <Stack.Screen name="AddSubProject" component={AddSubProject} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="Manage Users">
                {() => (
                    <Stack.Navigator initialRouteName="ManageUsers" headerMode="none">
                        <Stack.Screen name="ManageUsers" component={ManageUsers} />
                        <Stack.Screen name="AddUsers" component={AddUsers} />
                        <Stack.Screen name="UserDetail" component={UserDetail} />
                        <Stack.Screen name="EditUser" component={EditUser} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
