import React from 'react';
import { FlowPage } from '../../models/FlowPage';
import { IManywho } from '../../models/interfaces';
import { eLoadingState } from '../../models/FlowBaseComponent';
import { FlowObjectDataArray } from '../../models/FlowObjectDataArray';
import { FlowObjectData} from '../../models/FlowObjectData';
import Notiflix from "notiflix-react";
import BSTable from '../../components/BSTable';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import CheckBox from '../../components/contollers/CheckBox/Checkbox'
import SelectComponent from '../../components/contollers/Select/SelectComponent';
//import { CheckBox } from '@syncfusion/ej2-react-buttons';

declare const manywho: IManywho;

export class Gmailer extends FlowPage {
    
    constructor(props: any) {
        super(props);        

        this.state = {
            checked : false,
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

handleCheckboxClick(row: any, rowIndex: number){
    this.setState({checked:!this.state.checked});
    // if(this.state.checked)
    // {       
    //     if(this.schedArrayList.some(item => item.Sched_Id === row.Sched_Id))
    //     {         
    //         for(var i = 0; i < this.schedArrayList.length; i++) {
    //             if(this.schedArrayList[i].Sched_Id === row.Sched_Id) {
    //                 var index=i
    //                 this.schedArrayList.splice(index,1)                    
    //                 break;
    //             }
    //         }
    //     }
    //     else{
    //         this.schedArrayList.push({
    //             "Index": rowIndex,
    //             "Sched_Id" : row.Sched_Id
    //         })
    //     }
    //     this.setState({checked:!this.state.checked});
    // }
}

selectTypeOnChangeHandler(event: any): () => void {
    //this.setState({methodType})
    console.log(event);
    //console.log(methodType)
    return null
}

render() {
    if (this.loadingState !== eLoadingState.ready) {
        return (<div></div>);
    }
    let products: any = [];
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
        products.push(product_element)                
    });
    const typeOptions = [
        { value: 'days', label: 'days' },
        { value: 'date', label: 'date' }
    ]
    const defaultSorted = [{
        dataField: 'partner',
        order: 'asc'
    }];
    const columns = [
        {
            dataField: 'checkBox',
            formatter: (cellContent:any,row: any,rowIndex: any) => {
                return (
                    <CheckBox     
                    checked={this.state.checked}
                    onChange={()=>this.handleCheckboxClick(row,rowIndex)}
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
                return { width: '400px' };
            }
        },
        {
            dataField: 'partner',
            text: 'partner',
            headerStyle: () => {
                return { width: '250px' };
            }
        },
        {
            dataField: 'mail_date',
            text: 'mailDate',
        },
        {
            dataField: 'days',
            text: 'days',
            headerStyle: () => {
                return { width: '50px' };
            }
        },
        {
            dataField: 'method',
            text: 'method',
            formatter : (row:any) => {
                return(
                    <SelectComponent
                        placeHolder = ''
                        onChange = {(e) => this.selectTypeOnChangeHandler(e)}
                        value = {row.method}
                        options = {typeOptions}                          
                    />
                )
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
                        
            <BSTable products = {products} columns = {columns} defaultSorted = {defaultSorted}> </BSTable>
        </div>
        )
    }
   
}

manywho.component.register('Gmailer', Gmailer);

export default Gmailer;