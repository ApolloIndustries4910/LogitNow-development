import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension'
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
    
  },
  shadow: {
    height: height(8),
    width: width(100),
    position: 'absolute',
    top: -height(7)
  },
  modalInnerContainer: {
    backgroundColor: AppColors.white,
    borderTopRightRadius: width(8),
    borderTopLeftRadius: width(8),
    paddingVertical: height(4),
    alignItems: 'center',
  
  },
});
export default styles;
