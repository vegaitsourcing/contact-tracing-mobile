import axios from 'axios';
import DiagnosisKey from '../types/models/diagnosisKey';

const apiUrl = 'http://euvscovid.sitesstage.com/api/v1/DiagnosisKey'

export const fetchDiagnosisKeys = () => {
    
    return new Promise<any>(async (resolve, reject) => {

        axios.get<any>(apiUrl,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => {
                        console.log('Got data from server, data is:')
                        console.log(response.data)
                        resolve(response.data);
                    })
                    .catch(error => reject(error))
    })
}

export const pushDiagnosisKeys = () => {
    
    var data: DiagnosisKey[] = generateDiagnosisKeys();

    return new Promise<any>(async (resolve, reject) => {

        axios.post<any>(apiUrl,
                    JSON.stringify(data),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => {
                        console.log('Got data from server, data is:')
                        console.log(response.data)
                        resolve(response.data);
                    })
                    .catch(error => reject(error))
    })
}

const generateDiagnosisKeys = () => {
    var data: DiagnosisKey[] = []

    for(var i = 0; i < 14; i++) {
        var date = new Date()
        date.setDate(date.getDate() - i)
        //var dayNumber = Math.floor(date.getTime()/8.64e7);
        var dailyKey = [date.getFullYear(),date.getMonth(),date.getDay()].join('')
        data.push({date,dailyKey})
    }
    return data
}