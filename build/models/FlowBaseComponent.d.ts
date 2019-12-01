import * as React from 'react';
import { FlowAttribute } from './FlowAttribute';
import { FlowDisplayColumn } from './FlowDisplayColumn';
import { FlowField } from './FlowField';
import { FlowObjectData, IFlowObjectData } from './FlowObjectData';
import { FlowObjectDataArray } from './FlowObjectDataArray';
import { FlowOutcome } from './FlowOutcome';
import { IComponentProps } from './interfaces';
interface IFlowUser {
    directoryId: string;
    directoryName: string;
    email: string;
    firstName: string;
    groupId: string;
    groupName: string;
    id: string;
    ipAddress: string;
    language: string;
    lastName: string;
    location: string;
    roleId: string;
    roleName: string;
    status: string;
    userName: string;
}
interface IFlowModel {
    contentType: string;
    dataSource: FlowObjectDataArray;
    developerName: string;
    enabled: boolean;
    height: number;
    helpInfo: string;
    hintInfo: string;
    joinUri: string;
    label: string;
    maxSize: number;
    multiSelect: boolean;
    readOnly: boolean;
    required: boolean;
    size: number;
    validationMessage: string;
    visible: boolean;
    width: number;
    displayColumns: FlowDisplayColumn[];
}
export declare enum eLoadingState {
    ready = 0,
    loading = 1,
    saving = 2,
    moving = 3,
    init = 4
}
export declare class FlowBaseComponent extends React.Component<IComponentProps, any, any> {
    url: string;
    userurl: string;
    valueurl: string;
    private User?;
    private TenantId;
    private StateId;
    private FlowKey;
    private ComponentId;
    private ParentId?;
    private Fields;
    private LoadingState;
    private Attributes;
    private Outcomes;
    private Model?;
    private IsDesignTime;
    readonly tenantId: string;
    readonly stateId: string;
    readonly flowKey: string;
    readonly componentId: string;
    readonly parentId: string | undefined;
    readonly isReady: boolean;
    readonly loadingState: eLoadingState;
    readonly outcomes: {
        [key: string]: FlowOutcome;
    } | undefined;
    readonly attributes: {
        [key: string]: FlowAttribute;
    } | undefined;
    readonly fields: {
        [key: string]: FlowField;
    } | undefined;
    readonly model: IFlowModel | undefined;
    readonly user: IFlowUser | undefined;
    readonly joinURI: string;
    readonly isDesignTime: boolean;
    getAttribute(attributeName: string, defaultValue?: string): string;
    constructor(props: any);
    onBeforeSend(xhr: XMLHttpRequest, request: any): void;
    calculateValue(value: string): Promise<string>;
    onDone(xhr: XMLHttpRequest, request: any): void;
    componentDidMount(): Promise<void>;
    componentWillUnmount(): Promise<void>;
    loadOutcome(outcomeId: string): FlowOutcome;
    loadOutcomes(): void;
    getOutcomeById(outcomeId: string): FlowOutcome | undefined;
    loadAttributes(): void;
    loadModel(): void;
    loadValue(valueName: string): Promise<void>;
    getResultBodyText(response: any): Promise<string>;
    callRequest(url: string, method: string, data: any, authenticationToken: string): Promise<any>;
    callRequestOld(url: string, method: string, data: any): Promise<any>;
    loadValues(): Promise<void>;
    dontLoadValues(): Promise<void>;
    getStateValue(): string | boolean | number | Date | FlowObjectData | FlowObjectDataArray;
    getStateValueType(): string | boolean | number | Date | FlowObjectData | FlowObjectDataArray;
    setStateValue(value: string | boolean | number | Date | FlowObjectData | FlowObjectDataArray): Promise<void>;
    eventHandled(a?: any, b?: any): void;
    updateValues(values: FlowField[] | FlowField): Promise<void>;
    sendCollaborationMessage: any;
    _sendCollaborationMessage(message: any): void;
    triggerOutcome(outcomeName: string, data?: IFlowObjectData[]): Promise<void>;
    log(message: string): void;
    launchFlowSilent(tenant: string, flowId: string, player: string, objectData?: FlowObjectDataArray): Promise<void>;
    launchFlowTab(tenant: string, flowId: string, player: string, objectData?: FlowObjectDataArray): Promise<void>;
    componentDidUpdate(): Promise<void>;
    receiveMessage(message: any): Promise<void>;
    handleMessage(msg: any): Promise<void>;
}
export {};
