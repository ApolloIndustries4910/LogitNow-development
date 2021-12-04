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
        borderRadius: width(3),
        marginTop: height(2)
    },
    nameText: {
        color: AppColors.black,
        fontSize: width(3.5),
    },
    descriptionText: {
        fontSize: width(3),
        color: AppColors.gray,
        marginTop: height(0.5)
    },
    bottomContainer: {
        marginTop: height(3),
        width: width(84),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomContainerLeft: {
        width: width(28),
    },
    innerBottomContainer: {
        width: width(28),
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerBottomRightContainer: {
        width: width(28),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    editWrapper: {
        height: width(10),
        width: width(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: width(5),
        backgroundColor: AppColors.green
    },
    timeLabel: {
        color: AppColors.black,
        fontSize: width(3.2),
        fontWeight: 'bold'
    },
    time: {
        color: AppColors.black,
        fontSize: width(3.2),
        marginTop: height(0.5)
    }
});
export default styles;
