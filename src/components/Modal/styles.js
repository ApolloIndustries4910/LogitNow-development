import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension';

const styles = StyleSheet.create({
    alertText: {
        fontSize: width(4.7),
        color: AppColors.black,
        fontWeight: 'bold'
    },
    checkOutDetail: {
        fontSize: width(3.1),
        color: AppColors.black,
        marginTop: height(3)
    },
    dateInfoContainer: {
        width: width(70),
        alignSelf: 'center',
        paddingHorizontal: width(1),
        backgroundColor: AppColors.lightGray,
        paddingVertical: height(1.5),
        borderRadius: width(3),
        marginTop: height(0.8)
    },
    dateText: {
        color: AppColors.black,
        fontSize: width(4.3),
        fontWeight: 'bold',
        textAlign: 'center',

    },
    hourText:
    {
        color: AppColors.green,
        fontSize: width(5.2),
        textAlign: 'center',
        marginTop: height(2)
    },
    containerStyleCheckOut: {
        width: width(76),
        height: height(7),
        marginVertical: height(3)
    },
    containerStyleNotNow: {
        width: width(76),
        height: height(7),
        elevation: 0,
        backgroundColor: AppColors.lightGray
    },
    textStyle: {
        color: AppColors.black
    },

    //Styling Confirmation Done Modal
    checkOut: {
        alignSelf: 'center'
    },
    confirmationText: {
        fontSize: width(4.9),
        marginTop: height(2),
        color: AppColors.black,
        fontWeight: 'bold'
    },
    containerStyleContinue: {
        width: width(76),
        height: height(7),
        marginTop: height(5)
    },
    containerStyleLogOut: {
        width: width(76),
        height: height(7),
        marginTop: height(3),
        // elevation: 0,
        backgroundColor: AppColors.lightGray
    },
    //Syling forgot password modal
    maodlMainContainerForgotPaswd: {
        justifyContent: 'flex-end',
        margin: 0
    },
    forgotPaswdMainContainer: {
        width: width(100),
        alignSelf: 'center',
        paddingTop: height(3),
        borderTopLeftRadius: width(6),
        borderTopRightRadius: width(6),
        backgroundColor: AppColors.white,
        paddingBottom: height(2.5)
    },
    maninContainerInputField: {
        width: width(60)
    },
    errorText: {
        textAlign: 'center',
        fontSize: width(3.4),
        color: AppColors.red,
        marginBottom: height(1)
    },
    emptyText: {
        textAlign: 'center',
        fontSize: width(3.4),
        color: AppColors.transparent,
        marginBottom: height(1)
    },
    label: {
        fontSize: width(3.6),
        color: AppColors.black
    },
    btnContainerStyle: {
        width: width(70),
        height: height(7.5),
    },

    //Sure Modal
    sureModalContainer: {
        padding: 0,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sureModalView: {
        width: width(60),
        paddingBottom: height(2),
        backgroundColor: AppColors.white,
        borderRadius: width(3)
    },
    sureIconView: {
        height: width(15),
        width: width(15),
        borderRadius: width(7.5),
        backgroundColor: AppColors.white,
        alignSelf: 'center',
        marginTop: -height(3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    sureText: {
        fontSize: width(3.85),
        textAlign: 'center',
        marginTop: height(1),
        color: AppColors.black,
        width: width(50),
        alignSelf: 'center'
    },
    sureButtonContainer: {
        marginTop: height(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    yesNoButton: {
        marginHorizontal: width(3),
        width: width(22),
        height: height(5)
    },
    yeNoText: {
        fontSize: width(3.25),
    },

    //Selction modal container
    selectionModalContainer: {
        padding: 0,
        margin: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    selectionMainContainer: {
        width: width(100),
        borderTopLeftRadius: width(5),
        borderTopRightRadius: width(5),
        paddingVertical: height(3),
        backgroundColor: AppColors.white,
        borderRadius: width(3)
    },
    btnContainer:
    {
        width: width(60),
        marginVertical: height(0.5)
    },
    //Styling for pdf Modal 
    maincontainerPdf:{
        justifyContent:'flex-end',
        margin:0
    },
    headerText:{
        color:AppColors.black,
        fontWeight:'bold',
        fontSize:width(4),
        textAlign:'center',
        marginBottom:height(2)
    }
});
export default styles;
