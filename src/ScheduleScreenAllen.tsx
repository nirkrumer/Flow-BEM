import * as React from 'react';
import { FlowPage } from './models/FlowPage';
import { IManywho } from './models/interfaces';
import { FlowObjectDataArray } from './models/FlowObjectDataArray';
import { FlowObjectData, IFlowObjectData } from './models/FlowObjectData';
import { eLoadingState } from './models/FlowBaseComponent';
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

declare const manywho: IManywho;
​
export class SchedulesScreenAllen extends FlowPage {
    node: any;
    schedArrayList:any[]= []
​
    constructor(props: any) {
        super(props);
        }   
    async componentDidMount() {
        await super.componentDidMount();
        (manywho as any).eventManager.addDoneListener(this.moveHappened, this.componentId);
        this.forceUpdate();
        //this.initDates()
        return Promise.resolve();
    }
   
    moveHappened(xhr: XMLHttpRequest, request: any) {
        if ((xhr as any).invokeType === 'FORWARD') {
            // this.forceUpdate();
        }
    }
​/* --------------------------------------------------------------- */


render(){
    const products: any = [];
    let product_element: any = {};
        if (this.loadingState !== eLoadingState.ready) {
        return (<div></div>);
    }
    else {
        product_element = {"Minutes" : "1", "Hours" : "3"};
        products.push(product_element)
        product_element = {"Minutes" : "12", "Hours" : "32"};
        products.push(product_element)
        product_element = {"Minutes" : "14", "Hours" : "34"};
        products.push(product_element)
        product_element = {"Minutes" : "61", "Hours" : "63"};
        products.push(product_element)
        product_element = {"Minutes" : "10","Hours" : "30"};
        products.push(product_element)    
    }
    const columns = [
        {
            dataField: 'Hours',
            text: 'Hours'
        },
        {
            dataField: 'Minutes',
            text: 'Minutes'
        },
        ]

    return(
    <div className = "container">
    ​        <BootstrapTable
                keyField="id"
                data={products}
                columns={columns}
                 cellEdit={ cellEditFactory({mode: 'click',
            //     //blurToSave: true,
            //     afterSaveCell: (oldValue: any, newValue: any, row:any, column: any) => {
            //         if(column.dataField == 'Hours') {
            //             row.Hours = newValue;
            //         }
            //         else{
            //             row.Minutes = newValue;
            //         }
                    
            //     } 
            }) }
            />
        </div>
             )
        }
}
​
manywho.component.register('SchedulesScreenAllen', SchedulesScreenAllen);
​
export default SchedulesScreenAllen;