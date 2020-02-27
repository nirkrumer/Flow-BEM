/// <reference types="react" />
import { FlowPage } from './models/FlowPage';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './ExecRecordsGrid.css';
export declare class ExecRecordsGrid extends FlowPage {
    autorun: String;
    timerId: any;
    listmode: String;
    ismoderev: boolean;
    constructor(props: any);
    componentDidMount(): Promise<void>;
    moveHappened(xhr: XMLHttpRequest, request: any): void;
    componentWillUnmount(): Promise<void>;
    onRunTypeProd(e: any): void;
    onRunTypeQA(e: any): void;
    onRunTypeBoth(e: any): void;
    handleSwitchChange(Toggleoption: boolean): void;
    runTypeHandler(selectedRTOption: any): void;
    timeRangeHandler(selectedRangeOption: any): void;
    refreshTable(): Promise<any>;
    flowrefreshTable(): Promise<void>;
    cancelHandler(executionId: any): Promise<void>;
    render(): JSX.Element;
}
export default ExecRecordsGrid;
