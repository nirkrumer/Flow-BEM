/// <reference types="react" />
import { FlowPage } from '../models/FlowPage';
export declare class TestAPI extends FlowPage {
    runSimpleAtomWs(): Promise<void>;
    runFlowAtomWs(): Promise<void>;
    runDirectlyAPI(): Promise<void>;
    runFakeAPI(): Promise<void>;
    render(): JSX.Element;
}
export default TestAPI;
