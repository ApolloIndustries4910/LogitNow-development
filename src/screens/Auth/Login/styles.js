import {StyleSheet} from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';
const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.white
  },
  firstHeader:{
   alignSelf:'center',
   color:AppColors.green,
   fontSize:width(9),
   marginVertical:height(5)
  },
  secondHeader:{
    alignSelf:'center',
    color:AppColors.black,
    fontSize:width(6.3),
    fontWeight:'bold',
    marginBottom:height(3)
  },
  containerStyle:{
    marginTop:height(2.5)
  },
  lowerContainer: {
    width: width(90),
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'center',
    paddingHorizontal:width(2),
    marginTop:height(2)
},
lowerTextStyle:
{
    color: AppColors.black,
    fontSize: width(4),
    textAlign: 'center'
},
textStyle: {
    color: AppColors.black,
    fontSize: width(4),
},
lowerTextContainer:
{
    marginBottom: height(3)
},
});
export default styles;
