/// <reference types="react" />
import { FlowPage } from './models/FlowPage';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './ExecRecordsGrid.css';
export declare class ExecRecordsGrid extends FlowPage {
    autorun: String;
    timerId: any;
    constructor(props: any);
    componentDidMount(): Promise<void>;
    moveHappened(xhr: XMLHttpRequest, request: any): void;
    componentWillUnmount(): Promise<void>;
    handleSwitchChange(Toggleoption: boolean): void;
    refrshTable(): void;
    render(): JSX.Element;
}
export default ExecRecordsGrid;
