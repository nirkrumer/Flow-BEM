import * as React from 'react';
import { FlowPage } from './models/FlowPage';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './RunProcess.css';
import 'react-datepicker/dist/react-datepicker.css';
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
export declare class RunProcess extends FlowPage {
    listmode: String;
    ismoderev: boolean;
    chosenProcesses: String[];
    constructor(props: any);
    componentDidMount(): Promise<void>;
    moveHappened(xhr: XMLHttpRequest, request: any): void;
    componentWillUnmount(): Promise<void>;
    onRunTypeRevChanged(e: any): void;
    onRunTypeSidChanged(e: any): void;
    onRunTypeFetchChanged(e: any): void;
    SelecthandleChange(selectedOption: React.FormEvent): void;
    handleCheckboxClick(): void;
    onDateStartChange(startDate: any): void;
    onDateEndChange(endDate: any): void;
    initDates(): void;
    handleBillingClick(): void;
    handleEnvChange(envOption: any): void;
    runProcessexe(processesToRun: any, env: String): Promise<void>;
    render(): JSX.Element;
}
export default RunProcess;
