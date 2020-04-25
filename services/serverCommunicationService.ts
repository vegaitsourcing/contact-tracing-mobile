import axios from 'axios';
import { getFetchDate, saveFetchDate } from './storageService';

export const fetchDiagnosisKeys = () => {
    
    return new Promise<any>(async (resolve, reject) => {
        let date = await getFetchDate()
        if(!date){
            date = new Date()
            saveFetchDate(date)
        }

        axios.get<any>('url',
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