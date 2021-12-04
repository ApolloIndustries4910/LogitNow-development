import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
const styles = StyleSheet.create({
    container: {
        width: width(100),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width(5),
        backgroundColor: AppColors.white,
        paddingVertical:height(2),
        borderBottomColor:AppColors.borderColor,
        borderBottomWidth:width(0.5)
    },
    iconStyle: {
        width: width(10),
    },
    emptyContainer: {
        width: width(10),
    },
    title: {
        color: AppColors.black,
        fontSize: width(4.5),
        fontWeight:'bold'
    },
    iconContainerSuffix: {
        width: width(10),
        alignItems:'flex-end'
    },
});
export default styles;
