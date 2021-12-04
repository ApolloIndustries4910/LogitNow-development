import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';
const styles = StyleSheet.create({
    mainViewContainer: {
        flex: 1,
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
        paddingHorizontal: width(2),
        marginVertical: height(0.5)
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
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    btnContainer: {
        width: width(12),
        alignItems: 'center',
        justifyContent: 'center'
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
    containerStyle: {
        marginTop: height(2),
    },
    containerStyleAbsolute: {
       position:'absolute',
       bottom:height(2)
    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default styles;
