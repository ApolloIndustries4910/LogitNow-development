import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(5),
    backgroundColor: AppColors.green,
    height: height(8),
    width: width(70),
    alignSelf: 'center',
    elevation:10,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  text: {
    color: AppColors.white,
    fontSize: width(4),
  }
});
export default styles;
