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
import { addMachines, addProject } from '../../../Services/App';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import { height, width } from 'react-native-dimension';
import { addProjects } from '../../../Redux/Actions/Projects';
export default function AddProjects(props) {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const machines = useSelector((state) => state.Machines.machines);
    const user = useSelector((state) => state.Auth.user);
    const setErrorMessage = (errMessage = '') => {
        showMessage({
            message: 'Error',
            description: errMessage,
            type: 'danger',
            duration: 2000
        });
    };
    const [machineOptions, setMachineOptions] = useState([])
    const setSuccessMessage = (message = '') => {
        showMessage({
            message: 'Success',
            description: message,
            type: 'success',
        });
    };
    useEffect(() => {
        handleMachines()
    }, [machines])
    const handleMachines = () => {
        let availableMachinses = [];
        machines?.forEach(item => {
            if (item?.isAvialable) {
                availableMachinses.push(item)
            }
        });
        setMachineOptions(availableMachinses)
    }
    const [btnLoader, setBtnLoader] = useState(false);
    {/* Sub Project handling */ }
    const [subProjectName, setSubProjectsName] = useState('');
    const [subProjects, setSubProjects] = useState([]);

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
    const onPressCrossIcon = (name) => {
        let tempArray = [...subProjects];
        const index = tempArray.findIndex(item => item.name == name);
        if (index != -1) {
            tempArray.splice(index, 1)
        }
        setSubProjects(tempArray)
    }
    {/*Machines handling*/ }
    const [selectedMachine, setSelectedMachine] = useState([]);
    const [machineIds, setMachinesIds] = useState([])
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
                tempArrayIds[index] = firestore().collection('Machines').doc(items?.id);
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
    const onPressCrossIconMacine = (name) => {
        let tempArray = [...selectedMachine];
        let tempArrayId = [...machineIds];
        const index = tempArray.findIndex(item => item.name == name);
        if (index != -1) {
            tempArray.splice(index, 1)
            tempArrayId.splice(index, 1)
        }
        setSelectedMachine(tempArray);
        setMachinesIds(tempArrayId)
        if (tempArray.length == 0) {
            setMachineValue('Select Machine')
        }
    }
    {/* Add Project Function*/ }
    const [status, setStatus] = useState('Select Status');
    const statusOptions = ['open', 'close']
    const handlToAddProject = async () => {
        try {
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
                const projectId = firestore().collection('Random').doc()?.id;
                let payload = {
                    id: projectId,
                    name,
                    addedBy: user?.id,
                    companyName: user?.companyName,
                    status: status,
                    machines: machineIds,
                    createdAtDate: dayjs().format('dddd MMMM YYYY'),
                    createdAt: dayjs().valueOf()
                }
                let subPayLoad = {
                    subProjects
                }
                const response = await addProject(payload, subPayLoad);
                if (response?.success) {
                    setBtnLoader(false);
                    let finalPayLoad = {
                        id: projectId,
                        name,
                        status: status,
                        machines: machineIds,
                        createdAt: dayjs().valueOf(),
                        subProjects: subProjects
                    }
                    dispatch(addProjects(finalPayLoad))
                    setTimeout(() => {
                        setSuccessMessage('Project added successfully')
                    }, 1000);
                    props.navigation.navigate('ManageProjects')
                }
                else {
                    setBtnLoader(false);
                    setErrorMessage(response?.error ?? "Somthing went wrong")
                }
            }
        } catch (error) {
            console.log(error)
        }


    };

    return (
        <ScreenWrapper statusBarColor={AppColors.white}
            scrollEnabled headerUnScrollable={() => (
                <Header
                    title={'Add Project'}
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
                                                onPress={() => onPressCrossIcon(item?.name)}>
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
                                                onPress={() => onPressCrossIconMacine(item?.name)}>
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
                <Button title="Add Project" containerStyle={styles.containerStyle}
                    isLoading={btnLoader} onPress={handlToAddProject}
                />

            </View>
        </ScreenWrapper>
    );
}
