import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
export async function saveData(collection, doc, jsonObject) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, {merge: true})
    .catch(function (error) {});
}
export async function saveDataSubCollection(
  collection,
  doc,
  subcollection,
  subDoc,
  jsonObject,
) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .collection(subcollection)
    .doc(subDoc)
    .set(jsonObject, {merge: true})
    .catch(function (error) {});
}
export const removeFromArray = async (collection, doc, array, index) => {
  let docRef = firestore().collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayRemove(
        docData.data()[array][index],
      ),
    });
  }
};
export const chekValidUser = async (data) => {
  try {
    const tempData = await firestore()
      .collection('Users')
      .doc(data?.companyId)
      .get();
    let isValidUser = false;
    let errorText = '';
    if (tempData?.exists) {
      const invities = tempData?.data()?.invitedUsers;
      invities.map((item, index) => {
        if (item?.companyId == data?.companyId && item?.email == data?.email) {
          isValidUser = true;
          removeFromArray('Users', data?.companyId, 'invitedUsers', index);
          return;
        } else {
          errorText = 'Email not matched';
        }
      });
    } else {
      errorText = 'Invalid company id';
    }
    return {success: true, isValidUser: isValidUser, errorText};
  } catch (error) {
    return {success: false, error: error?.messgage ?? 'Somthing went wrong'};
  }
};
export async function addToArray(
  collection,
  doc,
  subcollection,
  subdoc,
  array,
  value,
) {
  try {
    let docRef = firestore()
      .collection(collection)
      .doc(doc)
      .collection(subcollection)
      .doc(subdoc);
    let docData = await docRef.get();
    if (docData.exists && docData.data()[array] != undefined) {
      docRef.update({
        [array]: firebase.firestore.FieldValue.arrayUnion(...value),
      });
    } else {
      saveDataSubCollection(collection, doc, subcollection, subdoc, {
        [array]: value,
      });
    }
  } catch (error) {
    console.log(error);
    return error?.messgage ?? 'Something went wrong';
  }
}
export async function eiditToArray(
  collection,
  doc,
  subcollection,
  subdoc,
  array,
  value,
  index,
) {
  try {
    let docRef = firestore()
      .collection(collection)
      .doc(doc)
      .collection(subcollection)
      .doc(subdoc);
    let docData = await docRef.get();
    if (docData.exists && docData.data()[array][index] != undefined) {
      docRef.update({
        [array]: firebase.firestore.FieldValue.arrayRemove(
          docData.data()[array][index],
        ),
        [array]: value[index],
      });
    }
  } catch (error) {
    return error?.messgage ?? 'Something went wrong';
  }
}
//Time slot
export function areSlotsConflicting(newSlot, oldSlot, format = 'hh:mm A') {
  console.log(
    isGreater(newSlot.startTime, oldSlot.startTime),
    newSlot.startTime,
    oldSlot.startTime,
  );
  if (
    isGreater(newSlot.startTime, oldSlot.startTime) &&
    isGreater(oldSlot.endTime, newSlot.startTime)
  )
    return true;
  if (
    isGreater(newSlot.endTime, oldSlot.startTime) &&
    isGreater(oldSlot.endTime, newSlot.endTime)
  )
    return true;
  if (
    isLesser(newSlot.startTime, oldSlot.startTime) &&
    isGreater(newSlot.endTime, oldSlot.endTime)
  )
    return true;
}
export function isGreater() {
  return !isIntervalValid.apply(null, arguments);
}
export function isLesser() {
  return isIntervalValid.apply(null, arguments);
}
export function isIntervalValid(startTime, endTime, format = 'hh:mm A') {
  function to24FormatMinutes(time) {
    let hours = moment(time,format).get('hours');
    let minutes = moment(time, format).get('minutes');
    minutes += hours * 60;
    if (moment(time, format).format('A') == 'PM') minutes += 12 * 60;
    return minutes;
  }
  return to24FormatMinutes(startTime) < to24FormatMinutes(endTime);
}
