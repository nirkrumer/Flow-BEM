/// <reference types="react" />
import { FlowPage } from './models/FlowPage';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './ScheduleScreen.css';
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
export declare class SchedulesScreen extends FlowPage {
    node: any;
    constructor(props: any);
    componentDidMount(): Promise<void>;
    handleSwitchChange(Toggleoption: boolean): void;
    moveHappened(xhr: XMLHttpRequest, request: any): void;
    handleClose(): void;
    handleShow(): void;
    nameChange: (e: any) => void;
    onHourEndChange(): void;
    saveHandler(): void;
    render(): JSX.Element;
}
export default SchedulesScreen;
