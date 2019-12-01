import { FlowBaseComponent } from './FlowBaseComponent';
import { IFlowObjectData } from './FlowObjectData';
import {  IManywho } from './interfaces';

declare const manywho: IManywho;
declare const $: JQueryStatic;

export class FlowPage extends FlowBaseComponent {

    constructor(props: any) {
        super(props);
        this.reloadValues = this.reloadValues.bind(this);
    }

    // the FlowPage automatically gets values
    async componentDidMount(): Promise<void> {
        await super.componentDidMount();
        (manywho as any).eventManager.addDoneListener(this.reloadValues,this.componentId + "_PG");
        //since we are a page we now load all values
        await this.loadValues();
        //this.forceUpdate();
        return Promise.resolve();
        
    }

    async componentDidUpdate(): Promise<void> {
        await super.componentDidUpdate();
    }

    async componentWillUnmount(): Promise<void> {
        await super.componentWillUnmount();
        (manywho as any).eventManager.removeDoneListener(this.componentId + "_PG");
        return Promise.resolve();
    }
    //
    async triggerOutcome(outcomeName: string, data?: IFlowObjectData[]): Promise<void> {
        await super.triggerOutcome(outcomeName, data);
        return Promise.resolve();
    }

    async reloadValues(xhr: XMLHttpRequest, request: any): Promise<void> {
        await this.loadModel();
        await this.loadValues();
        await this.forceUpdate();
        return Promise.resolve();
        
    }
}
