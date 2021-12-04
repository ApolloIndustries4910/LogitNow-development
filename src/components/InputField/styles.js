import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {width, height} from 'react-native-dimension';

const styles = StyleSheet.create({
  textInputMainContainer: {
    width: width(90),
    alignSelf: 'center',
    backgroundColor: AppColors.lightGray,
    paddingHorizontal: width(3),
    borderRadius: width(3),
    marginVertical: height(1.3),
  },
  inputLable: {
    fontSize: width(3.5),
    color: AppColors.green,
    marginTop: height(1),
    fontWeight: 'bold',
    marginLeft: width(0.7),
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width(84),
  },
  textInputContainerPressable: {
    flexDirection: 'row',
    width: width(80),
    justifyContent: 'center'
  },
  textInput: {
    flex: 1,
    alignSelf: 'center',
    fontSize: width(3.2),
    // backgroundColor:AppColors.red,
    alignItems: 'center',
    height: height(6),
    color: AppColors.black,
  },
  textInputPressable: {
    flex: 1,
    alignSelf: 'center',
    fontSize: width(3.2),
    justifyContent: 'center',
    paddingBottom: height(0.5),
    height: height(6),
    color: AppColors.black,
  },
  textInputMultiLine: {
    flex: 1,
    alignSelf: 'center',
    fontSize: width(3.2),
    color: AppColors.black,
    // height: height(10),
  },
  rightIconContainer: {
    width: width(10),
    alignItems: 'center',
  },
  addContainer: {
    width: '100%',
    paddingVertical: height(0.4),
    backgroundColor: AppColors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width(2),
  },
  addText: {
    fontSize: width(3.2),
    color: AppColors.black,
  },
  pressableInput: {
    width: width(84),
    backgroundColor: AppColors.lightGray,
    alignSelf: 'center',
    borderRadius: width(3),
    paddingHorizontal: width(2)
  },
});
export default styles;
