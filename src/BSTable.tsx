import * as React from 'react';
import { FlowPage } from './models/FlowPage';
import { IManywho } from './models/interfaces';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider,{ CSVExport, Search ,selectRow ,ColumnToggle} from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


declare const manywho: IManywho;

export class BSTable extends React.Component<any, any> {

    inputs:any;

    constructor(props: any) {
        super(props);
    }
    clearhandler (){
        this.inputs.value = '' ;
    }
    render(){
        if (this.props.is_loading){
            console.log ('now is loading')
        }
        else{           
            const MySearch = (props: any) => {
            const {} = Search;
            const { ExportCSVButton } = CSVExport;
            const handleClick = () => {
            props.onSearch(this.inputs.value);  
            };
                return (
                    <div>
                        <input id='SearchBar'
                            className="form-control"
                            style ={{width:"400px",display: "inline-block", fontSize:"17px"}}
                            placeholder="Search ..."
                            type="text"
                            ref={n => this.inputs = n}
                            onChange={handleClick}
                        />
                    </div>
                );
            };
            
            return(
                <div className = "row">
                    <ToolkitProvider keyField="id"
                        data={this.props.products}
                        columns={this.props.columns}
                        search
                        exportCSV
                    >
                    {
                        (props: { searchProps: { onClear: () => JSX.IntrinsicAttributes; }; baseProps: JSX.IntrinsicAttributes; } ) => (
                            <div>
                                <div className ="col-sm-4" style ={{marginRight:"40px"}}>
                                    <MySearch {...props.searchProps} id="SearchBar" />
                                </div>
                                <div className ="col-sm-1" style ={{marginBottom:"20px"}}>
                                    <button className = "btn btn-default" onClick = {() => {props.searchProps.onClear(); this.clearhandler()}}> clear </button>
                                </div>
                                
                                <BootstrapTable  {...props.baseProps} keyField='id' data={this.props.products} columns={this.props.columns} noDataIndication="Table is Empty"
                                  defaultSorted={this.props.defaultSorted} rowStyle = {this.props.style} filter={filterFactory()}
                                />
                            </div>
                        )
                    }
                    </ToolkitProvider>
                </div>
            )
        }
    }
}
manywho.component.register('BSTable', BSTable);

export default BSTable;