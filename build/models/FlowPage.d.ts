import { FlowBaseComponent } from './FlowBaseComponent';
import { IFlowObjectData } from './FlowObjectData';
export declare class FlowPage extends FlowBaseComponent {
    constructor(props: any);
    componentDidMount(): Promise<void>;
    componentDidUpdate(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    triggerOutcome(outcomeName: string, data?: IFlowObjectData[]): Promise<void>;
    reloadValues(xhr: XMLHttpRequest, request: any): Promise<void>;
}
