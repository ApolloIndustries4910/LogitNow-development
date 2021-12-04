import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
  textInputMainContainer: {
    width: width(90),
    alignSelf: 'center',
    backgroundColor: AppColors.lightGray,
    borderRadius: width(3),
    marginVertical: height(1.3)
  },
  textInputMainContainerWithDropDown: {
    width: width(90),
    alignSelf: 'center',
    backgroundColor: AppColors.lightGray,
    borderTopLeftRadius: width(3),
    borderTopRightRadius: width(3),
    marginVertical: height(1.3)
  },
  inputLable: {
    fontSize: width(3.5),
    color: AppColors.green,
    marginTop: height(0.8),
    fontWeight: 'bold',
    marginLeft: width(4.7)
  },
  headingText: {
    color: AppColors.black,
    fontSize: width(3.5),
    fontWeight: 'bold',
    marginBottom: height(1),
  },
  dropDown: {
    height: height(15),
    width: width(90),
    borderRadius: width(2),
  },
  dropDownItemContainer: {
    paddingVertical: height(1),
    paddingHorizontal: width(3),
  },
  dropDownItemText: {
    fontSize: width(3.5),
    color: AppColors.black,
  },
  container: {
    width: width(90),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:height(0.8),
    paddingHorizontal: width(1)
  },
  leftContainer: {
    flex: 1,
    height: height(5.2),
    marginLeft: width(4),
    alignSelf: 'center',
    justifyContent: 'center',

  },
  selectedValueText: {
    color: AppColors.black,
    fontSize: width(3.2),
  },
  selectedValueDefault: {
    color: AppColors.gray,
    fontSize: width(3.2),
  },
  rightIconContainer: {
    width: width(6),
    height: height(5.2),
    marginRight: width(0.5)
  }
});
export default styles;
