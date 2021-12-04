import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../../utills/AppColors';
const styles = StyleSheet.create({
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
    borderRadius: width(3),
    height: height(16),
    marginVertical: height(1),
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
  buttonMainContainer: {
    width: width(90),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width(3),
    paddingVertical: height(0.6),
    borderRadius: width(2),
    maxWidth: width(70),
    alignSelf: 'center',
    marginHorizontal:width(1),
    marginVertical:height(0.5),
    backgroundColor: AppColors.lightGray,
  },
  subjectContainer: {
  },
  itemName: {
    color: AppColors.black,
    fontSize: width(4),
    maxWidth: width(55),
  },
  crossIconContainer: {
    marginLeft: width(1),
  },
  itemNameSamller: {
    color: AppColors.black,
    fontSize: width(3.5),
    maxWidth: width(40),
  },
  multipleSelectContainer: {
    width: width(90),
    alignSelf: 'center',
    // backgroundColor: AppColors.lightGray,
    alignItems:'center',
    flexWrap:'wrap',
    flexDirection:'row'
  },
  containerStyle:{
   marginTop:height(5)
  },
  dropDownStyle:{
    height:height(10)
  },

});
export default styles;
