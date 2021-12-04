import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import { color } from 'react-native-reanimated';
import AppColors from '../../../utills/AppColors';
const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    backgroundColor: AppColors.white
  },
  imageStyle: {
    width: width(100),
    height: width(50)
  },
  header: {
    marginTop: height(2),
    textAlign: 'center',
    color: AppColors.black,
    fontSize: width(4.5),
    fontWeight: 'bold'
  },
  userNameText: {
    color: AppColors.black,
    fontSize: width(4.5),
    fontWeight: 'bold'
  },
  itemContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height(2),
    marginVertical: height(0.5),
    borderRadius: width(3),
    backgroundColor: AppColors.gray
  },
  itemText: {
    fontSize: width(3.2),
    color: AppColors.white,
  },
  textStyle: {
    fontSize: width(3.2),
    color: AppColors.black,
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
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default styles;
