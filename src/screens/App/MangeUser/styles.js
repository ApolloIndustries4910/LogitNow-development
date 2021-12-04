import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';
const styles = StyleSheet.create({
    mainViewContainer: {
        flex: 1,
    },
    tabContainer: {
        width: width(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width(12),
        paddingVertical: height(1)
    },
    innerContainerTabActive: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: width(0.5),
        borderBottomColor: AppColors.green,
        paddingHorizontal:width(2),
        paddingVertical:height(2)
    },
    innerContainerTabInActive: {
        paddingVertical:height(2),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: width(0.5),
        paddingHorizontal:width(2),
        borderBottomColor: AppColors.transparent
    },
    itemContainer: {
        width: width(90),
        flexDirection: 'row',
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
        // paddingHorizontal: width(2),
        marginVertical: height(0.5)
    },
    itemContainerInvitation: {
        width: width(90),
        alignItems:'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: width(3),
        backgroundColor: AppColors.white,
        elevation: 5,
        shadowColor: AppColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        paddingVertical: height(2),
        // paddingHorizontal: width(2),
        marginVertical: height(0.5)
    },
    innerContainerFirst: {
        width: width(20),
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    innerContainer: {
        width: width(20),
        justifyContent: 'flex-start',
    },
    innerContainerEmail: {
        width: width(46),
        justifyContent: 'flex-start',
    },
    rightContainer: {
        width: width(26),
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        textAlign: 'justify',
        fontSize: width(3)
    },
    header: {
        textAlign: 'justify',
        fontSize: width(3),
        fontWeight: 'bold'
    },
    headerTab: {
        fontSize: width(3.5),
        fontWeight: 'bold'
    },
    containerStyle: {
        marginTop: height(2)
    },
    containerStyleAbsolute: {
        position: 'absolute',
        bottom: height(2)
    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        width: width(12),
        alignItems: 'center',
        justifyContent: 'center'
    },
});
export default styles;
