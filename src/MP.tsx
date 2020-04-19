import * as React from 'react';
import { FlowPage } from './models/FlowPage';
import { IManywho } from './models/interfaces';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { eLoadingState } from './models/FlowBaseComponent';
import { FlowObjectDataArray } from './models/FlowObjectDataArray';
import { FlowObjectData} from './models/FlowObjectData';
import './RunProcess.css'
import 'react-datepicker/dist/react-datepicker.css';
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import Notiflix from "notiflix-react";

declare const manywho: IManywho;
// @ts-check
export class MP extends FlowPage {

    listmode:String = 'Budget' ;
    ismoderev:boolean = true ;
    
    constructor(props: any) {
        super(props);        
        this.onRunTypeBudget = this.onRunTypeBudget.bind(this) ;
        this.onRunTypeAdjustment = this.onRunTypeAdjustment.bind(this) ;
        this.onRunTypeMapping = this.onRunTypeMapping.bind(this) ;
        this.onRunTypeTargets = this.onRunTypeTargets.bind(this) ;
        this.handleEnvChange = this.handleEnvChange.bind(this)
        this.runProcessexe = this.runProcessexe.bind(this);

        // this.state = {
        //     selectedOption: [] ,
        //     startDate : new Date(),
        //     endDate : new Date(),
        //     isHidden: true,
        //     checked : false,
        //     billingChecked : false,
        //     envOption : true
        // };
    }

/* **************************************************************************************** */
    
    async componentDidMount(){  
        await super.componentDidMount();
        (manywho as any).eventManager.addDoneListener(this.moveHappened, this.componentId);
        this.onRunTypeBudget(undefined); 
        this.forceUpdate();
        return Promise.resolve();
    }
    
    moveHappened(xhr: XMLHttpRequest, request: any) {}    
    
    async componentWillUnmount(): Promise<void> {
        (manywho as any).eventManager.removeDoneListener(this.componentId);
    }

/* ************************************************************************************ */
    onRunTypeBudget(e : any) {
        this.listmode = 'Budget' ;
        this.ismoderev = true;
        this.forceUpdate();
      }    
    onRunTypeAdjustment(e : any) {
        this.listmode = 'Adjustments';
        this.ismoderev = false;
        this.forceUpdate();
      }
    onRunTypeMapping(e : any) {
        this.listmode = 'Mapping';
        this.ismoderev = false;
        this.forceUpdate();
      }
    onRunTypeTargets(e : any) {
        this.listmode = 'Targets';
        this.ismoderev = false;
        this.forceUpdate();
      }
    
    handleEnvChange(envOption:any){
        this.setState({ envOption });
    }

    async runProcessexe () {
        let envToRun:String = "8e42eb7d-d9ab-4736-8e37-46132749b8e7";
        let useDates = '' ;
        let process = '' ;
        switch(this.listmode) {
            case "Budget" :
                process = 'f8421de8-02c1-4c4a-83fe-a9c6da0aeb29'
                break;
            case "Adjustments" :
                process = 'bd62d1aa-d396-4e56-baff-5e1781dbb63a'
                break;
            case "Mapping" :
                process = '576e46fa-d7d9-43d7-a55c-ac55934f3270'
                break;
            case "Targets" :
                process = 'ec3c2205-71ad-4e78-ab25-63b9d44f3789'
                break;
        }
                fetch("https://boomi.naturalint.com:9090/ws/simple/queryExecuteprocess;boomi_auth=bmF0dXJhbGludGVsbGlnZW5jZS1aV01LSDM6YTY0NDkwYmUtNTZjZS00MDI4LTg3NmQtMmVjMjY5Y2U5ZTA5",
                { 
                    method: "POST", 
                    body: JSON.stringify(
                          {"processId": process,
                          "atomId":envToRun,
                          "useDates" : useDates,
                          "startDate" : new Date(),
                          "endDate" : new Date()
                         }),
                    headers : new Headers({
                        "Accept": "application/json",                
                        "Content-Type": "application/json"
                    }),
                    credentials: "same-origin",
                    mode: 'no-cors'
                })                
            Notiflix.Notify.Success('MP ' + this.listmode + ' process was executed!');
    }
/* ********************************************************************************** */    
    
    render() {
        Notiflix.Notify.Init({fontSize:"17px",borderRadius:"10px",distance:"80px",});
        if (this.loadingState !== eLoadingState.ready) {  
            return (<div></div>) ;
        }
        else {
    return (
        <div className = "container"> 
             <div className = "Bem-header">
                <h2> Run Media Profit Process </h2>
            </div> 
                <div className ="Bem-row">
                    <div className = "Bem-row"> 
                    <fieldset>
                        <div className="radio" style = {{marginBottom: "30px"}}>
                            <label className = "Bem-row">
                                <input type="radio" name="ListType" value="revenues"  checked = {this.ismoderev}
                                onChange={this.onRunTypeBudget}/>  Budget
                            </label>
                        </div>
                        <div className="radio" style = {{marginBottom: "30px"}}>
                            <label className = "Bem-row">
                                <input type="radio" name="ListType" value="subids" 
                                onChange={this.onRunTypeAdjustment}/> Adjustment
                            </label>
                        </div>
                        <div className="radio" style = {{marginBottom: "30px"}}>
                            <label className = "Bem-row">
                                <input type="radio" name="ListType" value="Fetch" 
                                onChange={this.onRunTypeMapping}/> Mapping
                            </label>          
                        </div>
                        <div className="radio" style = {{marginBottom: "30px"}}>
                            <label className = "Bem-row">
                                <input type="radio" name="ListType" value="Fetch" 
                                onChange={this.onRunTypeTargets}/> Targets
                            </label>          
                        </div>
                    </fieldset>
                    </div> 
                    <div className = "Bem-row Bem-btn">       
                        <button id = "MPrunProcess" onClick = {this.runProcessexe} 
                        type="button" className = "btn btn-primary" 
                        style = {{display : "iconandtext",  padding: "10px 200px",fontSize : "20px"}}
                        > Run </button>
                    </div>
                </div>
           </div>
            )   
        }
    }
}
manywho.component.register('MP', MP); 

export default MP;