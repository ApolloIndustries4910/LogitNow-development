import { StyleSheet } from 'react-native';
import { height } from 'react-native-dimension';
const styles = StyleSheet.create({
    mainViewContainer:{
        flex:1,
    },
    containerStyle:{
        marginTop:height(3)
    },
    dropdownStyleSingle:{
        height:height(10)
    },
    dropdownStyleSingleForSubProject:{
        height:height(10)
    },
    dropdownStyle:{
     height:height(12),
     backgroundColor:'red'
    }
});
export default styles;
