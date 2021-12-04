import firestore from '@react-native-firebase/firestore';
import { removeFromArray } from '../utills/Methods';
export const getUser = async (_id) => {
    try {
        const res = await firestore().collection('Users').doc(String(_id)).get();
        if (res.exists)
            return { success: true, exists: true, data: res.data() }
        else
            return { success: true, exists: false, data: null }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
//Insert Data
export const insertUserData = async (document, data) => {
    try {
        await firestore().collection('Users').doc(document).set(data, { merge: true });
        return { success: true}
    } catch (error) {
        return { success: false, message: error?.message }
    }
}
