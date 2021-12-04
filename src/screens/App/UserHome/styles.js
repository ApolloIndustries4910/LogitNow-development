import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import { color } from 'react-native-reanimated';
import AppColors from '../../../utills/AppColors';
const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.white
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
  todayTaskTextContainer: {
    width: width(90),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: height(3.2),
    marginBottom: height(2.7),
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkInTimecotainer: {
    width: width(90),
   alignSelf: 'center',
    marginTop: height(3.2),
    marginBottom: height(2.7),
    // flexDirection: 'row',
    alignItems: 'center',
    
  },
  header: {
    color: AppColors.black,
    fontSize: width(5.5),
    fontWeight: 'bold'
  },
  todayTaskText: {
    color: AppColors.black,
    fontSize: width(5),
    fontWeight: 'bold'
  },
  addTaskText: {
    fontSize: width(4),
    color: AppColors.green,
    fontWeight: 'bold'
  },
  checkInTimeText: {
    textAlign: 'left',
    fontSize: width(3.2),
    color: AppColors.black,
    fontWeight: 'bold'
  },
  imageStyle: {
    width: width(65),
    height: width(70),
    alignSelf: 'center',
    marginTop: height(2)
  },
  addBlogText: {
    color: AppColors.black,
    fontSize: width(4.2),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height(8)
  },
  containerStyleDisable: {
    marginTop: height(2),
    backgroundColor: AppColors.lightGreen,
    elevation: 0,
  },
  containerStyle: {
    marginTop: height(2),
    backgroundColor: AppColors.green,
    elevation: 0,
  },
  datePickerMainContainer: {
    position: 'absolute',
    right: width(8),
    bottom: height(10),
    width: width(15),
    height: width(13)
  },
  datePickerImage: {
    width: width(15),
    height: width(15)
  },
  emptyText: {
    textAlign: 'center',
    fontSize: width(3.5),
    color: AppColors.black
  }
});
export default styles;
