//require('dotenv').config()
import {executeApi} from './Connector'
const ATOM_ID_PRODUCTION = 'XXXXXX';
const ATOM_ID_QA = 'yyyyyy';

const BOOMI_BASE_URL = 'https://boomi.naturalint.com:9090/ws/simple';
const BOOMI_API_PASS = process.env.atomCred

// fetch(`https://boomi.naturalint.com:9090/ws/simple/queryExecuteprocess;boomi_auth=${process.env.atomCred}`,

export const processService = 

async (processesToRun : any,env:String, useDates:String,startDate:String, endDate:String, userName:String) => {
    console.log(`BOOMI_API_PASS = ${BOOMI_API_PASS}`);
    const envToRun = env ? ATOM_ID_PRODUCTION : ATOM_ID_QA;
    const url = `${BOOMI_BASE_URL}/queryExecuteProcessTest;boomi_auth=${BOOMI_API_PASS}`
    const headers = new Headers({
        "Accept": "application/json",                
        "Content-Type": "application/json"});
    const method = 'POST'
    const jsonBody : any = {}
    console.log(`processesToRun = ${JSON.stringify(processesToRun)}`);
    
    jsonBody["atomId"] = envToRun,
    jsonBody["useDates"] = useDates,
    jsonBody["startDate"] =startDate,
    jsonBody["endDate"] = endDate,
    jsonBody["userName"] = userName
    jsonBody["processes"] = processesToRun

    executeApi(url, method, JSON.stringify(jsonBody), headers);
}
