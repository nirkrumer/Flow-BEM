import React from 'react';
import { FlowPage } from './models/FlowPage';
import { IManywho } from './models/interfaces';
import { FlowObjectDataArray } from './models/FlowObjectDataArray';
import { FlowObjectData} from './models/FlowObjectData';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './design/ExecRecordsGrid.css';
import BSTable from './components/BSTable';
import { eLoadingState } from './models/FlowBaseComponent';
import Switch from "react-switch";
import Notiflix from "notiflix-react";
import Select from 'react-select';

declare const manywho: IManywho;

export class ExecRecordsGrid extends FlowPage {
    autorun : String ;
    timerId : any ;
    listmode:String = 'Prod' ;
    ismoderev:boolean = true ;
    
    constructor(props: any) {
        super(props);
        this.handleSwitchChange = this.handleSwitchChange.bind(this)
        this.refreshTable = this.refreshTable.bind(this)
        this.flowrefreshTable = this.flowrefreshTable.bind(this)
        this.runTypeHandler = this.runTypeHandler.bind(this)
        this.timeRangeHandler = this.timeRangeHandler.bind(this)
        this.state = {
            Toggleoption : false,
            input : '',
            tabledata : [],
            is_loading : false,
            selectedRTOption: { value: 'Production', label: 'Production' },
            selectedRangeOption: { value: '1', label: 'Last hour' }
        }
    }
    async componentDidMount() {
        await super.componentDidMount();
        (manywho as any).eventManager.addDoneListener(this.moveHappened, this.componentId);
        Notiflix.Notify.Init({fontSize:"17px",borderRadius:"10px",distance:"80px",});
        this.forceUpdate();
        return Promise.resolve();
    }

    moveHappened(xhr: XMLHttpRequest, request: any) {}

    async componentWillUnmount(): Promise<void> {
        (manywho as any).eventManager.removeDoneListener(this.componentId);
        window.clearInterval(this.timerId);
    }

/* **************************************************************************** */

    onRunTypeProd(e : any) {
        this.listmode = 'Production' ;
        this.ismoderev = true;
        this.forceUpdate();
    }    
    onRunTypeQA(e : any) {
        this.listmode = 'QA';
        this.ismoderev = false;
        this.forceUpdate();
    }
    onRunTypeBoth(e : any) {
        this.listmode = 'Both';
        this.ismoderev = false;
        this.forceUpdate();
    }
    handleSwitchChange(Toggleoption : boolean){
        this.setState({ Toggleoption });
        this.autorun = Toggleoption ? 'On' : 'Off';
        if (Toggleoption){
            const triggeroutcome_this = this;
            this.timerId = window.setInterval(function(){
                triggeroutcome_this.triggerOutcome('Refresh');
                } , 60000)
            }    
        else {
            window.clearInterval(this.timerId);
        }
    }
    runTypeHandler(selectedRTOption:any){
        this.setState({selectedRTOption})
    }
    timeRangeHandler(selectedRangeOption:any){
        this.setState({selectedRangeOption})
    }

    async refreshTable() : Promise<any> {
        this.setState({is_loading:true});
        await fetch("https://boomi.naturalint.com:9090/ws/simple/getExecutionRecords;boomi_auth=XXXXXXXX",
            { 
                method: "POST",
                body: JSON.stringify(
                    {"env": "123"}), 
                headers : new Headers({
                    "Accept": "application/json",                
                    "Content-Type": "application/json",
                }),
                  credentials: "same-origin",
                  mode:"no-cors"
            })

            Notiflix.Notify.Info('Page is refreshing...');
            this.forceUpdate();            
        }
       async flowrefreshTable(){
            this.fields['BEM:Environment_selected'].value = this.state.selectedRTOption.value
            this.fields['BEM:timeRange_selected'].value = this.state.selectedRangeOption.value
        await this.updateValues([this.fields['BEM:Environment_selected'],this.fields['BEM:timeRange_selected']]);
        await this.triggerOutcome('Refresh');
        }

    async cancelHandler(executionId:any){
        await fetch("https://boomi.naturalint.com:9090/ws/simple/queryCancelExecution;boomi_auth=bmF0dXJhbGludGVsbGlnZW5jZS1aV01LSDM6YTY0NDkwYmUtNTZjZS00MDI4LTg3NmQtMmVjMjY5Y2U5ZTA5",
            { 
                method: "POST",
                body: JSON.stringify(
                    {"executionId": executionId}), 
                headers : new Headers({
                    "Accept": "application/json",                
                    "Content-Type": "application/json"
                }),
                credentials: "same-origin",
                mode: 'no-cors'
            })
            Notiflix.Notify.Info('Cancelation request has been sent');
        }
    
    
    render() {
        if (this.loadingState !== eLoadingState.ready) {
            return (<div></div>);
        }
        const products: any = [];
        let product_element: any = {};
        
        const  runTypeOptions = [
            { value: 'Production', label: 'Production' },
            { value: 'QA', label: 'QA' },
            { value: 'Both', label: 'Both' }
          ]
        const timeRangeOptions = [
            { value: '1', label: 'Last Hour' },
            { value: '3', label: 'Last 3 Hours' },
            { value: '6', label: 'Last 6 Hours' },
            { value: '24', label: 'Last 24 Hours' }
          ]
        const api_request: FlowObjectDataArray = this.fields["BEM:List:Execution_API_Request"].value as FlowObjectDataArray;
        api_request.items.forEach((item: FlowObjectData) => {
            let processName = item.properties["bns:processName"].value.toString() ;
            if ((processName.includes("INCLUDES REVENUES"))
                    || (processName.includes("SubidsOnly"))
                    || (processName.includes("Subids+Calls Only")))
                    {
                        product_element = {};
                        Object.keys(item.properties).forEach((key: string) => {
                            switch (key) {
                                case "bns:processName":
                                    product_element["processName"] = item.properties[key].value;
                                    break;
                                case "bns:atomName":
                                    product_element["atomName"] = item.properties[key].value;
                                    break;
                                case "bns:executionType":
                                    product_element["executionType"] = item.properties[key].value;
                                    break;
                                case "bns:executionTime":
                                    product_element["startTime"] = item.properties[key].value;
                                    break;
                                case "bns:status":
                                    product_element["status"] = item.properties[key].value;
                                    break;
                                case "bns:message":
                                    product_element["errormsg"] = item.properties[key].value;
                                    break;
                                case "bns:executionDuration":
                                    product_element["executionDuration"] = item.properties[key].value;
                                    break;
                                case "bns:executionId":
                                    product_element["executionId"] = item.properties[key].value;
                                    break;    
                            }
                        });
                        products.push(product_element)
                }
            });
        const defaultSorted = [{
            dataField: 'startTime',
            order: 'desc'
        }];
       
        const columns = [
            {
                datafield: 'cancelbutton',
                formatter: (cellContent: any,row:any) => {
                    if (row.status == 'INPROCESS'){
                        return(    
                            <button className = 'btn btn-danger' onClick = {() => this.cancelHandler(row.executionId)}
                            style = {{borderRadius:"25px"}}> Cancel </button>
                        )                   
                    }
                },
                headerStyle: () => {
                    return { width: '110px' };
                }
            },
            {
                dataField: 'executionType',
                formatter: (cellContent: any) => {
                    if (cellContent == 'exec_manual') {
                        return (
                            <img src="https://files-manywho-com.s3.amazonaws.com/0ee8638b-e3bf-4f1f-a4fa-b04e0c672f20/User_icon_2.svg.png"
                                style={{ width: "35px", height: "35px" }}
                            />
                        )
                    }
                    else {
                        return (
                            <img src="https://files-manywho-com.s3.amazonaws.com/0ee8638b-e3bf-4f1f-a4fa-b04e0c672f20/calender_white.png"
                                style={{ width: "30px", height: "30px" }}
                            />
                        )
                    }
                },
                headerStyle: (column: any, colIndex: any) => {
                    return { width: '70px' };
                }
            },
            {
                dataField: 'processName',
                text: 'Process',
                sort: true
            },
            {
                dataField: 'atomName',
                text: 'Environment',
                formatter: (cellContent: any) => {
                    if (cellContent == 'boomi-prod-ashburn') {
                        return (
                            <div> Production </div>
                        )
                    }
                    return (
                        <div> QA </div>
                    )
                },
                classes: 'table-column',
                headerStyle: (column: any, colIndex: any) => {
                    return { width: '100px' };
                }
            },
            {
                dataField: 'startTime',
                text: 'Start Time',
                headerStyle: (column: any, colIndex: any) => {
                    return { width: '170px' };
                }
            },
            {
                dataField: 'status',
                isDummyField: true,
                text: 'Status',
                formatter: (cellContent: any, row: any) => {
                    if (row.status == 'COMPLETE') {
                        return (
                            <h6>
                                <span className="label_loc success_loc">Completed</span>
                            </h6>
                        );
                    }
                    else if (row.status == 'INPROCESS') {
                        return (
                            <h6>
                                <span className="blink label_loc info_loc"> In Process</span>
                            </h6>
                        );
                    }
                    else {
                        if (row.errormsg.includes("Process has been manually cancelled")) {
                            return (
                                <img src="https://files-manywho-com.s3.amazonaws.com/0ee8638b-e3bf-4f1f-a4fa-b04e0c672f20/output-onlinejpgtools.png"
                                    style={{ width: "250px", height: "70px" }}
                                />
                            )
                        }
                        else {
                            return (
                                <h6>
                                    <span className="label_loc danger_loc "> Error</span>
                                </h6>
                            );
                        }
                    }
                },
                headerStyle: (column: any, colIndex: any) => {
                    return { width: '130px' };
                }
            },
            {
                dataField: 'errormsg',
                text: 'Error Message',
                formatter: (cellContent: any) => {
                    if (cellContent.includes("Process has been manually cancelled")) {
                        return (<div></div>)
                    }
                    else {
                        return (cellContent)
                    }
                }
            }
        ];
        
        const rowStyle = (row:any) => {
            let style = {};    
            if (row.errormsg.includes("Process has been manually cancelled")){
                style = {backgroundColor : '#ffe6cc'}
            }
            return style;        
        }
        /* ********************************************************************************** */
        const tabledataTosend = (this.state.tabledata.length > 0 ) ? this.state.tabledata : products  ;
        return (
         <div className = "container">
             <div className = "Bem-header">
                <h2> Execution Screen </h2>
            </div> 
            <div className = "col-sm-2"> 
            <Select
            defaultvalue= {runTypeOptions[0]}
                options={runTypeOptions}
                className="basic-single"
                closeMenuOnSelect={true}
                onChange={this.runTypeHandler} value={this.state.selectedRTOption}
                
            />
            </div>
            <div className = "col-sm-2"> 
                <Select
                defaultvalue= {timeRangeOptions[0]}
                    options={timeRangeOptions}
                    className="basic-single"
                    closeMenuOnSelect={true}
                    onChange={this.timeRangeHandler} value={this.state.selectedRangeOption}                   
                />
            </div>
            <div className = "col-sm-8"> 
                <div className = "row" style ={{float:"right" }}>
                    <button className = "btn btn-primary" type="button" onClick={this.flowrefreshTable}>Refresh</button>
                </div>
                <br></br><br></br>                
                <div className = "row" style ={{float:"right" }}>
                <label>
                        <span style={{ display : "flex",fontSize: "140%" }}> Auto Run</span>
                        <Switch id="toggle" onChange={this.handleSwitchChange} checked={this.state.Toggleoption} 
                        offColor="#000" className="react-switch"/>                        
                </label>
                </div>
            </div>
            <BSTable products = {tabledataTosend} columns = {columns} defaultSorted = {defaultSorted} style = {rowStyle}> </BSTable>
        </div>
        );
        //test
    }
}

manywho.component.register('ExecRecordsGrid', ExecRecordsGrid);

export default ExecRecordsGrid;
