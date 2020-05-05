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

declare const manywho: IManywho;
​
export class SchedulesScreen extends FlowPage {
    node: any;
    schedArrayList:any[]= []
    hourSentToComponent = '';
    products : any[] = [] ;
​
    constructor(props: any) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this)
        this.refrshTable = this.refrshTable.bind(this)
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
        this.onHourEndChange = this.onHourEndChange.bind(this)
        this.initDates = this.initDates.bind(this)
        this.saveHandler = this.saveHandler.bind(this)
        this.UpdateSchedule = this.UpdateSchedule.bind(this)
        this.SelecthandleChange = this.SelecthandleChange.bind(this)
        this.onhourChangeLogics = this.onhourChangeLogics.bind(this)
        this.state = {
            Toggleoption : false,
            checked : false,
            hour : "",
            selectedOption: [],
            
            sun: true,
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: true,
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

handleSwitchChange(Toggleoption : boolean){
    this.setState({ Toggleoption });
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


saveHandler(schedArrayList:any)  {        
    let sched_Data_To_Update_Array:any = []
    if (schedArrayList.length == 0){
        Notiflix.Report.Failure('Schedule Save Validation','No process was chosen','Click');
    }
    else{ 
        for(var i = 0; i < schedArrayList.length; i++) {
            //for(var j = 0; j < this.products.length; j++) {
                //if(schedArrayList[i].Sched_Id===this.products[j].Sched_Id) {                
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
                //}
           //}
        }  
    this.UpdateSchedule(sched_Data_To_Update_Array);
}
}

async UpdateSchedule(sched_Data_To_Update_Array:any){
    console.log("array = " + JSON.stringify(sched_Data_To_Update_Array))
    if (sched_Data_To_Update_Array.length == 0){
        Notiflix.Report.Failure('Schedule Save Validation','No process was chosen','Click');
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

onHourEndChange(hour:string,row:any){
    this.setState({hour})
    this.hourSentToComponent = hour ;
}
onhourChangeLogics(rowIndex:number){
    this.products[rowIndex].Hours = this.hourSentToComponent.substring(0,2);
    this.products[rowIndex].Minutes = this.hourSentToComponent.substring(3,5);
    this.forceUpdate();
    console.log("product in row " + rowIndex + " = " + JSON.stringify(this.products[rowIndex]))
}


initDates(row:any){
    this.setState({hour : row.Hours + ":" + row.Minutes })
    this.hourSentToComponent = row.Hours + ":" + row.Minutes;

}  
noDays (row : any){
    // if((row.days.length<2) && (!active)) { return true;} 
    //     else {return false;}
}    
​handleWeekDay(text:String,active:any,row:any,products:any){
    //this.forceUpdate();
    let days = row.Days
    console.log ("active = " + active)
    

    for(var j = 0; j < products.length; j++) {
        if(this.products[j].Sched_Id==row.Sched_Id)
    {
//     console.log("products Before:",this.products[j].Days)
//     if(this.products[j].Days.length<='2' && active=='false') 
//     {

//     }
//    // console.log("rowindex:",days.rowIndex)
   
    switch (text){
        case "Sun":
            console.log("Before: ",days)
            if(active){
                  days=days+ ",1";
                 
            }
            else{
                 days=days.replace(",1","");
            }
            this.setState({sun:!this.state.sun})
            console.log("day= ",text, "is ", this.state.sun);
            break;
        case "Mon":
            if(active){
                days=days+ ",2";
          }
          else{
               days=days.replace(",2","");
          }
            this.setState({mon:!this.state.mon})
            console.log("day= ",text, "is ", this.state.mon);
            break;
        case "Tue":
            if(active){
                days=days+ ",3";
          }
          else{
               days=days.replace(",3","");
          }
            this.setState({tue:!this.state.tue})
            console.log("day= ",text, "is ", this.state.tue);
            break;
        case "Wed":
            if(active){
                days=days+ ",4";          
            }
          else{
               days=days.replace(",4","");
          }
            this.setState({wed:!this.state.wed})
            console.log("day= ",text, "is ", this.state.wed);
            break;
        case "Thu":
            if(active){
                days=days+ ",5";
          }
          else{
               days=days.replace(",5","");
          }
            this.setState({thu:!this.state.thu})
            console.log("day= ",text, "is ", this.state.thu);
            break;
        case "Fri":
            if(active){
                days=days+ ",6";
          }
          else{
               days=days.replace(",6","");
          }
            this.setState({fri:!this.state.fri})
            console.log("day= ",text, "is ", this.state.fri);
            break;
            case "Sat":
            if(active){
                days=days+ ",7";
          }
          else{
               days=days.replace(",7","");
          }
            this.setState({sat:!this.state.sat})
            console.log("day= ",text, "is ", this.state.sat);
            break;
          }
          this.products[j].Days=days;
          console.log("After :",this.products[j].Days)
         }
        }
        //console.log("products :",this.setState({products:days}))
        //console.log("After :",days)
}
SelecthandleChange (selectedOption : any) {   
    this.forceUpdate();
    this.setState({selectedOption}); 
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
                // if ((processName.includes("INCLUDES REVENUES"))
                //     || (processName.includes("SubidsOnly"))
                //     || (processName.includes("Subids+Calls Only")))                
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
        {
            dataField: 'Is_Enabled',
            text: 'Enabled',
            sort: true,
            editable: false,
            formatter: (cellContent: any) => {
                if(cellContent == false)
                {
                    return (
                        <Switch id="toggle" onChange={this.handleSwitchChange} checked={false}
                         offColor="#000" className="react-switch"/>
                    )
                }
                else{
                    return(
                        <Switch id="toggle" onChange={this.handleSwitchChange} checked={true}
                        offColor="#000" className="react-switch"/>
                    )
                }    
            },
            headerStyle: () => {
                return { width: '90px' };
            }
        },
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
            text: 'Days',
        },
        {
            dataField: 'Days2',
            text: 'Days2',
            editable: false,
            formatter: (cellContent: any,row: any, rowIndex: number) => {
                //let daysBoolArray : boolean [] = [false,false,false,false,false,false,false] ;

                let sun_bool : boolean = row.Days.includes('1') ? true: false;
                let mon_bool : boolean = row.Days.includes('2') ? true: false;
                let tue_bool : boolean = row.Days.includes('3') ? true: false;
                let wed_bool : boolean = row.Days.includes('4') ? true: false;
                let thu_bool : boolean = row.Days.includes('5') ? true: false;
                let fri_bool : boolean = row.Days.includes('6') ? true: false;
                let sat_bool : boolean = row.Days.includes('7') ? true: false;
                if (row.Days == '*'){
                    sun_bool = true;
                    mon_bool = true;
                    tue_bool = true;
                    wed_bool = true;
                    thu_bool = true;
                    fri_bool = true;
                    sat_bool = true;
                }
                
                return (        
                    <div>
                        <WeekDaysPicker text = "Sun" active = {sun_bool} handleWD_Change = {()=>this.handleWeekDay("Sun",sun_bool,row,this.products)} noDays = {()=>this.noDays(row)}/>
                        <WeekDaysPicker text = "Mon" active = {mon_bool} handleWD_Change = {()=>this.handleWeekDay("Mon",mon_bool,row,this.products)} noDays = {()=>this.noDays(row)}/>
                        <WeekDaysPicker text = "Tue" active = {tue_bool} handleWD_Change = {()=>this.handleWeekDay("Tue",tue_bool,row,this.products)} noDays = {()=>this.noDays(row)}/>
                        <WeekDaysPicker text = "Wed" active = {wed_bool} handleWD_Change = {()=>this.handleWeekDay("Wed",wed_bool,row,this.products)} noDays = {()=>this.noDays(row)}/>
                        <WeekDaysPicker text = "Thu" active = {thu_bool} handleWD_Change = {()=>this.handleWeekDay("Thu",thu_bool,row,this.products)} noDays = {()=>this.noDays(row)}/>
                        <WeekDaysPicker text = "Fri" active = {fri_bool} handleWD_Change = {()=>this.handleWeekDay("Fri",fri_bool,row,this.products)} noDays = {()=>this.noDays(row)}/>
                        <WeekDaysPicker text = "Sat" active = {sat_bool} handleWD_Change = {()=>this.handleWeekDay("Sat",sat_bool,row,this.products)} noDays = {()=>this.noDays(row)}/>
                    </div>
                )
            },
            headerStyle: () => {
                return { width: '450px' };
            }
        },
        {
            dataField: 'Hours',
            text: 'Hours'
        },
        {
            dataField: 'Minutes',
            text: 'Minutes'
        },
        {
            dataField: 'HourDP',
            text: 'HourDP',
            editable: false,
            formatter: (cellContent: any,row: any, rowIndex: number) => {
                if (cellContent == undefined){
                    this.initDates(row)
                }
                return (        
                    <HourComp onHourEndChange = {this.onHourEndChange}
                    onhourChangeLogics = {()=>this.onhourChangeLogics(rowIndex)}
                        hourA = {this.hourSentToComponent}/>
                )                
            },
            headerStyle: () => {
                return { width: '200px' };
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