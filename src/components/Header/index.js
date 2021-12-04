import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { width } from 'react-native-dimension';
export const Header = ({ onPress, containerStyle = {}, isCross = false, title = '',
    titleStyle = {}, backArrowColor = AppColors.black, prefixIcon = true, suffixIcon = false,onPressSuffixIcon
}) => {
    return (
        <View
            style={[styles.container, containerStyle]}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.iconStyle}
            >
                {
                    prefixIcon && (
                        <MaterialIcons
                            name={isCross ? 'close' : 'keyboard-arrow-left'}
                            color={backArrowColor}
                            size={width(8)}
                        />
                    )
                }

            </TouchableOpacity>

            <Text style={[styles.title, titleStyle]}>{title}</Text>
            {
                suffixIcon ?
                    <TouchableOpacity
                        onPress={onPressSuffixIcon}
                        style={styles.iconContainerSuffix}
                        activeOpacity={1}
                    >
                        <Entypo
                            name={'log-out'}
                            size={width(6)}
                            color={AppColors.black}
                        />
                    </TouchableOpacity>
                    :
                    <View style={styles.emptyContainer} />
            }
        </View>
    );
};
