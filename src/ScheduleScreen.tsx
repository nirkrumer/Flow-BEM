import * as React from 'react';
import { FlowPage } from './models/FlowPage';
import { IManywho } from './models/interfaces';
import { FlowObjectDataArray } from './models/FlowObjectDataArray';
import { FlowObjectData, IFlowObjectData } from './models/FlowObjectData';
import { eLoadingState } from './models/FlowBaseComponent';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Switch from "react-switch";
import 'react-datepicker/dist/react-datepicker.css';
import ​'./ScheduleScreen.css';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import WeekDaysPicker from './WeekDaysPicker';
import HourComp from './HourComp';
import Notiflix from "notiflix-react";
import SwitchFlow from './SwitchFlow';

declare const manywho: IManywho;
​
export class SchedulesScreen extends FlowPage {
    node: any;
    schedArrayList:any[]= []
    hourSentToComponent = '';
    sunV = false
    monV = false
    tueV = false
    wedV = false
    thuV = false
    friV = false
    satV = false
    products : any[] = [] ;
    row: any;
    toggleOption = false ;
​
    constructor(props: any) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this)
        this.handleSwitchChangeLogics = this.handleSwitchChangeLogics.bind(this)
        this.refrshTable = this.refrshTable.bind(this)
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
        this.onHourEndChange = this.onHourEndChange.bind(this)
        this.initHours = this.initHours.bind(this)
        this.initDays = this.initDays.bind(this)
        this.initSwitch = this.initSwitch.bind(this)
        this.saveHandler = this.saveHandler.bind(this)
        this.UpdateSchedule = this.UpdateSchedule.bind(this)
        this.SelecthandleChange = this.SelecthandleChange.bind(this)
        this.onhourChangeLogics = this.onhourChangeLogics.bind(this)
        this.​handleWeekDayLogics = this.​handleWeekDayLogics.bind(this)
        this.​handleWeekDay = this.​handleWeekDay.bind(this)
        this.state = {
            Toggleoption : false,
            checked : false,
            hour : "",
            selectedOption: [],
               }
        }   
    async componentDidMount() {
        await super.componentDidMount();
        (manywho as any).eventManager.addDoneListener(this.moveHappened, this.componentId);
        this.forceUpdate();
        return Promise.resolve();
    }
   
    moveHappened(xhr: XMLHttpRequest, request: any) {
        if ((xhr as any).invokeType === 'FORWARD') {
            // this.forceUpdate();
        }
    }
​/* --------------------------------------------------------------- */

initHours(row:any){
    this.setState({hour : row.Hours + ":" + row.Minutes })
    this.hourSentToComponent = row.Hours + ":" + row.Minutes;
}  
initDays(row:any){
    this.setState({Tue : row.Days.includes('3') ? true: false});
    this.sunV = row.Days.includes('1') ? true: false;
    this.monV = row.Days.includes('2') ? true: false;
    this.tueV = row.Days.includes('3') ? true: false;
    this.wedV = row.Days.includes('4') ? true: false;
    this.thuV = row.Days.includes('5') ? true: false;
    this.friV = row.Days.includes('6') ? true: false;
    this.satV = row.Days.includes('7') ? true: false;
    if (row.Days == '*'){
        this.sunV = true;
        this.monV = true;
        this.tueV = true;
        this.wedV = true;
        this.thuV = true;
        this.friV = true;
        this.satV = true;
    }
} 
initSwitch (row:any){
    this.toggleOption = row.Is_Enabled == 'true' ? true : false ;
}

handleSwitchChange(Toggleoption : boolean){
    this.setState({ Toggleoption });
    this.toggleOption = Toggleoption ;
    console.log(this.toggleOption)
    this.forceUpdate();
  }

handleSwitchChangeLogics (cellContent:any, rowIndex : number){
    this.products[rowIndex].Is_Enabled = this.toggleOption
    this.forceUpdate()
}
​
handleCheckboxClick(row: any, rowIndex: number){
    this.setState({
        checked:!this.state.checked
    });
    if(this.state.checked)
    {       
        if(this.schedArrayList.some(item => item.Sched_Id === row.Sched_Id))
        {         
            for(var i = 0; i < this.schedArrayList.length; i++) {
                if(this.schedArrayList[i].Sched_Id === row.Sched_Id) {
                    var index=i
                    this.schedArrayList.splice(index,1)                    
                    break;
                }
            }
        }
        else{
            this.schedArrayList.push({
                "Index": rowIndex,
                "Sched_Id" : row.Sched_Id
            })
        }
            this.setState({
                checked:!this.state.checked        
            });
    }
    console.log(this.schedArrayList)        
}

refrshTable(){
    this.triggerOutcome('refresh');
}
handleClose() {
    this.setState({ show: false });
}
handleShow() {
    this.setState({ show: false });
}
nameChange = (e:any) => {
    this.setState({name: e.target.value});
}

onHourEndChange(hour:string){
    this.setState({hour})
    this.hourSentToComponent = hour ;
}
onhourChangeLogics(rowIndex:number){
    this.products[rowIndex].Hours = this.hourSentToComponent.substring(0,2);
    this.products[rowIndex].Minutes = this.hourSentToComponent.substring(3,5);
    this.forceUpdate();
}

​handleWeekDay(text:String,active:any){
    switch (text){
        case "Sun":
            this.sunV = active;
            break;
        case "Mon":
            this.monV = active;
            break;
        case "Tue":
            this.tueV = active;
            break;
        case "Wed":
            this.wedV = active;
            break;
        case "Thu":
            this.thuV = active;
            break;
        case "Fri":
            this.friV = active;
            break;
        case "Sat":
            this.satV = active;
            break;
    }
    this.forceUpdate()
}
​handleWeekDayLogics(text:String,row:any,rowIndex:any){
    let days = row.Days
    switch (text){
        case "Sun":
            if(this.sunV){
                if (this.products[rowIndex].Days == ""){
                    days = "1"
                }
                else{
                    days=days+ ",1";
                }
          }
          else{
            if (this.products[rowIndex].Days.length<2){
                days = "" ;
            }
            else{
                days=days.replace(",1","");
                days=days.replace("1,","");
            }
          }
            break;
        case "Mon":
            if(this.monV){
                if (this.products[rowIndex].Days == ""){
                    days = "2"
                }
                else{
                    days=days+ ",2";
                }
          }
          else{
            if (this.products[rowIndex].Days.length<2){
                days = "" ;
            }
            else{
                days=days.replace(",2","");
                days=days.replace("2,","");
            }
          }
            break;
        case "Tue":
            if(this.tueV){
                if (this.products[rowIndex].Days == ""){
                    days = "3"
                }
                else{
                    days=days+ ",3";
                }
          }
          else{
            if (this.products[rowIndex].Days.length<2){
                days = "" ;
            }
            else{
                days=days.replace(",3","");
                days=days.replace("3,","");
            }
          }            break;
        case "Wed":
            if(this.wedV){
                if (this.products[rowIndex].Days == ""){
                    days = "4"
                }
                else{
                    days=days+ ",4";
                }
          }
          else{
            if (this.products[rowIndex].Days.length<2){
                days = "" ;
            }
            else{
                days=days.replace(",4","");
                days=days.replace("4,","");
            }
          }
            break;
        case "Thu":
            if(this.thuV){
                if (this.products[rowIndex].Days == ""){
                    days = "5"
                }
                else{
                    days=days+ ",5";
                }
          }
          else{
            if (this.products[rowIndex].Days.length<2){
                days = "" ;
            }
            else{
                days=days.replace(",5","");
                days=days.replace("5,","");
            }
          }            break;
        case "Fri":
            if(this.tueV){
                if (this.products[rowIndex].Days == ""){
                    days = "6"
                }
                else{
                    days=days+ ",6";
                }
          }
          else{
            if (this.products[rowIndex].Days.length<2){
                days = "" ;
            }
            else{
                days=days.replace(",6","");
                days=days.replace("6,","");
            }
          }
            break;
            case "Sat":
            if(this.satV){
                if (this.products[rowIndex].Days == ""){
                    days = "7"
                }
                else{
                    days=days+ ",7";
                }
          }
          else{
            if (this.products[rowIndex].Days.length<2){
                days = "" ;
            }
            else{
                days=days.replace(",7","");
                days=days.replace("7,","");
            }
          }
            break;
    }
    this.products[rowIndex].Days=days;
}

SelecthandleChange (selectedOption : any) {   
    this.forceUpdate();
    this.setState({selectedOption}); 
}

saveHandler(schedArrayList:any)  {        
    let sched_Data_To_Update_Array:any = []
    if (schedArrayList.length == 0){
        Notiflix.Report.Failure('Schedule Save Validation','No process was chosen','Click');
    }
    else{ 
        for(var i = 0; i < schedArrayList.length; i++) {
            let productIndex : number = schedArrayList[i].Index ;
            let sched_Data_To_Update:any =  {} ;

            sched_Data_To_Update["Sched_Id"]=this.products[productIndex].Sched_Id
            sched_Data_To_Update["Process_Id"]=this.products[productIndex].Process_Id
            sched_Data_To_Update["Process_Name"]=this.products[productIndex].Process_Name
            sched_Data_To_Update["Is_Enabled"]=this.products[productIndex].Is_Enabled
            sched_Data_To_Update["Days"]=this.products[productIndex].Days
            sched_Data_To_Update["Hours"]=this.products[productIndex].Hours
            sched_Data_To_Update["Minutes"]=this.products[productIndex].Minutes                          
            sched_Data_To_Update_Array.push(sched_Data_To_Update)
        }  
    this.UpdateSchedule(sched_Data_To_Update_Array);
}
}

async UpdateSchedule(sched_Data_To_Update_Array:any){
    let emptyFlag = false ;
    console.log("array = " + JSON.stringify(sched_Data_To_Update_Array))
    sched_Data_To_Update_Array.forEach((schedRow:any) => {
        emptyFlag = (schedRow.Days == "") ? true : emptyFlag ;
    });
    if (emptyFlag){
        Notiflix.Report.Failure('Schedule Save Validation','Must choose schedule days','Click');
    }
    else{
        let demeObject : any = {} ;
        demeObject ["array"] = sched_Data_To_Update_Array ;
        await fetch("https://boomi.naturalint.com:9090/ws/simple/queryScheduleprocessfixed;boomi_auth=bmF0dXJhbGludGVsbGlnZW5jZS1aV01LSDM6YTY0NDkwYmUtNTZjZS00MDI4LTg3NmQtMmVjMjY5Y2U5ZTA5",
            { 
                method: "POST", 
                body: JSON.stringify(demeObject),
                headers : new Headers({
                    "Accept": "application/json",                
                    "Content-Type": "application/json"
                }),
                credentials: "same-origin",
                mode: 'no-cors'
            })
            this.triggerOutcome('Save');
            window.location.reload(false);  
        }    
}

render(){
    if (this.products.length == 0){
        this.products = [] ;
        let product_element: any = {};
        if (this.loadingState !== eLoadingState.ready) {
            return (<div></div>);
        }
        else {
            const api_request: FlowObjectDataArray = this.fields["BEM:List:Schedules"].value as FlowObjectDataArray;
            api_request.items.forEach((item: FlowObjectData) => {
                let processName = item.properties["Process_Name"].value.toString() ;
                if ((processName.includes("INCLUDES REVENUES"))
                    || (processName.includes("SubidsOnly"))
                    || (processName.includes("Subids+Calls Only")))                
                {
                    product_element = {}
                    Object.keys(item.properties).forEach((key: string) => {
                        switch (key) {
                            case "Sched_Id":
                                product_element["Sched_Id"] = item.properties[key].value;
                                break;
                            case "Process_Name":
                                product_element["Process_Name"] = item.properties[key].value;
                                break;
                            case "Is_Enabled":
                                product_element["Is_Enabled"] = item.properties[key].value;
                                break;
                            case "Days":
                                product_element["Days"] = item.properties[key].value;
                                break;
                            case "Minutes":
                                product_element["Minutes"] = item.properties[key].value;
                                break;
                            case "Hours":
                                product_element["Hours"] = item.properties[key].value;
                                break;
                            case "Process_Id":
                                product_element["Process_Id"] = item.properties[key].value;
                                break;
                        }
                    });
                    this.products.push(product_element)
                }
        });
        }
    }
    const defaultSorted = [{
        dataField: 'Process_Name',
        order: 'asc'
    }];
    const columns = [
        {
            dataField: 'checkbox',
            isDummyField: false,
            text: '',
            editable: false,
            formatter: (cellContent:any,row: any,rowIndex: any) => {
                return (
                    <div className="custom-control custom-checkbox">
                      <CheckBoxComponent     
                            checked={this.state.checked}
                            onChange={()=>this.handleCheckboxClick(row,rowIndex)}
                            cssClass="e-success"
                        />
                </div>              
                );
            },
            headerStyle: () => {
                return { width: '40px' };
            }
        },
        // {s
        //     dataField: 'Is_Enabled',
        //     text: 'Enabled',
        //     sort: true,
        //     editable: false,
        //     formatter: (cellContent: any,row: any, rowIndex: number) => {
        //         this.initSwitch(row);
        //             return (
        //                 <div>
        //                 <SwitchFlow
        //                 toggleOption = {this.toggleOption}
        //                 handleSwitchChange = {this.handleSwitchChange}
        //                 handleSwitchChangeLogics = {()=>this.handleSwitchChangeLogics(cellContent,rowIndex)}
        //                 />   
        //                 </div>                  
        //             )
                 
        //     },
        //     headerStyle: () => {
        //         return { width: '90px' };
        //     }
        // },
        {
            dataField: 'Process_Name',
            text: 'Process',
            sort: true,
            editable: false,
            headerStyle: () => {
                return { width: '300px' };
            }
        },
        {
            dataField: 'Days',
            text: 'Days_hidden',
            hidden: true
        },
        {
            dataField: 'Days_view',
            text: 'Days',
            editable: false,
            formatter: (cellContent: any,row: any, rowIndex: number) => {
                if (cellContent == undefined){
                    this.initDays(row);
                }
                return (                           
                    <div>
                        <WeekDaysPicker text = "Sun" active = {this.sunV} handleWD_Change = {this.handleWeekDay} handleWD_Change_Logics = {() => this.handleWeekDayLogics("Sun",row,rowIndex)}/>
                        <WeekDaysPicker text = "Mon" active = {this.monV} handleWD_Change = {this.handleWeekDay} handleWD_Change_Logics = {() => this.handleWeekDayLogics("Mon",row,rowIndex)}/>
                        <WeekDaysPicker text = "Tue" active = {this.tueV} handleWD_Change = {this.handleWeekDay} handleWD_Change_Logics = {() => this.handleWeekDayLogics("Tue",row,rowIndex)}/>
                        <WeekDaysPicker text = "Wed" active = {this.wedV} handleWD_Change = {this.handleWeekDay} handleWD_Change_Logics = {() => this.handleWeekDayLogics("Wed",row,rowIndex)}/>
                        <WeekDaysPicker text = "Thu" active = {this.thuV} handleWD_Change = {this.handleWeekDay} handleWD_Change_Logics = {() => this.handleWeekDayLogics("Thu",row,rowIndex)}/>
                        <WeekDaysPicker text = "Fri" active = {this.friV} handleWD_Change = {this.handleWeekDay} handleWD_Change_Logics = {() => this.handleWeekDayLogics("Fri",row,rowIndex)}/>
                        <WeekDaysPicker text = "Sat" active = {this.satV} handleWD_Change = {this.handleWeekDay} handleWD_Change_Logics = {() => this.handleWeekDayLogics("Sat",row,rowIndex)}/>
                    </div>
                )
            },
            headerStyle: () => {
                return { width: '450px' };
            }
        },
        {
            dataField: 'HourDP',
            text: 'HourDP',
            editable: false,
            formatter: (cellContent: any,row: any, rowIndex: number) => {
                if (cellContent == undefined){
                    this.initHours(row)
                }
                return (        
                    <HourComp onHourEndChange = {this.onHourEndChange}
                    onhourChangeLogics = {()=>this.onhourChangeLogics(rowIndex)}
                        hourA = {this.hourSentToComponent}/>
                )                
            },
            headerStyle: () => {
                return { width: '180px' };
            }
        },
       
        ]
            const MySearch = (props: any) => {
                let input: any;
                const handleClick = () => {
                    props.onSearch(input.value);
                };
                return (
                    <div>
                        <input id='SearchBar'
                            className="form-control"
                            //style={ { size="" } }
                            placeholder="Search..."
                            type="text"
                            ref={n => input = n}
                            onChange={handleClick}
                        />
                    </div>
                );
            };

    return(
    <div className = "container">
        <div className = "Bem-header">
            <h2> Process Schedule </h2>
        </div> 
        <div className = 'Bem-row'>
            <button className = "btn btn-primary" onClick={()=>
                this.saveHandler(this.schedArrayList)
                //this.UpdateSchedule(this.schedArrayList)
                }>Save</button>
        </div>
    ​        <BootstrapTable
                keyField="id"
                data={this.products}
                columns={columns}
            />
        </div>
             )
        }
}
​
manywho.component.register('SchedulesScreen', SchedulesScreen);
​
export default SchedulesScreen;