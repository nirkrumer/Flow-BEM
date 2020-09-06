/// <reference types="react" />
import { FlowPage } from './models/FlowPage';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './design/RunProcess.css';
import 'react-datepicker/dist/react-datepicker.css';
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
export declare class MP extends FlowPage {
    listmode: String;
    ismoderev: boolean;
    constructor(props: any);
    componentDidMount(): Promise<void>;
    moveHappened(xhr: XMLHttpRequest, request: any): void;
    componentWillUnmount(): Promise<void>;
    onRunTypeBudget(e: any): void;
    onRunTypeAdjustment(e: any): void;
    onRunTypeMapping(e: any): void;
    onRunTypeTargets(e: any): void;
    handleEnvChange(envOption: any): void;
    runProcessexe(): Promise<void>;
    render(): JSX.Element;
}
export default MP;
