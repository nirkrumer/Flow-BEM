import { FlowObjectData, IFlowObjectData } from './FlowObjectData';
import { FlowObjectDataArray } from './FlowObjectDataArray';
export interface IFlowField {
    contentType: string;
    contentValue: string;
    developerName: string;
    objectData: IFlowObjectData[];
    typeElementDeveloperName: string;
    typeElementId: string;
    typeElementPropertyDeveloperName: string;
    typeElementPropertyId: string;
    valueElementId: string;
}
export declare enum eContentType {
    unknown = 0,
    ContentString = 1,
    ContentNumber = 2,
    ContentObject = 3,
    ContentBoolean = 4,
    ContentList = 5,
    ContentPassword = 6,
    ContentContent = 7,
    ContentDateTime = 8,
    ContentEncrypted = 9
}
export declare class FlowField {
    private ContentType;
    private DeveloperName;
    private TypeElementDeveloperName;
    private TypeElementId;
    private TypeElementPropertyDeveloperName;
    private TypeElementPropertyId;
    private ValueElementId;
    private Value;
    readonly contentType: eContentType;
    readonly developerName: string;
    readonly typeElementDeveloperName: string;
    readonly typeElementId: string;
    readonly typeElementPropertyDeveloperName: string;
    readonly typeElementPropertyId: string;
    readonly valueElementId: string;
    value: string | number | Date | boolean | FlowObjectData | FlowObjectDataArray | undefined;
    constructor(field?: IFlowField);
    iFlowField(): IFlowField;
}
