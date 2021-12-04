import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';
const styles = StyleSheet.create({
    mainViewContainer: {
        flex: 1,
    },
    itemContainer: {
        width: width(90),
        justifyContent: 'space-between',
        alignSelf: 'center',
        borderRadius: width(3),
        backgroundColor: AppColors.white,
        elevation: 5,
        shadowColor: AppColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        paddingVertical: height(2),
        paddingHorizontal: width(2),
        marginVertical: height(0.5),
    },
    btnContainer:{
      width:width(90),
      alignSelf:'center',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-end',
      marginVertical:height(0.5)
    },
    projectContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    innerContainerFirst: {
        width: width(35),
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: width(2)
    },
    innerContainer: {
        width: width(25),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    rightContainer: {
        width: width(26),
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyleCreatedAt: {
        textAlign: 'center',
        marginVertical: height(0.3),
        fontSize: width(3),
        color: AppColors.black,
        fontWeight: 'bold'
    },
    textStyle: {
        textAlign: 'justify',
        fontSize: width(3.4),
        marginVertical: height(0.2),
        color: AppColors.black
    },

    textStyleHeading: {
        textAlign: 'justify',
        fontSize: width(3.2),
        color: AppColors.black,
        fontWeight: 'bold'
    },
    textStyleNoTask: {
        textAlign: 'center',
        fontSize: width(3.2),
        marginTop:height(1),
        color: AppColors.black,
        fontWeight: 'bold'
    },
    dateContainer: {
        width: '100%',
        marginTop: height(2)
    },
    taskContainer: {
        width: '100%',
        marginTop: height(1)
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height(1)
    },
    btnMainContainer: {
        width: width(20),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    btnMainContainerMachine: {
        width: width(20),
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    btnConatiner:
    {
        width: width(10),
        height: height(3),
        backgroundColor: AppColors.borderColor,
        margin: 0,
    },
    textStyleBtn: {
        color: AppColors.black,
        fontSize: width(3)
    },
    changeStatusTextStyle: {
        textAlign: 'justify',
        fontSize: width(3),
        color: AppColors.green
    },
    containerStyle: {
        width: width(28),
        height: height(5),
        elevation: 0,
    },
    containerStyleReport: {
        width: width(45),
        marginTop:height(1),
        height: height(6),
        elevation: 0,
    },
    containerDate: {
        width: width(50),
        height: height(5),
        elevation: 0,
    },
    containerStyleDeactivate: {
        width: width(28),
        height: height(5),
        elevation: 0,
        backgroundColor: AppColors.red
    },
    btnTitle: {
        fontSize: width(3)
    },
    containerStyleMonthReport: {
        width: width(10)
    },
    containerStyleEdit: {
        width: width(10),
    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    datePickerMainContainer: {
        position: 'absolute',
        right: width(8),
        elevation:10,
        bottom:height(10),
        width: width(15),
        height: width(13)
    },
    datePickerImage: {
        width: width(15),
        height: width(15)
      },
    subProjectMainContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppColors.green,
        marginVertical: height(0.3),
        paddingVertical: height(2),
        paddingHorizontal: width(2),
        borderRadius: width(2)
    }
});
export default styles;
