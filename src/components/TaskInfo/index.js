import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { width } from 'react-native-dimension';
import Feather from 'react-native-vector-icons/Feather';
import AppColors from '../../utills/AppColors';
import styles from './styles';
const TaskInfo = ({
    item, onPressEdit
}) => {
    const B = (props) => <Text style={{
        fontWeight: 'bold', color: AppColors.black,
        fontSize: width(3.5),
    }}>{props.children}</Text>
    return (
        <View style={styles.timeMainContainer}>
            <Text style={styles.nameText}><B>Project Name </B>: {item?.projectName}</Text>
            <Text style={styles.nameText}><B>Sub Project Name </B>: {item?.subProject}</Text>
            <Text style={styles.nameText}><B>Machine Name </B>: {item?.machineName}</Text>
            <Text style={styles.descriptionText}>{item?.description}</Text>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomContainerLeft}>
                    <Text style={styles.timeLabel}>Start Time</Text>
                    <Text style={styles.time}>{item?.startTime}</Text>
                </View>
                <View style={styles.innerBottomContainer}>
                    <Text style={styles.timeLabel}>End Time</Text>
                    <Text style={styles.time}>{item?.endTime}</Text>
                </View>
                <View style={styles.innerBottomRightContainer}>
                    <TouchableOpacity style={styles.editWrapper}
                        activeOpacity={1} onPress={onPressEdit}
                    >
                        <Feather
                            name={'edit'}
                            color={AppColors.white}
                            size={width(4)}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

export default TaskInfo;
