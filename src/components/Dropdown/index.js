import React, { useState, useRef } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import styles from './styles';
import ModalDropdown from 'react-native-modal-dropdown';
import { height, totalSize, width } from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import AppColors from '../../utills/AppColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Dropdown = (
  { options, onSelect, containerStyles = {}, label, defaultValue, dropDownStyle = {}, mainInputStyle = {},
    onDropdownWillShow, onDropdownWillHide, dropdwonDisPlay = false,arryObject = true }) => {
  const dropdownRef = useRef(null); 
  return (
    <View
      style={[styles.textInputMainContainer, containerStyles ? containerStyles : {}]}>
      <Text style={styles.inputLable}>{label}</Text>
      <ModalDropdown
        ref={dropdownRef}
        saveScrollPosition={false}
        defaultValue={defaultValue}
        options={options}
        dropdownStyle={[
          styles.dropDown,
          dropDownStyle,
          containerStyles,
        ]}
        onDropdownWillShow={onDropdownWillShow}
        onDropdownWillHide={onDropdownWillHide}
        textStyle={{ color: AppColors.black }}
        showsVerticalScrollIndicator={false}
        onSelect={onSelect}
        renderRow={(option) => {
          return (
            <TouchableHighlight underlayColor={'transparent'} style={styles.dropDownItemContainer}
              onPress={() => {
                if (arryObject) {
                  onSelect(option)
                }
                else {
                  onSelect(option)
                }
                dropdownRef.current.hide()
              }}>
              <Text style={styles.dropDownItemText}>{arryObject ? option?.name : option}</Text>
            </TouchableHighlight>
          );
        }}>
        <View style={[styles.container, mainInputStyle]}>
          <View style={styles.leftContainer}>
            <Text
              style={[defaultValue == 'Select Machine' ? styles.selectedValueDefault : styles.selectedValueText]}>
              {defaultValue}
            </Text>
          </View>
          <View style={styles.rightIconContainer}>
            <AntDesign
              name="caretdown"
              size={width(3)}
              color={AppColors.black}
            />
          </View>
        </View>
      </ModalDropdown>
    </View>
  );
};
export default Dropdown;
