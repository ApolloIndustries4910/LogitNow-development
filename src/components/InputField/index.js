import React from 'react';
import {Text, TouchableOpacity, TextInput, View, Platform} from 'react-native';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {width} from 'react-native-dimension';
export default InputField = React.forwardRef(
  (
    {
      label = '',
      placeholder = '',
      value,
      onChangeText,
      rightIcon = false,
      rightIconType = 'visible',
      keyboardType,
      returnKeyType = 'default',
      secureTextEntry,
      onPressVisibile,
      editable = true,
      defaultValue = '',
      numoflines,
      multiline = false,
      onSubmit,
      onPress,
      onPressAdd,
      containerStyle = {},
      touchableInput =false
        
    },
    ref,
  ) => {
    if (!touchableInput) {
      return (
        <TouchableOpacity
          style={styles.textInputMainContainer}
          activeOpacity={1}
          onPress={onPress}>
          <Text style={styles.inputLable}>{label}</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={!multiline ? styles.textInput : styles.textInputMultiLine}
              placeholder={placeholder}
              placeholderTextColor={AppColors.gray}
              value={value}
              selectionColor={AppColors.black}
              textAlignVertical={'top'}
              onChangeText={onChangeText}
              defaultValue={defaultValue}
              keyboardType={
                keyboardType
                  ? keyboardType
                  : Platform.OS === 'ios'
                  ? 'ascii-capable'
                  : 'visible-password'
              }
              returnKeyType={returnKeyType}
              ref={ref}
              multiline={multiline}
              onSubmitEditing={onSubmit}
              editable={editable}
              numberOfLines={numoflines}
              minHeight={
                Platform.OS === 'ios' && numoflines ? 20 * numoflines : null
              }
              secureTextEntry={secureTextEntry}
            />
            {rightIcon && (
              <View style={styles.rightIconContainer}>
                {rightIconType == 'visible' ? (
                  <MaterialIcons
                    name={secureTextEntry ? 'visibility' : 'visibility-off'}
                    color={AppColors.black}
                    size={width(4)}
                    onPress={onPressVisibile}
                  />
                ) : rightIconType == 'Add' ? (
                  <TouchableOpacity
                    style={styles.addContainer}
                    activeOpacity={1}
                    onPress={onPressAdd}>
                    <Text style={styles.addText}>Add</Text>
                  </TouchableOpacity>
                ) : (
                  <AntDesign
                    name={'clockcircleo'}
                    color={AppColors.black}
                    size={width(4)}
                  />
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={onPress} style={[styles.pressableInput, containerStyle]}>
          <Text style={styles.inputLable}>{label}</Text>
          <View style={styles.textInputContainerPressable}>
            <View style={styles.textInputPressable}>
              <Text>{label}</Text>
            </View>
            {rightIcon && (
              <View style={styles.rightIconContainer}>
                {rightIconType == 'visible' ? (
                  <MaterialIcons
                    name={secureTextEntry ? 'visibility' : 'visibility-off'}
                    color={AppColors.black}
                    size={width(4)}
                    onPress={onPressVisibile}
                  />
                ) : rightIconType == 'Add' ? (
                  <TouchableOpacity
                    style={styles.addContainer}
                    activeOpacity={1}
                    onPress={onPressAdd}>
                    <Text style={styles.addText}>Add</Text>
                  </TouchableOpacity>
                ) : (
                  <AntDesign
                    name={'clockcircleo'}
                    color={AppColors.black}
                    size={width(4)}
                  />
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    }
  },
);
