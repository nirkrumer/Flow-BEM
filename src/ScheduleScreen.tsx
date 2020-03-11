import * as React from 'react';
import { FlowPage } from './models/FlowPage';
import { IManywho } from './models/interfaces';
import { FlowObjectDataArray } from './models/FlowObjectDataArray';
import { FlowObjectData, IFlowObjectData } from './models/FlowObjectData';
import { eLoadingState } from './models/FlowBaseComponent';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider,{ CSVExport, Search ,selectRow ,ColumnToggle} from 'react-bootstrap-table2-toolkit';
// import {ModalHeader,ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
// import { Input} from 'react-bootstrap';
import Switch from "react-switch";
import DatePicker from 'react-datepicker';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-datepicker/dist/react-datepicker.css';
import ​'./ScheduleScreen.css';

import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import WeekDaysPicker from './WeekDaysPicker';

declare const manywho: IManywho;
​
export class SchedulesScreen extends FlowPage {
    node: any;
    schedArrayList:any[]= []
​
    constructor(props: any) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this)
        this.refrshTable = this.refrshTable.bind(this)
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
        this.selectedRowClass = this.selectedRowClass.bind(this);
        this.onHourEndChange = this.onHourEndChange.bind(this)
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.initDates = this.initDates.bind(this)
        this.UpdateSchedule = this.UpdateSchedule.bind(this)
        this.state = {
            Toggleoption : false,
            checked : false,
            show: false,
            id: 0,
            hour : "",
            time: 0,
            
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
        this.initDates()
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
handleCheckboxClick(Sched_Id: any){
    let sched_Data:any =  {}
    sched_Data["Sched_Id"]=Sched_Id
    this.setState({
        checked:!this.state.checked
    });
    if(this.state.checked)
    {       
        if(this.schedArrayList.some(item => item.Sched_Id === Sched_Id))
        {
            
            for(var i = 0; i < this.schedArrayList.length; i++) {
                if(this.schedArrayList[i].Sched_Id === Sched_Id) {
                    var index=i
                    this.schedArrayList.splice(index,1)                    
                    break;
                }
            }
        }
        else{
            this.schedArrayList.push(sched_Data)
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

selectedRowClass(row: { id: number; }, isSelect: any) {
    if (isSelect) {
        if (row.id >= 3) {
            return 'bigger-than-three-select-row';
        } else {
            return 'less-than-three-select-row';
        }
    } else {
        return '';
    }
}

saveHandler(schedArrayList:any,products:any)  {        
    let sched_Data_To_Update_Array:any = []

    for(var i = 0; i < schedArrayList.length; i++) {
        for(var j = 0; j < products.length; j++) {
          if(schedArrayList[i].Sched_Id===products[j].Sched_Id) {    
           
            let sched_Data_To_Update:any =  {}

            sched_Data_To_Update["Sched_Id"]=products[j].Sched_Id
            sched_Data_To_Update["Process_Id"]=products[j].Process_Id
            sched_Data_To_Update["Process_Name"]=products[j].Process_Name
            sched_Data_To_Update["Is_Enabled"]=products[j].Is_Enabled
            sched_Data_To_Update["Days"]=products[j].Days
            sched_Data_To_Update["Hours"]=products[j].Hours
            sched_Data_To_Update["Minutes"]=products[j].Minutes                          
            sched_Data_To_Update_Array.push(sched_Data_To_Update)
            }
       }
    }
    console.log(sched_Data_To_Update_Array)
    this.UpdateSchedule(sched_Data_To_Update_Array);
}

async UpdateSchedule(sched_Data_To_Update_Array:any){
    this.fields['BEM:Update_Schedules_List'].value = sched_Data_To_Update_Array as FlowObjectDataArray
    this.updateValues([this.fields['BEM:Update_Schedules_List']]);
    await this.triggerOutcome('Save');
    window.location.reload(false);  
}

onHourEndChange(hour:any){
  //console.log(new_hour)
    this.setState({hour})
    this.forceUpdate();
    console.log(hour)
}

handleTimeChange(time: any) {
    console.log(time);     // <- prints "3600" if "01:00" is picked
    this.setState({ time });
}

initDates(){
    this.setState({time:this.state.Hours})
    console.log(this.state.Hours)
}  
    
​handleWeekDay(text:String,active:any){
    //this.forceUpdate();
    switch (text){
        case "Sun":
            this.setState({sun:!this.state.sun})
            console.log("day= ",text, "is ", this.state.sun);
            break;
        case "Mon":
            this.setState({mon:!this.state.mon})
            console.log("day= ",text, "is ", this.state.mon);
            break;
        case "Tue":
            this.setState({tue:!this.state.tue})
            console.log("day= ",text, "is ", this.state.tue);
            break;
        case "Wed":
            this.setState({wed:!this.state.wed})
            console.log("day= ",text, "is ", this.state.wed);
            break;
        case "Thu":
            this.setState({thu:!this.state.thu})
            console.log("day= ",text, "is ", this.state.thu);
            break;
        case "Fri":
            this.setState({fri:!this.state.fri})
            console.log("day= ",text, "is ", this.state.fri);
            break;
        case "Sat":
            this.setState({sat:!this.state.sat})
            console.log("day= ",text, "is ", this.state.sat);
            break;
        
    }
}
render(){
    const products: any = [];
    let product_element: any = {};
        if (this.loadingState !== eLoadingState.ready) {
        return (<div></div>);
    }
    else {
        const api_request: FlowObjectDataArray = this.fields["BEM:List:Schedules"].value as FlowObjectDataArray;
      //  console.log(api_request)
       api_request.items.forEach((item: FlowObjectData) => {
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
            }
        });
        products.push(product_element)
    });
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
            formatter: (row: any) => {
                return (
                    <div className="custom-control custom-checkbox">
                      <CheckBoxComponent     
                            checked={this.state.checked}
                            onChange={()=>this.handleCheckboxClick(row.Sched_Id)}
                            cssClass="e-success"
                        />
                </div>              
                );
            },
        },
        {
            dataField: 'Is_Enabled',
            text: 'Enabled',
            sort: false,
            editable: false,
            formatter: ( row: any) => {
                if(row == 'false')
                {
                    return (
                        <Switch id="toggle" onChange={this.handleSwitchChange} checked={false}
                         offColor="#000" className="react-switch"/>
                    )
                }
                else{
                    return(
                        <Switch id="toggle" onChange={this.handleSwitchChange} checked={false}
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
            sort: false,
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
            formatter: (row: any) => {
                return (        
                    <div>
                        <WeekDaysPicker text = "Sun" active = {false} handleWD_Change = {()=>this.handleWeekDay("Sun",this.state.sun)}/>
                        <WeekDaysPicker text = "Mon" active = {false} handleWD_Change = {()=>this.handleWeekDay("Mon",this.state.mon)}/>
                        <WeekDaysPicker text = "Tue" active = {false} handleWD_Change = {()=>this.handleWeekDay("Tue",this.state.tue)}/>
                        <WeekDaysPicker text = "Wed" active = {false} handleWD_Change = {()=>this.handleWeekDay("Wed",this.state.wed)}/>
                        <WeekDaysPicker text = "Thu" active = {false} handleWD_Change = {()=>this.handleWeekDay("Thu",this.state.thu)}/>
                        <WeekDaysPicker text = "Fri" active = {false} handleWD_Change = {()=>this.handleWeekDay("Fri",this.state.fri)}/>
                        <WeekDaysPicker text = "Sat" active = {false} handleWD_Change = {()=>this.handleWeekDay("Sat",this.state.sat)}/>
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
            dataField: 'Hour',
            text: 'Hour',
            editable: false,
            formatter: () => {
                return (        
            <DatePicker showTimeSelect showTimeSelectOnly timeFormat="HH:mm" value={this.state.hour}
            selected = {this.state.hour}
                            timeIntervals={30} onChange={ this.onHourEndChange } />
                )}
        }
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
            const selectRow = {
                mode: 'checkbox',
                clickToSelect: false,
                onSelect: (row: { id: any; }, isSelect: any, rowIndex: any, e: any) => {
                  console.log(row.id);
                  console.log(isSelect);
                  console.log(rowIndex);
                  console.log(e);
                },
                onSelectAll: (isSelect: any, rows: any, e: any) => {
                  console.log(isSelect);
                  console.log(rows);
                  console.log(e);
                }
          };

    return(
    <div className = "container">
        <div className = "Bem-header">
            <h2> Process Schedule </h2>
        </div> 
        <div className = 'Bem-row'>
            <button className = "btn btn-primary" onClick={()=>this.saveHandler(this.schedArrayList,products)}>Save</button>
        </div>
    ​        <BootstrapTable
                keyField="id"
                data={products}
                columns={columns}
                cellEdit={ cellEditFactory({mode: 'click'
                //blurToSave: true,
            }) }
            />
        </div>
             )
        }
}
​
manywho.component.register('SchedulesScreen', SchedulesScreen);
​
export default SchedulesScreen;