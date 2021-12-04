import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension';
const styles = StyleSheet.create({
    timeMainContainer: {
        width: width(90),
        alignSelf: 'center',
        paddingHorizontal: width(3),
        paddingVertical: height(2),
        backgroundColor: AppColors.lightGray,
        borderRadius: width(3)
    },
    dateText: {
        color: AppColors.black,
        fontSize: width(3.5),
        fontWeight: 'bold'
    },
    timeText: {
        color: AppColors.green,
        fontSize: width(5),
        marginTop: height(0.9)
    },
    checkInTimeText: {
        color: AppColors.black,
        fontSize: width(3),
        fontWeight: 'bold'
    },
    hoursText: {
        color: AppColors.black,
        fontSize: width(3.2),
        marginTop: height(0.8)
    },
    bottomContainer: {
        marginTop: height(3),
        width: width(84),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timeContainer: {
        width: width(56)
    },
    checkInBtn: {
        width: width(28),
        height: height(5.5),
        borderRadius: width(5),
    }
});
export default styles;
