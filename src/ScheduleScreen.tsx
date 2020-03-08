import * as React from 'react';
import { FlowPage } from './models/FlowPage';
import { IManywho } from './models/interfaces';
import { FlowObjectDataArray } from './models/FlowObjectDataArray';
import { FlowObjectData, IFlowObjectData } from './models/FlowObjectData';
import { eLoadingState } from './models/FlowBaseComponent';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider,{ CSVExport, Search ,selectRow ,ColumnToggle} from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import * as $ from "jquery";
// import {ModalHeader,ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
// import { Input} from 'react-bootstrap';
import Button from '@bit/react-bootstrap.react-bootstrap.button';
import Modal from '@bit/react-bootstrap.react-bootstrap.modal';
import ReactBootstrapStyle from "@bit/react-bootstrap.react-bootstrap.internal.style-links";
import Switch from "react-switch";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ​'./ScheduleScreen.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";


declare const manywho: IManywho;
​
export class SchedulesScreen extends FlowPage {
    node: any;
​
    constructor(props: any) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this)
        this.state = {
            Toggleoption : false,
            show: false,
            hour : ""
               }
        }   
    async componentDidMount() {
        await super.componentDidMount();
        (manywho as any).eventManager.addDoneListener(this.moveHappened, this.componentId);
        //    (manywho as any).eventManager.addBeforeSendListener(this.moveHappening, this.componentId);
        this.forceUpdate();
        return Promise.resolve();

    }
    // async componentWillMount(){
    //     let r = await fetch('api/v_Boomi_Data_Schedules')
    //     let v_Boomi_Data_Schedules= await r.json()
    //     this.setState({v_Boomi_Data_Schedules})
    //   }
​
    handleSwitchChange(Toggleoption : boolean){
        this.setState({ Toggleoption });
      }
​
    moveHappened(xhr: XMLHttpRequest, request: any) {
        if ((xhr as any).invokeType === 'FORWARD') {
            // this.forceUpdate();
        }
    }
​/* --------------------------------------------------------------- */

	handleClose() {
		this.setState({ show: false });
	}
	handleShow() {
		this.setState({ show: true });
    }
    nameChange = (e:any) => {
        this.setState({name: e.target.value});
    }
    onHourEndChange(){

    }
    saveHandler()  {
        let response = fetch("/api/Data_Boomi_Schedules/update" ,
        {
            method: "POST",
            body: JSON.stringify(
                {
                    "Sched_Id": "12121212ttt",
                    "Process_Id":"12345",
                    "Is_Enabled":"Y",
                    "Days": "1,3",
                    "Hours": "22",
                    "Minutes": "12"
                }),
            headers : new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json"
            }),
            credentials: "same-origin",
            mode: 'no-cors'
        })
        console.log(response)
      }
​
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
    const columns = [
        {
            dataField: 'Is_Enabled',
            text: 'Enabled',
            sort: true,
            editable: false,
            formatter: ( row: any) => {
                // if(row == 'true')
                // {
                //     return (
                //         <Switch id="toggle" onChange={this.handleSwitchChange} checked={true}
                //          offColor="#000" className="react-switch"/>
                //     )
                // }
                // else{
                //     return(
                //         <Switch id="toggle" onChange={this.handleSwitchChange} checked={false}
                //         offColor="#000" className="react-switch"/>
                //     )
                // }
                return(
                    <Switch id="toggle" onChange={this.handleSwitchChange} checked={this.state.Toggleoption} 
                       offColor="#000" className="react-switch"/>  
                )
            },
            headerStyle: (column: any, colIndex: any) => {
                return { width: '90px' };
            }
        },
        {
            dataField: 'Process_Name',
            text: 'Process',
            sort: true,
            editable: false
        },
        {
            dataField: 'Days',
            text: 'Days',
            sort: true,
        },
        {
            dataField: 'Days2',
            text: 'Days2',
            sort: true,
            editable: false,
            formatter: () => {
                return (        
                    <div>
                        <label className = 'days'>
                        <CheckBoxComponent></CheckBoxComponent> Sun
                        </label>
                        <label className = 'days'>
                        <CheckBoxComponent></CheckBoxComponent> Mon
                        </label>
                        <label className = 'days'>
                        <CheckBoxComponent></CheckBoxComponent> Tue
                        </label>
                        <label className = 'days'>
                        <CheckBoxComponent></CheckBoxComponent> Wed
                        </label>
                        <label className = 'days'>
                        <CheckBoxComponent></CheckBoxComponent> Thu
                        </label>
                        <label className = 'days'>
                        <CheckBoxComponent></CheckBoxComponent> Fri
                        </label>
                        <label className = 'days'>
                        <CheckBoxComponent></CheckBoxComponent> Sat
                        </label>
                    </div>
                )
            },
            headerStyle: (column: any, colIndex: any) => {
                return { width: '450px' };
            }
        },
        {
            dataField: 'Hours',
            text: 'Hours',
            sort: true
        },
        {
            dataField: 'Minutes',
            text: 'Minutes',
            sort: true
        },
        {
            dataField: 'Hour',
            text: 'Hour',
            sort: true,
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
                clickToSelect: true,
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
        {/* <WeekdayPicker /> */}
        <div className = 'Bem-row'>
            <div className = "col-sm-1">
            {/* <ReactBootstrapStyle />  */}
            {/* <Button variant="primary" onClick={this.handleShow}>
                        Add
                    </Button>
                            <Modal show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Add Schedule</Modal.Title>
                                </Modal.Header>
                                <button className="btn btn-primary">test</button>
                                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={this.handleClose}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                   */}
            </div>
            <div className = "col-sm-6">
                <button className = "btn btn-success"
                onClick={this.saveHandler}>Save</button>
            </div>
            {/* <div>
                <button className="btn btn-default" onClick={ this.handleGetSelectedData }>Get Current Selected Rows</button>
            </div> */}
        </div>
    ​        <BootstrapTable
                // ref={ (n: any) => this.node = n }
                keyField="Id"
                data={products}
                columns={columns}
                //selectRow={selectRow}
                cellEdit={ cellEditFactory({mode: 'click',
                blurToSave: true,
                nonEditableRows: () => [0, 6],
            }) }
            />
        </div>
             )
        }
}
interface ISchedulesProps{
​
}
interface ISchedulesState{
    v_Boomi_Data_Schedules:Array<{Process_Id: any}>

}
​
manywho.component.register('SchedulesScreen', SchedulesScreen);
​
export default SchedulesScreen;