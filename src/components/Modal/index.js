import React from 'react';
import { Text, View } from 'react-native';
import Button from '../Button';
import ModalWrapper from '../ModalWrapper';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import InputField from '../InputField';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
export const CheckOutConfirmationModal = ({
    isVisible,
    onClose,
    date = '',
    hour = '',
    onPressCheckOut,
    onPressNotNow
}) => {
    return (
        <ModalWrapper isVisible={isVisible} onClose={onClose}>
            <Text style={styles.alertText}>You are about to check out</Text>
            <Text style={styles.checkOutDetail}>Your check out time will be</Text>
            <View style={styles.dateInfoContainer}>
                <Text style={styles.dateText}>{date}</Text>
                <Text style={styles.hourText}>{hour}</Text>
            </View>
            <Button
                title={'Check Out'}
                containerStyle={styles.containerStyleCheckOut}
                onPress={onPressCheckOut}
            />
            <Button
                title={'Not Now'}
                onPress={onPressNotNow}
                textStyle={styles.textStyle}
                containerStyle={styles.containerStyleNotNow}
            />
        </ModalWrapper>
    );
};

export const CheckOutDoneModal = ({
    isVisible,
    onClose,
    onPressContinue,
    onPressLogOut,
    continueLoder = false
}) => {
    return (
        <ModalWrapper isVisible={isVisible} onClose={onClose}>
            <Feather
                name={'check-circle'}
                color={AppColors.green}
                size={width(12)}
                style={styles.checkOut}
            />
            <Text style={styles.confirmationText}>Your Logs for Today has been Saved</Text>
            <Button
                title={'Continue'}
                containerStyle={styles.containerStyleContinue}
                onPress={onPressContinue}
                isLoading={continueLoder}
            />
            <Button
                title={'Log Out'}
                onPress={onPressLogOut}
                textStyle={styles.textStyle}
                containerStyle={styles.containerStyleLogOut}
            />
        </ModalWrapper>
    );
};

//Forgot Password modal
export const ForgotPasswdModal = ({ isVisible, onClose,
    onChangeText, value = '', onPress, isLoading = false, error = ''
}) => {
    return (
        <Modal isVisible={isVisible} backdropOpacity={0.4}
            onBackdropPress={onClose}
            style={styles.maodlMainContainerForgotPaswd}
        >
            <View style={styles.forgotPaswdMainContainer}>
                <InputField
                    placeholderColor={AppColors.gray}
                    placeholder={'Enter You Email'}
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={'email-address'}
                    label={'Email'}
                />
                {
                    error?.length > 0 ?
                        <Text style={styles.errorText}>{error}</Text>
                        :
                        <Text style={styles.emptyText}>Empty Message</Text>
                }
                <Button
                    title={'Continue'}
                    containerStyle={styles.btnContainerStyle}
                    onPress={onPress}
                    isLoading={isLoading}
                />
            </View>
        </Modal>
    );
};
//Sure Modal
export const SureModal = ({ isVisible, onClose, onPressYes, text = "", loader = false }) => {
    return (
        <Modal isVisible={isVisible}
            style={styles.sureModalContainer}
            animationInTiming={500}
            backdropOpacity={0.4}
            onBackdropPress={onClose}
        >
            <View style={styles.sureModalView}>
                <View style={styles.sureIconView}>
                    <MaterialCommunityIcons name='exclamation-thick' size={width(9)} color={AppColors.black} />
                </View>
                <Text style={styles.sureText}>Are you sure {text}?</Text>
                <View style={styles.sureButtonContainer}>
                    <Button containerStyle={styles.yesNoButton} title='Yes' textStyle={styles.yeNoText}
                        onPress={onPressYes} isLoading={loader}
                    />
                    <Button containerStyle={styles.yesNoButton} title='No' textStyle={styles.yeNoText}
                        onPress={onClose}
                    />
                </View>
            </View>
        </Modal>
    )
}

//Sure Modal
export const SelectionModal = ({ isVisible, onClose, onPressAdmin, onPressUser, adminBtnLoader, userBtnLoader }) => {
    return (
        <Modal isVisible={isVisible}
            style={styles.selectionModalContainer}
            animationInTiming={1000}
            backdropOpacity={0.5}
            onBackdropPress={onClose}
            animationOutTiming={1000}
        >
            <View style={styles.selectionMainContainer}>
                <Button containerStyle={styles.btnContainer} title='Sign Up As Admin' textStyle={styles.yeNoText}
                    onPress={onPressAdmin} isLoading={adminBtnLoader}
                />
                <Button containerStyle={styles.btnContainer} title='Sign Up As User' textStyle={styles.yeNoText}
                    onPress={onPressUser} isLoading={userBtnLoader}
                />
            </View>
        </Modal>
    )
}

//Pdf Report Modal
export const PdfReportModal = ({ isVisible, onClose,
    fromDateValue = '', onChangeTextFromDate,  isLoading = false,  onPressFromDate,
    onPressDownload,onChangeTextEndDate,endDateValue='',onPressEndDate
}) => {
    return (
        <Modal isVisible={isVisible} backdropOpacity={0.4}
            onBackdropPress={onClose}
            style={styles.maincontainerPdf}
        >
            <View style={styles.forgotPaswdMainContainer}>
                <Text style={styles.headerText}>Report in PDF</Text>
                <InputField
                    placeholderColor={AppColors.gray}
                    onChangeText={onChangeTextFromDate}
                    value={dayjs(fromDateValue).format('dddd, DD MMMM YYYY')}
                    label={dayjs(fromDateValue).format('dddd, DD MMMM YYYY')}
                    rightIcon
                    rightIconType={'clock'}
                    editable={false}
                    onPress={onPressFromDate}
                    containerStyle={{marginBottom: height(1.5)}}
                    touchableInput
                />
                <InputField
                    onChangeText={onChangeTextEndDate}
                    value={dayjs(endDateValue).format('dddd, DD MMMM YYYY')}
                    label={dayjs(endDateValue).format('dddd, DD MMMM YYYY')}
                    rightIcon
                    rightIconType={'clock'}
                    editable={false}
                    onPress={onPressEndDate}
                    containerStyle={{marginBottom: height(1.5)}}
                    touchableInput
                />
                <Button
                    title={'Download'}
                    containerStyle={styles.btnContainerStyle}
                    onPress={onPressDownload}
                    isLoading={isLoading}
                />
            </View>
        </Modal>
    );
};
