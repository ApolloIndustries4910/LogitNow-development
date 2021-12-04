import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { showMessage } from 'react-native-flash-message';
import dayjs from 'dayjs';
import { Header } from '../../../components/Header';
import InputFiled from '../../../components/InputField';
import Dropdown from '../../../components/Dropdown'
import Button from '../../../components/Button';
import { addMachines, addProject, deleteSubProject } from '../../../Services/App';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import { width } from 'react-native-dimension';
import { addProjects } from '../../../Redux/Actions/Projects';
export default function AddSubProject(props) {
    const dispatch = useDispatch();
    const machines = useSelector((state) => state.Machines.machines);
    const user = useSelector((state) => state.Auth.user);
    const itemDetails = props.route.params?.item ?? '';
    const [name, setName] = useState(itemDetails?.name);
    const setErrorMessage = (errMessage = '') => {
        showMessage({
            message: 'Error',
            description: errMessage,
            type: 'danger',
            duration: 2000
        });
    };
    const [machineOptions, setMachineOptions] = useState(machines)
    const setSuccessMessage = (message = '') => {
        showMessage({
            message: 'Success',
            description: message,
            type: 'success',
        });
    };

    const [btnLoader, setBtnLoader] = useState(false);
    {/* Sub Project handling */ }
    const [subProjectName, setSubProjectsName] = useState('');
    const [subProjects, setSubProjects] = useState(itemDetails?.subProjects);
    const onPressAdd = (subProjectName) => {
        if (subProjectName.trim().length == 0) {
            setErrorMessage("Can not add empty sub projects name")
        }
        else if (name.trim().length == 0) {
            setErrorMessage("Please project name first")
        }
        else {
            let tempArray = [...subProjects];
            const id = firestore().collection('Random').doc()?.id;
            const index = tempArray.findIndex(item => item.name == subProjectName);
            if (index != -1) {
                tempArray[index].name = subProjectName
            }
            else {
                let object = {
                    id,
                    name: subProjectName
                }
                tempArray.push(object)
            }
            setSubProjectsName('')
            setSubProjects(tempArray)
        }
    }
    const onPressCrossIcon = async (items) => {
        let tempArray = [...subProjects];
        const index = tempArray.findIndex(item => item.name == items?.name);
        if (index != -1) {
            tempArray.splice(index, 1)
        }
        setSubProjects(tempArray)
        const response = await deleteSubProject(itemDetails?.id, items?.id);
        if (response?.success) {

        }
        else {
            setErrorMessage(response?.error)
            tempArray[index].name = items?.name;
            setSubProjects(tempArray)
        }
    }
    {/*Machines handling*/ }
    const [selectedMachine, setSelectedMachine] = useState(props?.route?.params?.machines ?? []);

    const [machineIds, setMachinesIds] = useState([]);
    const [machineValue, setMachineValue] = useState('Select Machine');
    const onSelectMachine = (items) => {
        if (items?.name.trim().length == 0) {
            setErrorMessage("Can not add empty sub projects name")
        }
        else if (name.trim().length == 0) {
            setErrorMessage("Please enter project name first")
        }
        else {
            let tempArray = [...selectedMachine];
            let tempArrayIds = [...machineIds]
            const index = tempArray.findIndex(item => item.id == items?.id);
            if (index != -1) {
                tempArray[index].name = items?.name
                tempArrayIds[index] = tempArrayIds.push(firestore().collection('Machines').doc(items?.id))
            }
            else {
                let object = {
                    id: items?.id,
                    name: items?.name
                }
                tempArray.push(object);
                tempArrayIds.push(firestore().collection('Machines').doc(items?.id))
            }
            setMachinesIds(tempArrayIds)
            setSelectedMachine(tempArray)
            setMachineValue(items?.name)
        }
    }
    const onPressCrossIconMacine = (items) => {

        let tempArray = [...selectedMachine];
        const index = tempArray.findIndex(item => item.id == items.id);
        if (index != -1) {
            tempArray.splice(index, 1)
        }
        setSelectedMachine(tempArray);
        if (tempArray.length == 0) {
            setMachineValue('Select Machine')
        }
    }
    const [status, setStatus] = useState(itemDetails?.status);
    const statusOptions = ['open', 'close']
    {/* Add Project Function*/ }
    const handlToAddProject = async () => {
        setBtnLoader(true);
        if (name.trim() === '' || subProjects.length == '' || selectedMachine.length == 0) {
            setBtnLoader(false)
            setErrorMessage("Please enter all filelds");
        }
        else if (status == 'Select Status') {
            setBtnLoader(false)
            setErrorMessage("Please enter all filelds");
        }
        else {
            let payload = {
                id: itemDetails?.id,
                name,
                status: status,
                addedBy: itemDetails?.addedBy,
                createdAtDate: dayjs().format('dddd MMMM YYYY'),
                machines: machineIds,
                companyName: user?.companyName,
                createdAt: dayjs().valueOf()
            }
            let subPayLoad = {
                subProjects
            }
            const response = await addProject(payload, subPayLoad);
            if (response?.success) {
                setBtnLoader(false);
                let finalPayLoad = {
                    id: itemDetails?.id,
                    name,
                    status: 'open',
                    machines: machineIds,
                    createdAt: dayjs().valueOf(),
                    subProjects: subProjects
                }
                dispatch(addProjects(finalPayLoad))
                setTimeout(() => {
                    setSuccessMessage('Project Updated successfully')
                }, 1000);
                props.navigation.navigate('ManageProjects')
            }
            else {
                setBtnLoader(false);
                setErrorMessage(response?.error ?? "Somthing went wrong")
            }
        }
    };
    const handleProjectId = () => {
        if (selectedMachine?.length > 0) {
            let tempArray = [];
            selectedMachine.forEach((item) => {
                id = firestore().collection('Machines').doc(item?.id);
                tempArray.push(id);
            });
            setMachinesIds([...tempArray])
        }
        else {
            setMachinesIds([])
        }
    }
    useEffect(() => {
        handleProjectId()
    }, [selectedMachine])
    return (
        <ScreenWrapper statusBarColor={AppColors.white}
            scrollEnabled headerUnScrollable={() => (
                <Header
                    title={'Edit Project'}
                    onPress={() => props.navigation.goBack()}
                />
            )}
        >
            <View style={styles.mainViewContainer}>
                <InputFiled
                    label={'Project Name'}
                    value={name}
                    placeholder={'Enter Project Name'}
                    onChangeText={(val) => setName(val)}
                />
                <InputFiled
                    label={'Sub Projects '}
                    value={subProjectName}
                    placeholder={'Enter Sub Project Name'}
                    onChangeText={(val) => setSubProjectsName(val)}
                    rightIcon
                    rightIconType={'Add'}
                    onPressAdd={() => onPressAdd(subProjectName)}
                />
                {
                    subProjects?.length > 0 &&
                    (
                        <View style={styles.multipleSelectContainer}>
                            {
                                subProjects.map((item, index) => {
                                    return (
                                        <View style={styles.subWrapper}
                                            key={String(index)}
                                        >
                                            <View style={styles.subjectContainer}>
                                                <Text numberOfLines={1} style={styles.itemNameSamller}>
                                                    {item?.name}
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.crossIconContainer}
                                                onPress={() => onPressCrossIcon(item)}>
                                                <Entypo
                                                    name={'circle-with-cross'}
                                                    size={width(5)}
                                                    color={AppColors.black}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }
                                )
                            }
                        </View>
                    )
                }
                <Dropdown
                    label={'Select Machines'}
                    options={machineOptions}
                    defaultValue={machineValue}
                    onSelect={(val) => onSelectMachine(val)}
                    dropDownStyle={machineOptions?.length < 3 && ({ height: height(machineOptions?.length * 5) })}
                />
                {
                    selectedMachine?.length > 0 &&
                    (
                        <View style={styles.multipleSelectContainer}>
                            {
                                selectedMachine.map((item, index) => {
                                    return (
                                        <View style={styles.subWrapper}
                                            key={String(index)}
                                        >
                                            <View style={styles.subjectContainer}>
                                                <Text numberOfLines={1} style={styles.itemNameSamller}>
                                                    {item?.name}
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.crossIconContainer}
                                                onPress={() => onPressCrossIconMacine(item)}>
                                                <Entypo
                                                    name={'circle-with-cross'}
                                                    size={width(5)}
                                                    color={AppColors.black}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }
                                )
                            }

                        </View>
                    )
                }
                <Dropdown
                    label={'Select Status'}
                    options={statusOptions}
                    defaultValue={status}
                    arryObject={false}
                    onSelect={(val) => setStatus(val)}
                    dropDownStyle={styles.dropDownStyle}
                />
                <Button title="Submit" containerStyle={styles.containerStyle}
                    isLoading={btnLoader} onPress={handlToAddProject}
                />

            </View>
        </ScreenWrapper>
    );
}
