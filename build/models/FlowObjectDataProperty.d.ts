import { eContentType } from './FlowField';
import { FlowObjectData, IFlowObjectData } from './FlowObjectData';
import { FlowObjectDataArray } from './FlowObjectDataArray';
export interface IFlowObjectDataProperty {
    contentFormat: string | null;
    contentType: string;
    contentValue: string | number | boolean | null;
    developerName: string;
    objectData: IFlowObjectData[] | null;
    typeElementId: string | null;
    typeElementPropertyId: string;
}
export declare class FlowObjectDataProperty {
    [x: string]: any;
    static newInstance(developerName: string, contentType: eContentType, value: string | number | boolean | FlowObjectData | FlowObjectDataArray): FlowObjectDataProperty;
    private ContentFormat;
    private ContentType;
    private DeveloperName;
    private TypeElementId;
    private TypeElementPropertyId;
    private Value;
    constructor(property: IFlowObjectDataProperty | undefined);
    contentFormat: string;
    contentType: eContentType;
    developerName: string;
    typeElementId: string;
    typeElementPropertyId: string;
    value: string | number | boolean | FlowObjectData | FlowObjectDataArray | undefined;
    clone(): FlowObjectDataProperty;
    iFlowObjectDataProperty(): IFlowObjectDataProperty;
}
