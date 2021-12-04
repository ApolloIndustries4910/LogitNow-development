import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
const styles = StyleSheet.create({
  iconContainer: {
    borderTopColor: AppColors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height(1),
    width: width(15),
  },
  activeIconContainer: {
    borderTopColor: AppColors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height(1),
    width: width(15),
  },
  tabStyles: {
    height: height(10),
  },
  settinTab:{
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  pencilIcon:{
    position:'absolute',
    left:width(1),
    top:height(0.5)
  },
  serachIcon:{
    position:'absolute',
    left:width(3.5),
    top:height(2.5)
  }
});
export default styles;