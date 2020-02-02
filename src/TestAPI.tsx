import * as React from 'react';
import { FlowPage } from './models/FlowPage';
import { IManywho } from './models/interfaces';

declare const manywho: IManywho;

export class TestAPI extends FlowPage {
    
    async runSimpleAtomWs () {
        let auth = "BOOMI_TOKEN.nir.krumer@naturalint.com:bc2b3e9c-d32b-4433-9e54-a67801ea9113";
        let buf = Buffer.from(auth);
        let encodedData = buf.toString('base64');
        let username = 'naturalintelligence-ZWMKH3';
        let password = 'a64490be-56ce-4028-876d-2ec269ce9e09'
        let  base64 = require('base-64');
        let response = await fetch("https://boomi-external.naturalint.com:9090/ws/simple/querySimpleAtomWS;boomi_auth=" + btoa(username + ':' + password)  ,
        { 
            method: "POST", 
            body: JSON.stringify(
                {"key" : "0994539d-317e-1614-50f5-e65a3c92343e"}
               ), 
            headers : {
           //     "Authorization": btoa("Basic " + username + ":" + password),
                //base64.encode(username + ":" + password),
                "Accept": "application/json",                
                "Content-Type": "application/json"
            },
            // credentials: "same-origin",
            mode: 'no-cors'
            }
        )
        .then((response) => {
            return response.body
            //console.log(response)
        })
        .then((data) => {
            console.log(data)
        })
    
}
        async runFlowAtomWs () {
            let auth = "BOOMI_TOKEN.nir.krumer@naturalint.com:bc2b3e9c-d32b-4433-9e54-a67801ea9113";
            let buf = Buffer.from(auth);
            let encodedData = buf.toString('base64');
            let username = 'naturalintelligence-ZWMKH3';
            let password = 'a64490be-56ce-4028-876d-2ec269ce9e09'
            let base64 = require('base-64');
            let response = await fetch("https://boomi-external.naturalint.com:9090/fs/flowAtomWS",
            { 
                method: "POST", 
                body: JSON.stringify(
                    {"key" : "0994539d-317e-1614-50f5-e65a3c92343e"}
                   ), 
                headers : new Headers({
                    "Authorization": "Basic " + //encodedData ,
                    btoa(username + ":" + password),
                    "Accept": "application/json",                
                    "Content-Type": "application/json"
                }),
                credentials: "same-origin",
                mode: 'no-cors'
                }
            )
            .then((response) => {
                console.log(response)
            })
        }

        async runDirectlyAPI (){
            let auth = "BOOMI_TOKEN.nir.krumer@naturalint.com:bc2b3e9c-d32b-4433-9e54-a67801ea9113";
            let buf = Buffer.from(auth);
            let encodedData = buf.toString('base64');
            let username = 'boomi@naturalint.com';
            let password = 'b89qPL4b'
            let base64 = require('base-64');
            let response = await fetch("https://api.boomi.com/api/rest/v1/naturalintelligence-ZWMKH3/executeProcess",
            //boomi_auth=" + btoa(username + ':' + password),
            { 
                method: "POST", 
                body: JSON.stringify(
                    {"processId":"58594fa3-a612-4403-b142-4cda22ffcb70" ,
                    "atomId":"2dfe32e5-4371-488d-b6c4-13dc4e0bd7fd"}
                   ), 
                headers : new Headers({
                    "Authorization": "Basic " +// encodedData ,
                    btoa(username + ":" + password),
                    "Accept": "application/json",                
                    "Content-Type": "application/json"
                }),
              //  credentials: "same-origin",
               // mode: 'no-cors'
                }
            )
            .then((response) => {
                console.log(response)
            })
            .then((data) => {
                console.log(data)
            })
        }


    async runFakeAPI (){
        let auth = "BOOMI_TOKEN.nir.krumer@naturalint.com:bc2b3e9c-d32b-4433-9e54-a67801ea9113";
            let buf = Buffer.from(auth);
            let encodedData = buf.toString('base64');
            let username = 'boomi@naturalint.com';
            let password = 'b89qPL4b'
            let base64 = require('base-64');
            let response = await fetch("https://jsonplaceholder.typicode.com/todos/1",
            { 
                method: "GET",    
            }
                // credentials: "same-origin",
                // mode: 'no-cors'
            )
            .then((response: any) => response.json())
            .then((response) => {
                console.log(response)
            })
    }
    render(){
        return(
            <div>
                <button className = "btn btn-danger" onClick = {this.runSimpleAtomWs}>run simple WS from atomsphere </button>
                <br></br>
                <br></br>
                <button className = "btn btn-warning" onClick = {this.runFlowAtomWs}>run flow WS from atomsphere</button>
                <br></br>
                <br></br>
                <button className = "btn btn-success" onClick = {this.runDirectlyAPI}>run atomsphere api directly</button>
                <br></br>
                <br></br>
                <button className = "btn btn-primary" onClick = {this.runFakeAPI}>run general api - GET</button>
                {/* <br></br>
                <br></br>
                <button className = "btn btn-default">run general api - POST</button> */}
            </div>
        )
    }
}

manywho.component.register('TestAPI', TestAPI); 

export default TestAPI;