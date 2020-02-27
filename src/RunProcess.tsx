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
import Switch from "react-switch";
import Notiflix from "notiflix-react";

declare const manywho: IManywho;

export class RunProcess extends FlowPage {

    listmode:String = 'Revenue' ;
    ismoderev:boolean = true ;
    chosenProcesses: String[] = [];
    
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
        this.handleEnvChange = this.handleEnvChange.bind(this)
        this.state = {
            selectedOption: [] ,
            startDate : new Date(),
            endDate : new Date(),
            isHidden: true,
            checked : false,
            billingChecked : false,
            envOption : true
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
        this.setState({selectedOption}); 
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
    handleEnvChange(envOption:any){
        this.setState({ envOption });
    }

    async runProcessexe (processesToRun:any , env:String) {
        if (processesToRun.length > 0){
            // let username = 'boomi@naturalint.com';
            // let password = 'b89qPL4b';
            let envToRun:String;
                if (env){envToRun = "8e42eb7d-d9ab-4736-8e37-46132749b8e7"}
                else{envToRun = "2dfe32e5-4371-488d-b6c4-13dc4e0bd7fd"}
            let useDates = (this.state.checked) ? 'Y' : '' ;

            const processArray = processesToRun.map(((process :any) => {
                fetch("https://boomi.naturalint.com:9090/ws/simple/queryExecuteprocess;boomi_auth=bmF0dXJhbGludGVsbGlnZW5jZS1aV01LSDM6YTY0NDkwYmUtNTZjZS00MDI4LTg3NmQtMmVjMjY5Y2U5ZTA5",
                { 
                    method: "POST", 
                    body: JSON.stringify(
                          {"processId":process.value ,
                          "atomId":envToRun,
                          "useDates" : useDates,
                          "startDate" : this.state.startDate,
                          "endDate" : this.state.endDate
                         }),
                    headers : new Headers({
                        "Accept": "application/json",                
                        "Content-Type": "application/json"
                    }),
                    credentials: "same-origin",
                    mode: 'no-cors'
                })
                // .then(response => {
                //     console.log(response.status)
                //     console.log(response)
                // })
            })) ;  
            Notiflix.Notify.Success(processesToRun.length + ' processes were executed!');
        }
        else{
            Notiflix.Report.Failure('Execution Validation','No process was chosen','Click');
        }
    }
/* ********************************************************************************** */    
    
    render() {
        const processes : any = [] ;
        const selected_processes = "BEM:List:selected_processes"
        let process_element : any = {} ;    
        const hideStyle = this.state.isHidden ? {display : "none"} : {} ;
        const hideStyleHR = this.state.isHidden ? {display : "none"} : {border:"1px solid grey"} ;
        Notiflix.Notify.Init({fontSize:"17px",borderRadius:"10px",distance:"80px",});
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
             <div 
            //  className = "Bem-header"
             >
                <h2> Run Process </h2>
            </div> 
                <div className ="col-sm-6">    
                    <div className = "Bem-row" style ={{float:"right" }}>
                        <Switch id="toggle" onChange={this.handleEnvChange} checked={this.state.envOption} className="react-switch"
                            width={140} height={40}
                            //onColor = "#08f" 
                            uncheckedIcon={
                                <div style={{
                                    display: "flex",justifyContent: "center",alignItems: "center",
                                    height: "100%",fontSize: 17,color: "white",paddingRight: 2,marginRight:"45px"
                                }}
                                >QA
                                </div>
                            }
                            checkedIcon={
                                <div style={{
                                display: "flex",alignItems: "center",height: "100%",fontSize: 17,
                                color: "white",paddingLeft: 2,marginLeft:"10px"
                                }}
                            >Production
                                </div>
                            }
                            />   
                    </div>

                <div style ={{marginTop:"100px"}}> 
                    <h5> Run type </h5>
                </div>                
                    <div className = "Bem-row"> 
                    <fieldset>
                        <div className="radio">
                            <label className = "radio-label">
                                <input type="radio" name="ListType" value="revenues"  checked = {this.ismoderev}
                                onChange={this.onRunTypeRevChanged}/>  Includes Revenues 
                            </label>
                        </div>
                        <div className="radio">
                            <label className = "radio-label">
                                <input type="radio" name="ListType" value="subids" 
                                onChange={this.onRunTypeSidChanged}/> Subids Only
                            </label>
                        </div>
                        <div className="radio">
                            <label className = "radio-label">
                                <input type="radio" name="ListType" value="Fetch" 
                                onChange={this.onRunTypeFetchChanged}/> Fetching
                            </label>          
                        </div>
                    </fieldset>
                    </div>
                    <hr style = {{border:"1px solid silver"}}></hr>
                    <div className = "Bem-row"> 
                       <RunSelect  processes_list = {processes} SelecthandleChange = {this.SelecthandleChange} /> 
                    </div>
                    <div className = "Bem-row Bem-btn">       
                        <button id = "runProcess" onClick = {() => this.runProcessexe(this.state.selectedOption,this.state.envOption)} 
                        type="button" className = "btn btn-primary run-btn" 
                        style = {{display : "iconandtext",  padding: "10px 200px",fontSize : "20px"}}
                        > Run </button>
                    </div>
                </div>
                
                <div className ="col-sm-1"></div> 
                <div className ="col-sm-5">    
                    {/* <div className = "Bem-row">
                    <Switch id="toggle" onChange={this.handleEnvChange} checked={this.state.envOption} className="react-switch"
                        width={140} height={40}
                        //onColor = "#08f" 
                        uncheckedIcon={
                            <div style={{
                                display: "flex",justifyContent: "center",alignItems: "center",
                                height: "100%",fontSize: 17,color: "white",paddingRight: 2,marginRight:"45px"
                            }}
                            >QA
                            </div>
                        }
                        checkedIcon={
                            <div style={{
                            display: "flex",alignItems: "center",height: "100%",fontSize: 17,
                            color: "white",paddingLeft: 2,marginLeft:"10px"
                            }}
                        >Production
                            </div>
                        }
                        />   
                    </div> */}
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