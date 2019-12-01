import { FlowObjectDataProperty, IFlowObjectDataProperty } from './FlowObjectDataProperty';
import { IObjectData } from './interfaces';
export interface IFlowObjectData {
    developerName: string;
    externalId: string;
    internalId: string;
    isSelected: boolean;
    order: number;
    properties: IFlowObjectDataProperty[];
}
export declare class FlowObjectData {
    private DeveloperName;
    private ExternalId;
    private InternalId;
    private IsSelected;
    private Order;
    private Properties;
    developerName: string;
    externalId: string;
    internalId: string;
    isSelected: boolean;
    order: number;
    readonly properties: {
        [key: string]: FlowObjectDataProperty;
    };
    constructor(data?: IFlowObjectData[]);
    static newInstance(developerName: string): FlowObjectData;
    addProperty(newProperty: FlowObjectDataProperty): void;
    removeProperty(key: string): void;
    clone(newTypeName?: string): FlowObjectData;
    iObjectData(): IObjectData;
    iFlowObjectDataArray(): IFlowObjectData[];
}
