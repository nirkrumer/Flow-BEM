import React from 'react';
import { FlowPage } from '../../models/FlowPage';
import { IManywho } from '../../models/interfaces';
import { eLoadingState } from '../../models/FlowBaseComponent';
import { FlowObjectDataArray } from '../../models/FlowObjectDataArray';
import { FlowObjectData} from '../../models/FlowObjectData';
import Notiflix from "notiflix-react";
import BSTable from '../../components/BSTable';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import CheckBox from '../../components/contollers/CheckBox/Checkbox'
import SelectComponent from '../../components/contollers/Select/SelectComponent';
import DateTimePick, {DateTimePick2} from '../../components/contollers/DateTimePick/DateTimePick';
import {createGuid, checkBoxClick, convertDateFormat} from '../../Utils/Utils';
import * as Constants from '../../Utils/Constants';

declare const manywho: IManywho;

export class Gmailer extends FlowPage {
    
    products : any[] = [] ;
    tableIndexMap:Map<Number,String>

    constructor(props: any) {
        super(props);        
        this.tableIndexMap = new Map<Number,String>() ;
        this.state = {
            cbChecked : false,
            methodType : ''
        };
    }

/* **************************************************************************************** */
    
async componentDidMount(){  
    await super.componentDidMount();
    (manywho as any).eventManager.addDoneListener(this.moveHappened, this.componentId);
    Notiflix.Notify.Init({fontSize:"17px",borderRadius:"10px",distance:"80px",});
    this.forceUpdate();
    return Promise.resolve();
}

moveHappened(xhr: XMLHttpRequest, request: any) {}    

async componentWillUnmount(): Promise<void> {
    (manywho as any).eventManager.removeDoneListener(this.componentId);
}

/* ************************************************************************************ */    

checkBoxClickHandler(row:any, rowIndex: any){
    this.tableIndexMap = checkBoxClick(row,rowIndex,this.tableIndexMap)
    console.log(`checked indexMap = ${JSON.stringify(this.tableIndexMap)}`)
    console.log(`row values = ${JSON.stringify(this.products[rowIndex])}`)
}

selectTypeOnChangeHandler(eventValue: any, rowIndex:any ) {
    this.products[rowIndex].method = eventValue.value
    console.log(`method = ${this.products[rowIndex].method}
    , eventValue = ${JSON.stringify(eventValue)}`)
    this.forceUpdate();
}

dateTimeHandler(eventValue: any, rowIndex:any ) {
    let newValue = convertDateFormat(eventValue,'YYYY-MM-ddTHH:mm:ss.SSS', 'MM/DD/yyyy');
    this.products[rowIndex].mail_date = newValue
    this.forceUpdate();
}

render() {
    if (this.loadingState !== eLoadingState.ready) {
        return (<div></div>);
    }
    if (this.products.length == 0){
        this.products = [] ;
        let product_element: any = {};
        const api_request: FlowObjectDataArray = this.fields["BEM:List:Mails"].value as FlowObjectDataArray;
        api_request.items.forEach((item: FlowObjectData) => {
            product_element = {};
            Object.keys(item.properties).forEach((key: string) => {
                switch (key) {
                    case "header":
                        product_element["header"] = item.properties[key].value;
                        break;
                    case "partner":
                        product_element["partner"] = item.properties[key].value;
                        break;
                    case "mail_date":
                        product_element["mail_date"] = item.properties[key].value;
                        break;
                    case "days":
                        product_element["days"] = item.properties[key].value;
                        break;
                    case "method":
                        product_element["method"] = item.properties[key].value;
                        break;
                    case "aggregated_mail":
                        product_element["aggregated_mail"] = item.properties[key].value;
                        break;                    
                }
            });
            product_element["guid"] = createGuid();
            this.products.push(product_element)                
        });
    }
    const defaultSorted = [{
        dataField: 'partner',
        order: 'asc'
    }];
    const columns = [
        {
            dataField: 'checkBox',
            formatter: (cellContent:any,row: any,rowIndex: Number) => {
                return (
                    <CheckBox     
                    checked={this.state.cbChecked}
                    onChange={() => this.checkBoxClickHandler(row,rowIndex)}
                    cssClass="e-success" label = ''
                    />  
                    );
                },
            headerStyle: () => {
                return { width: '40px' };
            },
        },
        {
            dataField: 'header',
            text: 'header',
            headerStyle: () => {
                return {width:'400px'};
            }
        },
        {
            dataField: 'partner',
            text: 'partner',
            headerStyle: () => {
                return {width:'250px'};
            }
        },
        {
            dataField: 'mail_date',
            text: 'mailDate',
            headerStyle: () => {
                return {width:'200px'};
            },
            formatter : (cellContent:any,row: any,rowIndex: any) => {
                return(
                    <DateTimePick 
                    onChange={(event) => this.dateTimeHandler(event,rowIndex)} 
                    dateFormat="dd-MM-yyyy"
                    value = {this.products[rowIndex].mail_date}
                    todayButton="Today" />
                )
            }
        },
        {
            dataField: 'days',
            text: 'days',
            headerStyle: () => {
                return {width:'50px'};
            }
        },
        {
            dataField: 'method_view',
            text: 'method',
            formatter : (cellContent:any,row: any,rowIndex: any) => {
                return(
                    <SelectComponent
                        placeHolder = ''
                        onChange = {(event) => this.selectTypeOnChangeHandler(event, rowIndex)}
                        value = {[{
                            "value" : this.products[rowIndex].method,
                            "label" : this.products[rowIndex].method}
                        ]
                        }
                        options = {Constants.GMAILER_SELECT_LIST}                          
                    />
                )
            },
            headerStyle: () => {
                return {width:'100px'};
            }
        },
        {
            dataField: 'aggregated_mail',
            text: 'aggregated mail'
            
        },
    ];
    return (
        <div className = "container"> 
             <div className = "Bem-header">
                <h2> Gmailer </h2>
            </div>
                        
            <BSTable products = {this.products} columns = {columns} defaultSorted = {defaultSorted}> </BSTable>
        </div>
        )
    }
   
}

manywho.component.register('Gmailer', Gmailer);

export default Gmailer;