import {AsyncStorage} from "react-native";
import { AppStatus } from "../types/models/appStatus";


const tracingKey = 'tracingKey';
const appStatus = 'appStatus';
const lastFetchDate = 'lastFetchDate';

export const getTracingKey = () => {
    return new Promise<any>((resolve,reject) => 
        AsyncStorage.getItem(tracingKey)
            .then(data =>  resolve(data))
            .catch(err => reject(err))
    )
}

export const saveTracingKey = (data: string) => {
    return new Promise<any>((resolve,reject) => 
        AsyncStorage.setItem(tracingKey,data)
            .then(data =>  resolve(data))
            .catch(err => reject(err))
    )
}

export const removeTracingKey = () => {
    return new Promise<any>((resolve,reject) => 
        AsyncStorage.removeItem(tracingKey)
            .then(data =>  resolve(data))
            .catch(err => reject(err))
    )
}



export const getAppStatus = () => {
    return new Promise<any>((resolve,reject) => 
        AsyncStorage.getItem(appStatus)
            .then(data =>  resolve(data))
            .catch(err => reject(err))
    )
}

export const saveAppStatus = (data: AppStatus) => {
    return new Promise<any>((resolve,reject) => 
        AsyncStorage.setItem(appStatus,data.toString())
            .then(data =>  resolve(data))
            .catch(err => reject(err))
    )
}

export const removeAppStatus = () => {
    return new Promise<any>((resolve,reject) => 
        AsyncStorage.removeItem(appStatus)
            .then(data =>  resolve(data))
            .catch(err => reject(err))
    )
}



export const getFetchDate = () => {
    return new Promise<Date>((resolve,reject) => 
        AsyncStorage.getItem(lastFetchDate)
            .then(data => {
                if(data)
                    resolve(new Date(Date.parse(data)))
                else 
                    reject("Cannot parse date from storrage")
            })
            .catch(err => reject(err))
    )
}

export const saveFetchDate = (data: Date) => {
    return new Promise<any>((resolve,reject) => 
        AsyncStorage.setItem(lastFetchDate,data.toString())
            .then(data =>  resolve(data))
            .catch(err => reject(err))
    )
}

export const removeFetchDate = () => {
    return new Promise<any>((resolve,reject) => 
        AsyncStorage.removeItem(lastFetchDate)
            .then(data =>  resolve(data))
            .catch(err => reject(err))
    )
}