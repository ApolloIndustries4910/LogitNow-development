import React from 'react';
import {View,Pressable} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from '../../utills/AppColors';
const ModalWrapper = ({children, isVisible, onClose, containerStyle}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalContainer}
      backdropColor={'transparent'}
      onBackdropPress={onClose}
      avoidKeyboard={true}>
      <View>
        <Pressable>
          <LinearGradient
            colors={[AppColors.white20, '#E5E2E2', '#CBCBCB']}
            style={styles.shadow}
          />
        </Pressable>
        <View
          style={[
            styles.modalInnerContainer,
            containerStyle ? containerStyle : {},
          ]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalWrapper;
