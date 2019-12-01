import * as React from 'react';
import { FlowPage } from './models/FlowPage';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
export declare class RunProcess extends FlowPage {
    listmode: String;
    ismoderev: boolean;
    constructor(props: any);
    componentDidMount(): Promise<void>;
    moveHappened(xhr: XMLHttpRequest, request: any): void;
    componentWillUnmount(): Promise<void>;
    onRunTypeRevChanged(e: any): void;
    onRunTypeSidChanged(e: any): void;
    onRunTypeFetchChanged(e: any): void;
    SelecthandleChange(selectedOption: React.FormEvent): void;
    runProcessexe(): void;
    render(): JSX.Element;
}
export default RunProcess;
