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
        elevation:5,
        shadowColor: AppColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        paddingVertical: height(2),
        paddingHorizontal: width(2),
        marginVertical: height(0.5)
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
        fontSize: width(3),
        color: AppColors.black
    },
    changeStatusTextStyle: {
        textAlign: 'justify',
        fontSize: width(3),
        color: AppColors.green
    },
    containerStyle: {
        marginTop:height(2)
    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerStyleAbsolute: {
        position:'absolute',
        bottom:height(2)
     },
    subProjectMainContainer: {
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: AppColors.lightGreen,
        marginVertical:height(0.3),
        paddingVertical:height(1),
        paddingHorizontal:width(2),
        borderRadius:width(2)
    }
});
export default styles;
