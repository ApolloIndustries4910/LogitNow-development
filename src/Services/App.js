import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
export const getMachineList = async (id) => {
    try {
        let data = [];
        const tempDatas = await firestore().collection('Machines').where('addedBy', '==', id).get();
        tempDatas.forEach(function (doc) {
            if (doc.exists) {
                data.push({ ...doc.data(), id: doc.ref.id })
            }
        });
        return { success: true, data: data }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}

export const addLogs = async (payload, user, date) => {
    try {
        await firestore().collection('Users').doc(user?.id).collection('Tasks').doc(date).set(payload, { merge: true })
        return { success: true }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}

export const chekOut = async (id, payload) => {
    try {
        await firestore().collection('Users').doc(String(id)).set(payload, { merge: true })
        return { success: true, message: "Your Log have check out successfully" }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
export const getLogs = async (user, currentDate) => {
    try {
        let tempDatas = await firestore().collection('Users').doc(user?.id).collection('Tasks').doc(currentDate).get();
        return { success: true, data: tempDatas.data()?.tasks ?? [], checkInTime: tempDatas.data()?.checkInTime ?? '', checkOutTime: tempDatas.data()?.checkOutTime ?? '' }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}

export const addMachines = async (payload) => {
    try {
        await firestore().collection('Machines').doc(payload?.id).set(payload, { merge: true })
        return { success: true }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
export const eidtMachines = async (payload) => {
    try {
        await firestore().collection('Machines').doc(payload?.id).set(payload, { merge: true })
        return { success: true }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
export const deleteMachines = async (payload) => {
    try {
        await firestore().collection('Machines').doc(payload?.id).delete()
        return { success: true }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
export const addProject = async (payload, subPayLoad) => {
    try {
        await firestore().collection('Project').doc(payload?.id).set(payload, { merge: true });
        subPayLoad?.subProjects.forEach(async (item) => {
            await firestore().collection('Project').doc(payload?.id).collection('SubProject').doc(item?.id).set(item, { merge: true })
        });
        return { success: true }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
//Get Projects
export const getProjects = async (userId) => {
    try {
        let data = [];
        const tempDatas = await firestore().collection('Project').where('addedBy', '==', userId).get();
        for (let i = 0; i < tempDatas?.docs?.length; i++) {
            let doc = tempDatas.docs[i];
            if (doc.exists) {
                // data.push({ ...doc.data(), id: doc.ref.id })
                const tempDataInner = await firestore().collection('Project').doc(doc.ref.id).collection('SubProject').get();
                let subprojects = []
                tempDataInner.forEach(item => {
                    subprojects.push(item.data())
                })
                data.push({ ...doc.data(), id: doc.ref.id, subProjects: subprojects })
            }
        }
        return { success: true, data: data }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
//Delete Sub Project
export const deleteSubProject = async (mainCollectionId, subCollectionId) => {
    try {
        await firestore().collection('Project').doc(mainCollectionId).collection('SubProject').doc(subCollectionId).delete();
        return { success: true }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
//Add members
export const addMembers = async (id, payload) => {
    try {
        await firestore().collection('Users').doc(id).set(payload, { merge: true });
        return { success: true }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
//Add members
export const getMembers = async () => {
    try {
        let data = [];
        let tempData = await firestore().collection('Users').where('isAdmin', '==', false).get();
        tempData.forEach((doc) => {
            if (doc?.exists) {
                data.push({ ...doc.data(), id: doc.ref.id })
            }
        });
        return { success: true, data: data }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
//Change Staus user
export const changeStausUser = async (payload) => {
    try {
        await firestore().collection('Users').doc(payload?.id).set(payload, { merge: true });
        return { success: true }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
//Edit User
export const editUser = async (payload) => {
    try {
        await firestore().collection('Users').doc(payload?.id).set(payload, { merge: true });
        return { success: true }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
//Get Users
export const getProjectsByUsers = async (companyId) => {
    try {
        let data = [];
        const tempDatas = await firestore().collection('Project').where('addedBy', '==', companyId).where('status', '!=', 'close')
           .get();
        for (let i = 0; i < tempDatas?.docs?.length; i++) {
            let doc = tempDatas.docs[i];
            if (doc.exists) {
                // data.push({ ...doc.data(), id: doc.ref.id })
                const tempDataInner = await firestore().collection('Project').doc(doc.ref.id).collection('SubProject').get();
                let subprojects = []
                tempDataInner.forEach(item => {
                    subprojects.push(item.data())
                })
                data.push({ ...doc.data(), id: doc.ref.id, subProjects: subprojects })
            }
        }
        return { success: true, data: data }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}
//Get Project
export const getProjectOnly = async (projectId) => {
    try {
        let data = [];
        const tempDatas = await firestore().collection('Project').doc(projectId).get();
        if (tempDatas?.exists) {
            let doc = tempDatas.data();
            const tempDataInner = await firestore().collection('Project').doc(tempDatas.ref.id).collection('SubProject').get();
            let subprojects = []
            tempDataInner.forEach(item => {
                subprojects.push(item.data())
            })
            data.push({ ...doc, id: tempDatas.ref.id, subProjects: subprojects })
        }
        return { success: true, data: data }
    } catch (error) {
        return { success: false, error: error?.message }
    }
}



