import * as React from 'react';
import { FlowPage } from './models/FlowPage';
import { IManywho } from './models/interfaces';
import { FlowObjectDataArray } from './models/FlowObjectDataArray';
import { FlowObjectData} from './models/FlowObjectData';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './ExecRecordsGrid.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
import { eLoadingState } from './models/FlowBaseComponent';
import Switch from "react-switch";

declare const manywho: IManywho;

export class ExecRecordsGrid extends FlowPage {
    autorun : String ;
    timerId : any ;

    constructor(props: any) {
        super(props);
        this.handleSwitchChange = this.handleSwitchChange.bind(this)
        this.refrshTable = this.refrshTable.bind(this)
        this.state = {
            Toggleoption : false,
            input : ''   
        }
    }
    async componentDidMount() {
        await super.componentDidMount();
        (manywho as any).eventManager.addDoneListener(this.moveHappened, this.componentId);
        this.forceUpdate();
        return Promise.resolve();
    }

    moveHappened(xhr: XMLHttpRequest, request: any) {}

    async componentWillUnmount(): Promise<void> {
        (manywho as any).eventManager.removeDoneListener(this.componentId);
        window.clearInterval(this.timerId);
    }

/* **************************************************************************** */

    handleSwitchChange(Toggleoption : boolean){
        this.setState({ Toggleoption });
        this.autorun = Toggleoption ? 'On' : 'Off';
        if (Toggleoption){
            const triggeroutcome_this = this;
            this.timerId = window.setInterval(function(){
                triggeroutcome_this.triggerOutcome('refresh');
                } , 60000)
            }    
        else {
            window.clearInterval(this.timerId);
        }
    }
    refrshTable(){
        this.triggerOutcome('refresh');
    }
        
    render() {
        const products: any = [];
        let product_element: any = {};
        if (this.loadingState !== eLoadingState.ready) {
            return (<div></div>);
        }
        else {
            const api_request: FlowObjectDataArray = this.fields["BEM:List:Exec_API_Request"].value as FlowObjectDataArray;
            api_request.items.forEach((item: FlowObjectData) => {
                product_element = {}
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
                    }
                });
                products.push(product_element)
            });
        }
        const defaultSorted = [{
            dataField: 'startTime',
            order: 'desc'
        }];
        const selectOptions = {
            0: 'QA',
            1: 'Production'
        };
        const { SearchBar, ClearSearchButton } = Search;
        const { ExportCSVButton } = CSVExport;

        const columns = [
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
                                <img src="https://files-manywho-com.s3.amazonaws.com/0ee8638b-e3bf-4f1f-a4fa-b04e0c672f20/cancelled.jpg"
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
        /* const MyExportCSV = (props : any) => {
             const handleClick = () => {
               props.onExport();
             };
             return (
               <div>
                 <button className="btn btn-success" onClick={ handleClick }>Click me to export CSV</button>
               </div>
             );
           };*/
       let inputs:any;
        const MySearch = (props: any) => {
        
            const handleClick = () => {
                props.onSearch(inputs.value);  
                // this.setState (
                //     {input : inputs}            
                // )
            };
            return (
                <div>
                    <input id='SearchBar'
                        className="form-control"
                        style ={{width:"400px"}}
                        placeholder="Search ..."
                        type="text"
                        ref={n => inputs = n}
                        onChange={handleClick}
                    />
                </div>
            );
        };
        
        const Clearbutton = (props: any) => {
            
            const clearhandleClick = () => {
                props.onSearch(inputs.value).onClear();
            }
            return (
                <button className="btn btn-default"
                    onClick={clearhandleClick}>Clear</button>
            )
        }
        /* ********************************************************************************** */
        return (
         <div className = "container">
            <div className = "row" style ={{float:"right" }}>
                <button className = "btn btn-primary" type="button" onClick={this.refrshTable}>Refresh</button>
            </div>
            <br></br><br></br>
            <div className = "row" style ={{float:"right" }}>
               <label>
                    <span style={{ display : "flex",fontSize: "140%" }}> Auto Run</span>
                    <Switch id="toggle" onChange={this.handleSwitchChange} checked={this.state.Toggleoption} 
                       offColor="#000" className="react-switch"/>                        
              </label>
            </div>
            <div className = "row">
                <ToolkitProvider keyField="id"
                    data={products}
                    columns={columns}
                    search
                    exportCSV
                >
                {
                    (props: { csvProps: JSX.IntrinsicAttributes; searchProps: {onClear:JSX.IntrinsicAttributes}; baseProps: JSX.IntrinsicAttributes;}) => (
                        <div>
                            {/* <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton> */}     
                            <MySearch {...props.searchProps} id="SearchBar" />
                            <br></br>
                            <Clearbutton {...props.searchProps.onClear} />
                            <br></br>
                            <br></br>
                            <BootstrapTable  {...props.baseProps} keyField='id' data={products} columns={columns} noDataIndication="Table is Empty"
                              defaultSorted={defaultSorted} filter={filterFactory()}
                            />
                        </div>
                    )
                }
                </ToolkitProvider>
            </div>
        </div>
        );
    }
}

manywho.component.register('ExecRecordsGrid', ExecRecordsGrid);

export default ExecRecordsGrid;