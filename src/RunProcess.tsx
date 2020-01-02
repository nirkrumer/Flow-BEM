import * as React from 'react';
import { FlowPage } from './models/FlowPage';
import { IManywho } from './models/interfaces';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { eLoadingState } from './models/FlowBaseComponent';
import { FlowObjectDataArray } from './models/FlowObjectDataArray';
import { FlowObjectData} from './models/FlowObjectData';
import RunSelect from './RunSelect';
import './RunProcess.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";

declare const manywho: IManywho;

export class RunProcess extends FlowPage {

    listmode:String = 'Revenue' ;
    ismoderev:boolean = true ;
    
    constructor(props: any) {
        super(props);        
        this.onRunTypeRevChanged = this.onRunTypeRevChanged.bind(this) ;
        this.onRunTypeSidChanged = this.onRunTypeSidChanged.bind(this) ;
        this.onRunTypeFetchChanged = this.onRunTypeFetchChanged.bind(this) ;
        this.SelecthandleChange = this.SelecthandleChange.bind(this);
        this.onDateStartChange = this.onDateStartChange.bind(this)
        this.onDateEndChange = this.onDateEndChange.bind(this)
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
        this.initDates = this.initDates.bind(this)
        this.handleBillingClick = this.handleBillingClick.bind(this)
        this.state = {
            selected: [] ,
            startDate : new Date(),
            endDate : new Date(),
            isHidden: true,
            checked : false,
            billingChecked : false
        };
    }

/* **************************************************************************************** */
    
    async componentDidMount(){  
        await super.componentDidMount();
        (manywho as any).eventManager.addDoneListener(this.moveHappened, this.componentId);
        this.onRunTypeRevChanged(undefined); 
        this.initDates()
        this.forceUpdate();
        return Promise.resolve();
    }
    
    moveHappened(xhr: XMLHttpRequest, request: any) {}    
    
    async componentWillUnmount(): Promise<void> {
        (manywho as any).eventManager.removeDoneListener(this.componentId);
    }

/* ************************************************************************************ */
    onRunTypeRevChanged(e : any) {
        this.listmode = 'Revenue' ;
        this.ismoderev = true;
        this.forceUpdate();
      }    
    onRunTypeSidChanged(e : any) {
        this.listmode = 'Subid';
        this.ismoderev = false;
        this.forceUpdate();
      }
    onRunTypeFetchChanged(e : any) {
        this.listmode = 'Fetch';
        this.ismoderev = false;
        this.forceUpdate();
      }
    
    SelecthandleChange (selectedOption : React.FormEvent) {   
        this.forceUpdate();
        this.setState(
            {selected : selectedOption}            
          ); 
      }
    handleCheckboxClick(){
        this.setState({
            checked:!this.state.checked,
            isHidden:this.state.checked
        });
    }

    onDateStartChange(startDate:any){
        this.setState({ startDate })
      }
    onDateEndChange(endDate:any){
        this.setState({ endDate })
      }

    initDates(){
        const now = new Date();
        const firstday = new Date(now.getFullYear(), now.getMonth(), 1)
        const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1)
        this.setState({
            startDate : firstday,
            endDate : yesterday
         })
    }
    handleBillingClick(){
        this.setState({billingChecked : !this.state.billingChecked})
        if (this.state.billingChecked){
            const now = new Date ();
            const first = new Date(now.getFullYear(), now.getMonth() - 1, 1)
            const second = new Date(now.getFullYear(), now.getMonth() , 0)
            this.setState({
                startDate : first,
                endDate : second
            })
        }
        else{
            this.initDates();
        }
    }

    async runProcessexe () {
        //let auth = "BOOMI_TOKEN.naturalintelligence-ZWMKH3:a64490be-56ce-4028-876d-2ec269ce9e09";
        //eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE4NjUxMzgwLCJ1aWQiOjI1MjM0NzAsImlhZCI6IjIwMTktMDctMjQgMTA6NDg6MDkgVVRDIiwicGVyIjoibWU6d3JpdGUifQ.XTpObwX2qxEOvIbFfQwGkfAyZuckwV76KIM1JksmMIg
        let auth = "BOOMI_TOKEN.nir.krumer@naturalint.com:bc2b3e9c-d32b-4433-9e54-a67801ea9113";
        let buf = Buffer.from(auth);
        let encodedData = buf.toString('base64');
        let username = 'boomi@naturalint.com';
        let password = 'b89qPL4b';
        let base64 = require('base-64');
        let response = await fetch(//"https://boomi-external.naturalint.com:9090/fs/Flow_Service",
            "https://api.boomi.com/api/rest/v1/",//naturalintelligence-ZWMKH3/executeProcess",        
        { 
            method: "POST", 
            body: JSON.stringify(
                  {"processId":"58594fa3-a612-4403-b142-4cda22ffcb70" ,
                  "atomId":"2dfe32e5-4371-488d-b6c4-13dc4e0bd7fd"
                 }),
                //{"PartnerId" : 1, "PartnerName":"a" , "Accounts" : []}
               // ), 
            headers : new Headers({
                "Authorization": "Basic " + encodedData ,
                //base64.encode(username + ":" + password),
                "Accept": "application/json",                
                "Content-Type": "application/json"
            }),
            credentials: "same-origin",
            mode: 'no-cors'
        }
        )
        let test = '' ;
    }
        /*.then(async (response: any) => {
            if(response.status === 200) {
                const flowToken = await CallResult._getBodyText(response);
                console.log(flowToken);
                result = CallResult.newInstance(true,"connected", flowToken);
            }
            else {
                //error
                const errorText = await CallResult._getBodyText(response);
               console.log("Logged In Error - " + errorText);
                result = CallResult.newInstance(false,"not connected", errorText);
            }
        });*/

/* ********************************************************************************** */    
    
    render() {
        const processes : any = [] ;
        const selected_processes = "BEM:List:selected_processes"
        let process_element : any = {} ;    
        const hideStyle = this.state.isHidden ? {display : "none"} : {} ;
        const hideStyleHR = this.state.isHidden ? {display : "none"} : {border:"1px solid grey"} ;
        if (this.loadingState !== eLoadingState.ready) {  
            return (<div></div>) ;
        }
        else {
            let rev_List : FlowObjectDataArray ;
            switch(this.listmode) {
                case "Revenue" :
                    rev_List = this.fields["BEM:List:Revenue_Site"].value as FlowObjectDataArray
                    break;
                case "Subid":
                    rev_List = this.fields["BEM:List:Subid_Site"].value as FlowObjectDataArray
                    break;
                case "Fetch":
                    rev_List = this.fields["BEM:List:FetchProcess"].value as FlowObjectDataArray
                    break;
        } 
        rev_List.items.forEach((item: FlowObjectData) => {
            process_element = {}
            Object.keys(item.properties).forEach((key: string) => {            
                switch(key) {
                    case "Process_Id" :
                        process_element["value"] = item.properties[key].value;
                        break;
                    case "Process_Desc" :
                        process_element["label"] = item.properties[key].value;
                        break;
                }
            })
            processes.push(process_element)
        })
    return (
        <div className = "container"> 
             <div className = "Bem-header">
                <h2> Run Process </h2>
            </div> 
                <div className ="col-sm-6">
                    <div className = "Bem-row"> 
                        <div className="radio">
                            <label>
                                <input type="radio" name="runType" value="revenues"  checked = {this.ismoderev}
                                onChange={this.onRunTypeRevChanged}/>  Includes Revenues 
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" name="runType" value="subids" 
                                onChange={this.onRunTypeSidChanged}/> Subids Only
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" name="runType" value="Fetch" 
                                onChange={this.onRunTypeFetchChanged}/> Fetching
                            </label>          
                        </div>
                    </div>
                    <div className = "Bem-row"> 
                       <RunSelect  processes_list = {processes} SelecthandleChange = {this.SelecthandleChange} /> 
                    </div>
                    <div className = "Bem-btn"> 
                        <button id = "runProcess" onClick = {this.runProcessexe} type="button"
                        className = "btn btn-primary" style = {{display : "iconandtext"}}> Run </button>
                    </div>
                </div>
                <div className ="col-sm-1"></div> 
                <div className ="col-sm-5">    
                    <div className = "Bem-row"> 
                        <CheckBoxComponent 
                            label="Use dates for run"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxClick}
                            cssClass="e-success"
                        />
                        {/* <span style={{ display: "block-inline",fontSize: "150%" }}> Use dates for run?</span>         */}
                    </div>
                    <hr style={hideStyleHR}></hr>
                    <div className = "Bem-row"> 
                        <div style={hideStyle}>
                            <CheckBoxComponent 
                                label="Billing?"
                                checked={this.state.billingChecked}
                                onChange={this.handleBillingClick}
                                cssClass="e-info"
                            />
                        </div>
                    </div>
                    <div className = "Bem-row"> 
                        <div className ="col-sm-3" style={hideStyle}>
                            <div className = "Bem-row"> 
                                <span style={{ display : "flex",fontSize: "110%" }}> From Date</span>
                            </div>
                            <div className = "Bem-row"> 
                                <span style={{ display : "flex",fontSize: "110%" }}> To Date</span>
                            </div>
                        </div>
                        <div className ="col-sm-2" style={hideStyle}>
                            <div className = "Bem-row"> 
                                 <DatePicker
                                    onChange={this.onDateStartChange} selected={this.state.startDate}
                                    dateFormat="dd/MM/yyyy"
                                    value = {this.state.startDate}    
                                    todayButton="Today"
                                /> 
                            </div>
                            <div className = "Bem-row"> 
                                <DatePicker
                                    onChange={this.onDateEndChange} selected={this.state.endDate}
                                    dateFormat="dd/MM/yyyy"
                                    value = {this.state.endDate}    
                                    todayButton="Today"
                                />
                            </div>
                        </div>
                    </div>
                </div>  
           </div>
            )   
        }
    }
}
manywho.component.register('RunProcess', RunProcess); 

export default RunProcess;