/// <reference types="react" />
import { FlowPage } from './models/FlowPage';
export declare class SchedulesScreenAllen extends FlowPage {
    node: any;
    schedArrayList: any[];
    constructor(props: any);
    componentDidMount(): Promise<void>;
    moveHappened(xhr: XMLHttpRequest, request: any): void;
    render(): JSX.Element;
}
export default SchedulesScreenAllen;
