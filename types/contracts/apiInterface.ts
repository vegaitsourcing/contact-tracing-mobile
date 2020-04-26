
export default interface APIContract {
    
    start: (exposureNotificationCallback: any, matchingOptions: MatchingOptions) => Promise<any> //any should be PendingIntent

    handleIntent: (intentCallback: any, callback: ExposureNotificationCallback) => Promise<any> //any should be Intent

    stop: () => Promise<any> 

    isEnabled: () => Promise<Boolean>

    getTemporaryExposureKeyHistory: () => Promise<TemporaryExposureKey[]> 

    provideDiagnosisKeys: (keys: TemporaryExposureKey[]) => Promise<any>

    getMaxDiagnosisKeys: () => Promise<Number> 

    getExposureSummary: () => Promise<ExposureSummary> 

    getExposureInformation: () => Promise<ExposureInformation[]>

    resetAllData: () => Promise<any> 

    resetTemporaryExposureKey: () => Promise<any> 
}

interface MatchingOptions {
    attenuationValueThreshold: number
	durationMinutesThreshold: number
}
	

interface ExposureNotificationCallback {
	onExposure: () => void
    onDiagnosisKeysRequested: () => void
}
	
interface TemporaryExposureKey {
	keyData: Int8Array 
    rollingStartNumber: number
  }  
	
interface ExposureSummary {
	daysSinceLastExposure: number
	matchedKeyCount: number
}

interface ExposureInformation {
	date: Date
	durationMinutes: number
    attenuationValue: number
}