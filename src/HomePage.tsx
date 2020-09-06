import React from 'react';
import { FlowPage } from './models/FlowPage';
import { IManywho } from './models/interfaces';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { eLoadingState } from './models/FlowBaseComponent';
import Notiflix from "notiflix-react";
import './design/RunProcess.css'

declare const manywho: IManywho;

export class HomePage extends FlowPage {
    
    constructor(props: any) {
        super(props);        

        this.state = {

        };
    }

/* **************************************************************************************** */
    
    async componentDidMount(){  
        await super.componentDidMount();
        (manywho as any).eventManager.addDoneListener(this.moveHappened, this.componentId);
        this.forceUpdate();
        return Promise.resolve();
    }
    
    moveHappened(xhr: XMLHttpRequest, request: any) {}    
    
    async componentWillUnmount(): Promise<void> {
        (manywho as any).eventManager.removeDoneListener(this.componentId);
    }

/* ************************************************************************************ */    

runIBem = () => { 
    
  }
    render() {

    return (
        <div className = "container"> 
             <div className = "Bem-header">
                <h2> Boomi Hub </h2>
            </div>
            <div className = "Bem-row">       
                        <a href = 'https://flow.manywho.com/0ee8638b-e3bf-4f1f-a4fa-b04e0c672f20/play/DataGrid/?flow-id=92b71cd9-d454-4fd5-9060-771bf0a777b5'>
                            <button id = "I-BEM" onClick 
                            type="button" className = "btn btn-danger" 
                            style = {{display : "iconandtext",padding: "10px 50px",fontSize : "15px"
                        }}> I-BEM </button>                            
                        </a>
            </div>
            <div className = "Bem-row">       
                        <button id = "Splitter" onClick = "window.location='https://flow.manywho.com/0ee8638b-e3bf-4f1f-a4fa-b04e0c672f20/play/DataGrid/?flow-id=92b71cd9-d454-4fd5-9060-771bf0a777b5';"
                        type="button" className = "btn btn-warning" 
                        style = {{display : "iconandtext",padding: "10px 50px",fontSize : "15px"
                    }}> Splitter </button>
            </div>
            <div className = "Bem-row">       
                        <button id = "Settings" onClick = "window.location='https://flow.manywho.com/0ee8638b-e3bf-4f1f-a4fa-b04e0c672f20/play/DataGrid/?flow-id=92b71cd9-d454-4fd5-9060-771bf0a777b5';"
                        type="button" className = "btn btn-success" 
                        style = {{display : "iconandtext",padding: "10px 50px",fontSize : "15px"
                    }}> Settings </button>
            </div>
        </div>
        )
    }
}

manywho.component.register('HomePage', HomePage); 

export default HomePage;