import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import styles from './styles';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import AppColors from '../../../utills/AppColors';
import { Header } from '../../../components/Header';
import Button from '../../../components/Button';
import { SureModal } from '../../../components/Modal';
import { changeStausUser } from '../../../Services/App';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusMember } from '../../../Redux/Actions/Projects';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { PdfReportModal } from '../../../components/Modal';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
export default function UserDetail(props) {
  const itemDetails = props.route.params?.item ?? '';
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  var isBetween = require('dayjs/plugin/isBetween');
  dayjs.extend(isBetween);
  const B = (props) => (
    <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
  );
  const [curdState, setCurdState] = useState('edit');
  const [yesBtnLoader, setYesBtnLoader] = useState(false);
  const [sureModalVis, setSureModalVis] = useState(false);
  const [currentItem, setCurrentItem] = useState('');
  const [currentDate, setCurrentDate] = useState(dayjs().valueOf());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const setSuccessMessage = (message = '') => {
    showMessage({
      message: 'Success',
      description: message,
      type: 'success',
    });
  };
  const setErrorMessage = (errMessage = '') => {
    showMessage({
      message: 'Error',
      description: errMessage,
      type: 'danger',
      duration: 2000,
    });
  };
  const crudHandling = async () => {
    setYesBtnLoader(true);
    if (curdState == 'edit') {
      setSureModalVis(false), setYesBtnLoader(false);
      props.navigation.navigate('EditMachines', { item: currentItem });
    } else {
      let status = true;
      if (itemDetails?.status) {
        status = false;
      } else {
        status = true;
      }
      let payload = {
        ...itemDetails,
        status,
      };
      const response = await changeStausUser(payload);
      if (response?.success) {
        setYesBtnLoader(false);
        setSureModalVis(false);
        dispatch(changeStatusMember(true));
        props.navigation.navigate('ManageUsers');
        setTimeout(() => {
          setSuccessMessage('User Status Changed SuccessFully');
        }, 1000);
      } else {
        setYesBtnLoader(false);
        setSureModalVis(false),
          setTimeout(() => {
            setErrorMessage(response?.error ?? 'Something went wrong');
          }, 1000);
      }
    }
  };
  const [btnTitle, setBtnTitle] = useState('');
  const [modalText, setModalText] = useState('');
  useEffect(() => {
    if (itemDetails?.status) {
      setBtnTitle('Deactivate User');
      setModalText('to deactivate ' + itemDetails?.name);
    } else {
      setBtnTitle('Activate User');
      setModalText('to activate ' + itemDetails?.name);
    }
  }, []);
  const [tasks, setTasks] = useState(itemDetails?.task ?? []);
  useEffect(() => {
    setTasks(itemDetails?.task);
  }, [currentDate]);
  const [pageLoading, setPageLoading] = useState(false);
  const renderItem = ({ item }) => {
    if (item?.taskDate == dayjs(currentDate).format('dddd, DD MMMM YYYY')) {
      return (
        <View style={styles.dateContainer}>
          {item?.taskDate == dayjs().format('dddd, DD MMMM YYYY') ? (
            <Text style={styles.textStyleHeading} numberOfLines={1}>
              {' '}
              Today Task
            </Text>
          ) : (
            <Text style={styles.textStyleHeading} numberOfLines={1}>
              {dayjs(currentDate).format('dddd, DD MMMM YYYY')} Task
            </Text>
          )}
          {
            item?.checkInTime ?
              <Text style={styles.textStyle} numberOfLines={1}>
                <B>Check in time :</B>
                {dayjs(item?.checkInTime).format('hh mm A')}
              </Text>
              :
              <Text style={styles.textStyle} numberOfLines={1}>
                <B>Check in time :</B>
                Nill
              </Text>
          }
          {
            item?.checkOutTime ?
              <Text style={styles.textStyle} numberOfLines={1}>
                <B>Check Out time :</B>
                {dayjs(item?.checkOutTime).format('hh mm A')}
              </Text>
              :
              <Text style={styles.textStyle} numberOfLines={1}>
                <B>Check Out time :</B>
                Nill
              </Text>
          }

          {item?.tasks?.length > 0 &&
            item?.tasks?.map((innerItem, innerIndex) => {
              return (
                <View style={styles.taskContainer} key={String(innerIndex)}>
                  <Text style={styles.textStyle} numberOfLines={1}>
                    <B>Company Name :</B>
                    {innerItem?.companyName}
                  </Text>
                  <Text style={styles.textStyle} numberOfLines={1}>
                    <B>Task Description :</B>
                    {innerItem?.description}
                  </Text>
                  <Text style={styles.textStyle} numberOfLines={1}>
                    <B>Project : </B>
                    {innerItem?.projectName}
                  </Text>
                  <Text style={styles.textStyle} numberOfLines={1}>
                    <B>Sub Project : </B>
                    {innerItem?.subProject}
                  </Text>
                  <Text style={styles.textStyle} numberOfLines={1}>
                    <B>Machine used : </B>
                    {innerItem?.machineName}
                  </Text>
                  <Text style={styles.textStyle} numberOfLines={1}>
                    <B>Start Time: </B>
                    {innerItem?.startTime}
                  </Text>
                  <Text style={styles.textStyle} numberOfLines={1}>
                    <B>End Time: </B>
                    {innerItem?.endTime}
                  </Text>
                </View>
              );
            })}
        </View>
      );
    }
  };
  {
    /*Pdf Report Modal Values*/
  }
  const [pdfModalVis, setPdfModalVis] = useState(false);
  const [fromDate, setFromDate] = useState(dayjs().startOf('M').valueOf());
  const [endDate, setEndDate] = useState(dayjs().valueOf());
  const [fromDateModalVis, setFromDateModalVis] = useState(false);
  const [endDateModalVis, setEndDateModalVis] = useState(false);
  const [pdfBtnLoading, setPdfBtnLoading] = useState(false);
  const onPressDownLoad = async () => {
    setPdfBtnLoading(true);
    if (dayjs(endDate).diff(fromDate) < 0) {
      setPdfModalVis(false);
      setEndDateModalVis(false);
      setFromDateModalVis(false);
      setPdfBtnLoading(false);
      setErrorMessage('End date cannot be before Start Date');
    } else if (
      dayjs(endDate).format('dddd, DD MMMM YYYY') ==
      dayjs(fromDate).format('dddd, DD MMMM YYYY')
    ) {
      setPdfModalVis(false);
      setEndDateModalVis(false);
      setFromDateModalVis(false);
      setPdfBtnLoading(false);
      setErrorMessage('End date cannot be equal Start Date');
    } else {
      if (Platform.OS == 'android') {
        requestMultiple([PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
          .then(async (statuses) => {
            if (
              statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == 'granted'
            ) {
              let body = '';
              let taskExist = true;
              body = body.concat(
                `<h1 style="padding-left: 40px;">${user?.companyName}</h1>`,
              );
              body = body.concat(
                '<span style="padding: 40px">Date: ' +
                dayjs().format('dddd, DD MMMM YYYY') +
                '</span>',
              );
              tasks.map((item, i) => {
                let itemTime = dayjs(item?.checkInTime);
                console.log("Item time ",dayjs(itemTime).format('dd MMMM YYYYY'))
                if (itemTime.isBetween(fromDate, endDate)) {
                  body = body.concat('<h1></h1>');
                  body = body.concat(
                    '<table style="padding-left: 40px;padding-top: 15px"><tr><td>Check In</td>',
                  );
                  body = body.concat(
                    '<td style="padding-left: 15px;">' +
                    dayjs(item?.checkInTime).format(
                      'dddd, DD MMMM YYYY hh mm A',
                    ) +
                    '</td></tr><tr><td>Check Out.</td>',
                  );
                  if (item?.checkOutTime) {
                    body = body.concat(
                      '<td style="padding-left: 15px;">' +
                      dayjs(item?.checkOutTime).format(
                        'dddd, DD MMMM YYYY hh mm A',
                      ) +
                      '</td></tr><tr></tr></table >',
                    );
                  }
                  else {
                    body = body.concat(
                      '<td style="padding-left: 15px;">' +
                      'Nill' +
                      '</td></tr><tr></tr></table >',
                    );
                  }
                  item?.tasks?.map((innerItem) => {
                    body = body.concat(
                      '<table style="padding-left: 40px;padding-top: 15px"><tr><td>Company Name</td>',
                    );
                    body = body.concat(
                      '<td style="padding-left: 15px;">' +
                      innerItem?.companyName +
                      '</td></tr><tr><td>Description</td>',
                    );
                    body = body.concat(
                      '<td style="padding-left: 15px;">' +
                      innerItem?.description +
                      '</td></tr><tr><td>Project Name</td>',
                    );
                    body = body.concat(
                      '<td style="padding-left: 15px;">' +
                      innerItem?.projectName +
                      '</td></tr><tr><td>Sub Project Name</td>',
                    );
                    body = body.concat(
                      '<td style="padding-left: 15px;">' +
                      innerItem?.subProject +
                      '</td></tr><tr><td>Machine Name</td>',
                    );
                    body = body.concat(
                      '<td style="padding-left: 15px;">' +
                      innerItem?.machineName +
                      '</td></tr><tr><td>Start Time</td>',
                    );
                    body = body.concat(
                      '<td style="padding-left: 15px;">' +
                      innerItem?.startTime +
                      '</td></tr><tr><td>End Time</td>',
                    );
                    body = body.concat(
                      '<td style="padding-left: 15px;">' +
                      innerItem?.endTime +
                      '</td></tr></table >',
                    );
                  });
                } else {
                  taskExist = false;
                }
              });
              if (taskExist) {
                let options = {
                  html: body,
                  fileName: `${user?.companyName}` + dayjs().format(),
                  directory: 'Documents',
                };
                // console.log("Optons here ", options)
                const pdf = await RNHTMLtoPDF.convert(options);
                console.log('Pdf here  ', pdf);
                setEndDateModalVis(false);
                setPdfBtnLoading(false);
                setPdfModalVis(false);
                setTimeout(() => {
                  setSuccessMessage('Saved at File' + `/${options.directory}`);
                }, 2000);
              } else {
                setEndDateModalVis(false);
                setFromDateModalVis(false);
                setPdfBtnLoading(false);
                setPdfModalVis(false);
                setErrorMessage('Task not exist during these duration');
              }
              // checkPermission(pdf?.filePath)
            }
          })
          .catch((error) => {
            setPdfBtnLoading(false);
            setErrorMessage(error?.message ?? "Something went wrong")
            console.log(error);
          });
      } else {
        let body = '';
        let taskExist = true;
        body = body.concat(
          `<h1 style="padding-left: 40px;">${user?.companyName}</h1>`,
        );
        body = body.concat(
          '<span style="padding: 40px">Date: ' +
          dayjs().format('dddd, DD MMMM YYYY') +
          '</span>',
        );
        tasks.map((item, i) => {
          let itemTime = dayjs(item?.checkOutTime);
          if (itemTime.isBetween(fromDate, endDate)) {
            body = body.concat('<h1></h1>');
            body = body.concat(
              '<table style="padding-left: 40px;padding-top: 15px"><tr><td>Check In</td>',
            );
            body = body.concat(
              '<td style="padding-left: 15px;">' +
              dayjs(item?.checkInTime).format('dddd, DD MMMM YYYY hh mm A') +
              '</td></tr><tr><td>Check Out Yime.</td>',
            );
            body = body.concat(
              '<td style="padding-left: 15px;">' +
              dayjs(item?.checkOutTime).format('dddd, DD MMMM YYYY hh mm A') +
              '</td></tr><tr></tr></table >',
            );
            item?.tasks?.map((innerItem) => {
              body = body.concat(
                '<table style="padding-left: 40px;padding-top: 15px"><tr><td>Company Name</td>',
              );
              body = body.concat(
                '<td style="padding-left: 15px;">' +
                innerItem?.companyName +
                '</td></tr><tr><td>Description</td>',
              );
              body = body.concat(
                '<td style="padding-left: 15px;">' +
                innerItem?.description +
                '</td></tr><tr><td>Project Name</td>',
              );
              body = body.concat(
                '<td style="padding-left: 15px;">' +
                innerItem?.projectName +
                '</td></tr><tr><td>Sub Project Name</td>',
              );
              body = body.concat(
                '<td style="padding-left: 15px;">' +
                innerItem?.subProject +
                '</td></tr><tr><td>Machine Name</td>',
              );
              body = body.concat(
                '<td style="padding-left: 15px;">' +
                innerItem?.machineName +
                '</td></tr><tr><td>Start Time</td>',
              );
              body = body.concat(
                '<td style="padding-left: 15px;">' +
                innerItem?.startTime +
                '</td></tr><tr><td>End Time</td>',
              );
              body = body.concat(
                '<td style="padding-left: 15px;">' +
                innerItem?.endTime +
                '</td></tr></table >',
              );
            });
          } else {
            taskExist = false;
          }
        });
        if (taskExist) {
          let options = {
            html: body,
            fileName: `${user?.companyName}` + dayjs().format(),
            directory: 'Documents',
          };
          // console.log("Optons here ", options)
          const pdf = await RNHTMLtoPDF.convert(options);
          console.log('Pdf here  ', pdf);
          setEndDateModalVis(false);
          setPdfBtnLoading(false);
          setPdfModalVis(false);
          setTimeout(() => {
            setSuccessMessage('Saved at ' + `/${options.directory}`);
          }, 2000);
        } else {
          setEndDateModalVis(false);
          setFromDateModalVis(false);
          setPdfBtnLoading(false);
          setPdfModalVis(false);
          setErrorMessage('Task not exist during these duration');
        }
      }
    }
  };

  {
    /*********** */
  }
  return (
    <ScreenWrapper
      statusBarColor={AppColors.white}
      headerUnScrollable={() => (
        <Header
          title={'User Detail'}
          onPress={() => props.navigation.goBack()}
        />
      )}>
      <View style={styles.mainViewContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.textStyle} numberOfLines={1}>
            <B>User Name</B> : {itemDetails?.name}
          </Text>
          <Text style={styles.textStyle} numberOfLines={1}>
            <B>Email </B> : {itemDetails?.email}
          </Text>
          <Text style={styles.textStyle} numberOfLines={1}>
            <B>City </B> : {itemDetails?.city}
          </Text>
          {itemDetails?.status ? (
            <Text style={styles.textStyle} numberOfLines={1}>
              <B>Status</B> :Active
            </Text>
          ) : (
            <Text style={styles.textStyle} numberOfLines={1}>
              <B>Status</B> :In Active
            </Text>
          )}
          <View style={styles.footer}>
            {btnTitle == 'Deactivate User' ? (
              <Button
                title={btnTitle}
                containerStyle={styles.containerStyleDeactivate}
                textStyle={styles.btnTitle}
                onPress={() => {
                  setCurdState('delete'),
                    setCurrentItem(itemDetails),
                    setSureModalVis(true);
                }}
              />
            ) : (
              <Button
                title={btnTitle}
                containerStyle={styles.containerStyle}
                textStyle={styles.btnTitle}
                onPress={() => {
                  setCurdState('delete'),
                    setCurrentItem(itemDetails),
                    setSureModalVis(true);
                }}
              />
            )}

            <Button
              title="Edit User"
              containerStyle={styles.containerStyle}
              textStyle={styles.btnTitle}
              onPress={() =>
                props.navigation.navigate('EditUser', { item: itemDetails })
              }
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title={dayjs(currentDate).format('dddd, DD MMMM YYYY')}
            containerStyle={styles.containerDate}
            textStyle={styles.btnTitle}
            onPress={() => setIsDatePickerVisible(true)}
          />
        </View>
        <FlatList
          data={tasks}
          contentContainerStyle={styles.itemContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(item?.taskDate + index)}
          renderItem={renderItem}
          ListEmptyComponent={() =>
            pageLoading ? (
              <ActivityIndicator color={AppColors.black} size={'small'} />
            ) : (
              <Text style={styles.textStyleNoTask}>No Task found</Text>
            )
          }
          ListFooterComponent={() =>
            tasks?.length > 0 && (
              <Button
                title="Report"
                containerStyle={styles.containerStyleReport}
                textStyle={styles.btnTitle}
                onPress={() => setPdfModalVis(true)}
              />
            )
          }
        />
        <SureModal
          isVisible={sureModalVis}
          loader={yesBtnLoader}
          onClose={() => setSureModalVis(false)}
          text={modalText}
          onPressYes={crudHandling}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            setCurrentDate(date);
            setIsDatePickerVisible(false);
          }}
          onCancel={() => setIsDatePickerVisible(false)}
          modalStyleIOS={{ justifyContent: 'center' }}
          date={new Date(currentDate)}
          maximumDate={new Date(dayjs().add(1, 'day').valueOf() - 86400000)}
        // minimumDate={new Date(dayjs().subtract(1, 'month').valueOf() - 86400000)}
        />
        <DateTimePickerModal
          isVisible={fromDateModalVis}
          mode="date"
          onConfirm={(date) => {
            setFromDate(date);
            setFromDateModalVis(false);
            setTimeout(() => {
              setPdfModalVis(true);
            }, 600);
          }}
          onCancel={() => setFromDateModalVis(false)}
          date={new Date(currentDate)}
          maximumDate={new Date(dayjs().add(1, 'day').valueOf() - 86400000)}
        />
        <DateTimePickerModal
          isVisible={endDateModalVis}
          mode="date"
          onConfirm={(date) => {
            setEndDate(date);
            setEndDateModalVis(false);
            setTimeout(() => {
              setPdfModalVis(true);
            }, 600);
          }}
          onCancel={() => setEndDateModalVis(false)}
          date={new Date(currentDate)}
          maximumDate={new Date(dayjs().add(1, 'day').valueOf() - 86400000)}
        />
        <PdfReportModal
          isVisible={pdfModalVis}
          onClose={() => setPdfModalVis(false)}
          fromDateValue={fromDate}
          endDateValue={endDate}
          onPressFromDate={() => {
            setPdfModalVis(false);
            setTimeout(() => {
              setFromDateModalVis(true);
            }, 600);
          }}
          onPressEndDate={() => {
            setPdfModalVis(false);
            setTimeout(() => {
              setEndDateModalVis(true);
            }, 600);
          }}
          onPressDownload={onPressDownLoad}
          isLoading={pdfBtnLoading}
        />
      </View>
    </ScreenWrapper>
  );
}
