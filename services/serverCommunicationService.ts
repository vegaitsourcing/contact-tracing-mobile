import axios from 'axios';
import DiagnosisKey from '../types/models/diagnosisKey';

const apiUrl = ''

export const fetchDiagnosisKeys = () => {
    
    return new Promise<any>(async (resolve, reject) => {

        resolve({data:"MOCK"})

        // axios.get<any>(apiUrl+'getDiagnosisKeys',
        //             {
        //                 headers: {
        //                     "Content-Type": "application/json"
        //                 }
        //             })
        //             .then(response => {
        //                 console.log('Got data from server, data is:')
        //                 console.log(response.data)
        //                 resolve(response.data);
        //             })
        //             .catch(error => reject(error))
    })
}

export const pushDiagnosisKeys = () => {
    
    var data: DiagnosisKey[] = generateDiagnosisKeys();

    return new Promise<any>(async (resolve, reject) => {

        axios.post<any>(apiUrl+'postDiagnosisKeys',
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