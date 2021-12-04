import React, { } from 'react';
import { Text, View } from 'react-native';
import Button from '../Button';
import styles from './styles';
import dayjs from 'dayjs'
import { useSelector } from 'react-redux';
const DateTimeInfo = ({
    date = '',
    startTime = '',
    time = '',
    onPressRighBtn,
    btnTitle,
    statusChangeBtnLoader,
    differTime
}) => {
    const currentDate = useSelector((state) => state.Log.currentDate);
    return (
        <View style={styles.timeMainContainer}>
            <Text style={styles.dateText}>{date}</Text>
            {
                dayjs(currentDate).format('dddd, DD MMMM YYYY') == dayjs().format('dddd, DD MMMM YYYY') && (
                    <>
                        <Text style={styles.timeText}>{dayjs(startTime).format('hh:mm A')}</Text>
                        <View style={styles.bottomContainer}>
                            <View style={styles.timeContainer}>
                                {
                                    btnTitle != 'Check In' && (
                                        <>
                                            <Text style={styles.checkInTimeText}>Check In Time</Text>
                                            <Text style={styles.hoursText}>{`${dayjs(time).format('hh:mm A')} ${differTime != '' ? differTime : ''}`}</Text>
                                        </>
                                    )
                                }
                            </View>
                            <Button title={btnTitle} onPress={onPressRighBtn}
                                containerStyle={styles.checkInBtn}
                                isLoading={statusChangeBtnLoader}
                            />
                        </View>
                    </>
                )
            }
        </View>
    );
};

export default DateTimeInfo;
