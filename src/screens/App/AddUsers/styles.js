import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';
const styles = StyleSheet.create({
  mainViewContainer:{
    flex:1,
  },
  companyIdText:{
    color:AppColors.black,
    fontSize:width(3.2),
    textAlign:'center',
    marginTop:height(1)
  },
  headerContainer: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(2.9),
    alignItems: 'center',
    marginBottom: height(2.7),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rightIconContainer: {
    width: width(20),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  header: {
    color: AppColors.black,
    fontSize: width(5.5),
    fontWeight: 'bold'
  },
  buttonContainer: {
    width: width(90),
    borderRadius:width(3),
    height:height(16),
    marginVertical:height(1),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: AppColors.green
  },
  btnInnerText: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(3.5)
  },
  buttonMainContainer:{
    width:width(90),
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  }
});
export default styles;
