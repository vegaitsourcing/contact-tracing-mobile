
const Crypto = require('crypto');
var HKDF = require('hkdf')

export const demoCrypto = () => {

    console.log("*************")
    const tracingKey = Crypto.lib.WordArray.random(16).toString()
    console.log('TracingKey: ', tracingKey)

    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    const dayNumber = Math.floor(secondsSinceEpoch/60/60/24)
    console.log('Day number: ', dayNumber)


    //console.log(Crypto.HmacSHA256("the", "_SALT").toString());
    // console.log('RANDOM NUM')
    // console.log(Crypto.lib.WordArray.random(128 / 32).toString())
    // console.log('PRE HKDF')
    
    var hkdf = Crypto.algo.HMAC.create(Crypto.algo.SHA256, tracingKey);
    hkdf.update(Crypto.enc.Utf8.stringify("CT-DTK")+dayNumber.toString())
    var dailyTracingKey = hkdf.finalize().toString().substr(0,16);
    console.log("DailyTracingKey: ",dailyTracingKey)

    //console.log('**** ',(secondsSinceEpoch % (60*60*24)));

    var timeNumberInterval = Math.floor((secondsSinceEpoch % (60*60*24)) / 600)

    console.log('TimeNumberInterval: ', timeNumberInterval)

    var rpi = getRpi(dailyTracingKey,timeNumberInterval)
    console.log('RPI: ' + rpi)

    // var hkdf = new HKDF(tracingKey)
    // console.log(hkdf.derive("info",16))
    //hkdf.derive('info',16,(output) => console.log(output))
    console.log("CHECKING MATCH no1: ", checkMatch(dailyTracingKey,rpi))
    console.log("CHECKING MATCH no2: ", checkMatch("7382012847102734",rpi)) 
}

const getRpi = (dailyTracingKey,timeNumberInterval) => {
    return Crypto.HmacSHA256(dailyTracingKey, Crypto.enc.Utf8.stringify("CT-RPI")+timeNumberInterval.toString()).toString().substr(0,16);
}

const checkMatch = (dailyTracingKey, rpi) => {
    for(var i = 0; i < 144; i++) {
        if(rpi == getRpi(dailyTracingKey,i))
            return true;
    }
    return false;
}