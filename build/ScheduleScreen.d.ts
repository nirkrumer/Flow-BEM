/// <reference types="react" />
import { FlowPage } from './models/FlowPage';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './ScheduleScreen.css';
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
export declare class SchedulesScreen extends FlowPage {
    node: any;
    schedArrayList: any[];
    constructor(props: any);
    componentDidMount(): Promise<void>;
    moveHappened(xhr: XMLHttpRequest, request: any): void;
    handleSwitchChange(Toggleoption: boolean): void;
    handleCheckboxClick(Sched_Id: any): void;
    refrshTable(): void;
    handleClose(): void;
    handleShow(): void;
    nameChange: (e: any) => void;
    saveHandler(schedArrayList: any, products: any): void;
    UpdateSchedule(sched_Data_To_Update_Array: any): Promise<void>;
    onHourEndChange(hour: any): void;
    initDates(): void;
    noDays(row: any): void;
    handleWeekDay(text: String, active: any, row: any, products: any): void;
    SelecthandleChange(selectedOption: any): void;
    render(): JSX.Element;
}
export default SchedulesScreen;
