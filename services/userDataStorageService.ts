import {AsyncStorage} from "react-native";
const userDataItemKey = 'userData';
import FormData from '../types/models/formData'

export const getUserData = ()  => {
    return new Promise<FormData>((resolve,reject) => 
        AsyncStorage.getItem(userDataItemKey)
            .then(data =>  {
                if(data)
                    resolve(<FormData>JSON.parse(data))
                else
                    reject("user data not found")
            })
            .catch(err => reject(err))
    )
}

export const saveUserData = (data: FormData) => {
    return new Promise<any>((resolve,reject) => 
        AsyncStorage.setItem(userDataItemKey,JSON.stringify(data))
            .then(data =>  resolve(data))
            .catch(err => reject(err))
    )
}

export const removeUserData = () => {
    return new Promise<any>((resolve,reject) => 
        AsyncStorage.removeItem(userDataItemKey)
            .then(data =>  resolve(data))
            .catch(err => reject(err))
    )
}