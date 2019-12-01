import * as React from 'react';
import { FlowAttribute } from './FlowAttribute';
import { FlowDisplayColumn } from './FlowDisplayColumn';
import { FlowField, IFlowField, eContentType } from './FlowField';
import { FlowObjectData, IFlowObjectData} from './FlowObjectData';
import { FlowObjectDataArray } from './FlowObjectDataArray';
import { FlowOutcome, IFlowOutcome } from './FlowOutcome';
import { IComponentProps, IManywho, IObjectData } from './interfaces';
import { IComponentValue } from './interfaces/services/state';
//import {throttle} from 'lodash';
var throttle = require('lodash.throttle');


declare const manywho: IManywho;
declare const $: JQueryStatic;

interface IFlowStateValue {
    contentType: string;
    contentValue: string;
    developerName: string;
    objectData: IObjectData[];
    typeElementDeveloperName: string;
    typeElementId: string;
    typeElementPropertyDeveloperName: string;
    typeElementPropertyId: string;
    valueElementId: string;
}

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

if (!(manywho as any).eventManager) {
    (manywho as any).eventManager = {};
    (manywho as any).eventManager.beforeSendListeners = {};
    (manywho as any).eventManager.doneListeners = {};
    (manywho as any).eventManager.failListeners = {};
    (manywho as any).eventManager.outcomeBeingTriggered;

    (manywho as any).eventManager.beforeSend = (xhr: XMLHttpRequest, request: any) => {
        //(manywho as any).eventManager.beforeSendListeners.forEach((listener: any) => listener(xhr, request));
        for(const key in (manywho as any).eventManager.beforeSendListeners )
        {
            (manywho as any).eventManager.beforeSendListeners[key](xhr, request);
        }
    };

    (manywho as any).eventManager.done = (xhr: XMLHttpRequest, request: any) => {
        //(manywho as any).eventManager.doneListeners.forEach((listener: any) => listener(xhr, request));
        for(const key in (manywho as any).eventManager.doneListeners )
        {
            (manywho as any).eventManager.doneListeners[key](xhr, request);
        }
    };

    (manywho as any).eventManager.fail = (xhr: XMLHttpRequest, request: any) => {
        //(manywho as any).eventManager.failListeners.forEach((listener: any) => listener(xhr, request));
        for(const key in (manywho as any).eventManager.failListeners )
        {
            (manywho as any).eventManager.failListeners[key](xhr, request);
        }
    };

    (manywho as any).eventManager.addBeforeSendListener = (handler: (xhr: XMLHttpRequest, request: any) => void, componentId: string) => {
        (manywho as any).eventManager.beforeSendListeners[componentId] = handler;
    };

    (manywho as any).eventManager.removeBeforeSendListener = (componentId: string) => {
        delete (manywho as any).eventManager.beforeSendListeners[componentId];
    };

    (manywho as any).eventManager.addDoneListener = (handler: (xhr: XMLHttpRequest, request: any) => void, componentId: string) => {
        (manywho as any).eventManager.doneListeners[componentId] = handler;
    };

    (manywho as any).eventManager.removeDoneListener = (componentId: string) => {
        delete (manywho as any).eventManager.doneListeners[componentId];
    };

    (manywho as any).eventManager.addFailListener = (handler: (xhr: XMLHttpRequest, request: any) => void, componentId: string) => {
        (manywho as any).eventManager.failListeners[componentId] = handler;
    };

    (manywho as any).eventManager.removeFailListener = (componentId: string) => {
        delete (manywho as any).eventManager.failListeners[componentId];
    };

    manywho.settings.initialize(null, {
        invoke: {
            beforeSend: (manywho as any).eventManager.beforeSend,
            done: (manywho as any).eventManager.done,
            fail: (manywho as any).eventManager.fail,
        },
    });
}

export enum eLoadingState {
    ready,
    loading,
    saving,
    moving,
    init
}

export class FlowBaseComponent extends React.Component<IComponentProps, any, any> {

    url: string;
    userurl: string;
    valueurl: string;
    private User?: IFlowUser;
    private TenantId: string;
    private StateId: string;
    private FlowKey: string;
    private ComponentId: string;
    private ParentId?: string;
    private Fields: {[key: string]: FlowField} = {};
    private LoadingState: eLoadingState;
    private Attributes: {[key: string]: FlowAttribute} = {};
    private Outcomes: {[key: string]: FlowOutcome} = {};
    private Model?: IFlowModel;
    private IsDesignTime: boolean;

    get tenantId(): string {
        return this.TenantId;
    }

    get stateId(): string {
        return this.StateId;
    }

    get flowKey(): string {
        return this.FlowKey;
    }

    get componentId(): string {
        return this.ComponentId;
    }

    get parentId(): string | undefined {
        return this.ParentId;
    }

    get isReady(): boolean {
        if(this.LoadingState === eLoadingState.ready) {
            return true;
        }
        else {
            return false;
        }
    }

    get loadingState(): eLoadingState {
        return this.LoadingState;
    }

    get outcomes(): {[key: string]: FlowOutcome} | undefined {
        return this.Outcomes;
    }

    get attributes(): {[key: string]: FlowAttribute} | undefined {
        return this.Attributes;
    }

    get fields(): {[key: string]: FlowField} | undefined {
        return this.Fields;
    }

    get model(): IFlowModel | undefined {
        return this.Model;
    }

    get user(): IFlowUser | undefined {
        return this.User;
    }

    get joinURI(): string {
        return window.location.href;
    }

    get isDesignTime(): boolean {
        return this.IsDesignTime;
    }

    getAttribute(attributeName: string, defaultValue?: string): string {
        if (this.attributes[attributeName]) {
            return this.attributes[attributeName].value;
        } else {
            return defaultValue || '';
        }
    }

    constructor(props: any) {
        super(props);

        this.Fields = {};
        this.LoadingState = eLoadingState.init;
        this.loadValues = this.loadValues.bind(this);
        this.dontLoadValues = this.dontLoadValues.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.triggerOutcome = this.triggerOutcome.bind(this);
        this.ComponentId = this.props.id;
        this.ParentId = this.props.parentId;
        this.FlowKey = this.props.flowKey;
        this.Attributes = {};
        this.loadModel = this.loadModel.bind(this);
        this.loadAttributes = this.loadAttributes.bind(this);
        this.loadOutcomes = this.loadOutcomes.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.getStateValue = this.getStateValue.bind(this);
        this.setStateValue = this.setStateValue.bind(this);
        this.getStateValueType = this.getStateValueType.bind(this);
        this.sendCollaborationMessage = this.sendCollaborationMessage.bind(this);
        this.onBeforeSend = this.onBeforeSend.bind(this);
        this.onDone = this.onDone.bind(this);
        this.calculateValue = this.calculateValue.bind(this);

        window.addEventListener('message', this.receiveMessage, false);

        this.loadModel();
        this.loadAttributes();
        this.loadOutcomes();

        const baseUrl = manywho.settings.global('platform.uri') || window.location.origin || 'https://flow.manywho.com';
        this.StateId = manywho.utils.extractStateId(this.props.flowKey);
        this.TenantId = manywho.utils.extractTenantId(this.props.flowKey);

        this.url = `${baseUrl}/api/run/1/state/${this.StateId}/values`;
        this.userurl = `${baseUrl}/api/run/1/state/${this.StateId}/values/03dc41dd-1c6b-4b33-bf61-cbd1d0778fff`;
        this.valueurl = `${baseUrl}/api/run/1/state/${this.StateId}/values/name`;

    }

    onBeforeSend(xhr: XMLHttpRequest, request: any) {
        if(request)
        {
            const oc: FlowOutcome = this.getOutcomeById(request.mapElementInvokeRequest.selectedOutcomeId);
            const oct: FlowOutcome = (manywho as any).eventManager.outcomeBeingTriggered;
            if(oc){
                if(!oct || oct.id !== oc.id)
                {
                    (manywho as any).eventManager.outcomeBeingTriggered = oc;
                }
            }
            
        }
        else
        {
            (manywho as any).eventManager.outcomeBeingTriggered = undefined;
        }


    }

    // this takes a string containing either a literal value or the name of a field surrounded with {{..}}
    // if it's literal it just returns otherwise it gets the value.
    // it can go down levels like val.attribute.subval etc
    // NOTE: there's a good chance timing wise that there are no fields yet
    // so we just return value if any errors are encountered like val === null
    async calculateValue( value: string): Promise<string> {
        // is it replaceable?  starts and ends with {{}}
        if (value.startsWith('{{') && value.endsWith('}}')) {
            // value points to a field, get it's value
            let stripped: string = value.replace('{{', '');
            stripped = stripped.replace('}}', '');

            let val: any;
            let result: string = '';
            // it could be a sub field with parent.child
            const strippedBits: string[] = stripped.split('.');

            // loop over bits
            for (let pos = 0 ; pos < strippedBits.length ; pos++) {
                // pos 0 will set val for any child elements
                if (pos === 0) {
                    if(!this.fields[strippedBits[pos]]) {
                        await this.loadValue(strippedBits[pos]);
                    }
                    val = this.fields[strippedBits[pos]];
                    if (!val) {
                        console.log('The Value [' + strippedBits[pos] + '] was not found, have you included it in your flow');
                        result = value;
                    } else {
                        if (val.ContentType !== eContentType.ContentObject && val.ContentType !== eContentType.ContentList) {
                        result = val.value as string;
                        }
                    }
                } else {
                    // did bits 0 get a val?
                    if (val) {
                        const ele = (val.value as FlowObjectData).properties[strippedBits[pos]];
                        if (ele) {
                            if (ele.contentType === eContentType.ContentObject || ele.contentType === eContentType.ContentList) {
                                val = (val.value as FlowObjectData).properties[strippedBits[pos]].value;
                            } else {
                                result = (val.value as FlowObjectData).properties[strippedBits[pos]].value as string;
                            }
                        } else {
                            result = value;
                        }
                    } else {
                        result = value;
                    }
                }
            }
            return result;
        } else {
            return value;
        }
    }

    onDone(xhr: XMLHttpRequest, request: any) {
        if((manywho as any).eventManager.outcomeBeingTriggered && (manywho as any).eventManager.outcomeBeingTriggered.attributes) {
            
            const outcome: FlowOutcome = (manywho as any).eventManager.outcomeBeingTriggered;
            
            Object.keys((manywho as any).eventManager.outcomeBeingTriggered.attributes).forEach(async (key: string) => {
                const attr: FlowAttribute = (manywho as any).eventManager.outcomeBeingTriggered.attributes[key];
                let targetUrl: FlowAttribute;
                switch(attr.name.toLowerCase()) {
                    case "autoclose":
                        if(attr.value.toLowerCase() === "true"){
                            window.close();
                        }
                        break;

                    case "autoopen":
                            targetUrl = outcome.attributes.AutoOpenUrl || undefined;

                            if(targetUrl && targetUrl.value.length > 0)
                            {
                                let url: string = await this.calculateValue(targetUrl.value);
                                var wnd = window.open(url, "_blank");
                            }
                            else
                            {
                                alert("No 'AutoOpenUrl' specified in the outcome's attributes");
                            }
                            break;

                    case "autonav":
                    case "automove":
                            targetUrl = outcome.attributes.AutoNavUrl || undefined;

                            if(targetUrl && targetUrl.value.length > 0)
                            {
                                let url: string = await this.calculateValue(targetUrl.value);
                                var wnd = window.open(url, "_blank");
                            }
                            else
                            {
                                alert("No 'AutoNavUrl' specified in the outcome's attributes");
                            }
                            break;

                    case "autoprint":
                            window.print();
                            break;
                    
                }
            });

            
        }
        //turn of moving flag
        this.LoadingState = eLoadingState.ready;
        (manywho as any).eventManager.outcomeBeingTriggered = undefined;
    }


    async componentDidMount(): Promise<void> {

        //add outcome manager stuff
        (manywho as any).eventManager.addDoneListener(this.onDone,this.componentId + "_core");
        (manywho as any).eventManager.addBeforeSendListener(this.onBeforeSend,this.componentId + "_core");

        // preserve state
        const flowModel = manywho.model.getComponent(this.ComponentId, this.FlowKey);
        const flowState = manywho.state.getComponent(this.componentId, this.flowKey) || {};

        switch (flowModel.contentType) {
            case 'ContentObject':
            case 'ContentList':
                let objectData: any;
                if (flowState.objectData) {
                    objectData = flowState.objectData;
                    objectData = JSON.parse(JSON.stringify(objectData));
                }

                const newState = { objectData };
                await this.setStateValue(new FlowObjectData(objectData));
                //manywho.state.setComponent(this.componentId, newState, this.flowKey, true);
                break;

            default:
                await this.setStateValue(flowModel.contentValue);
                //flowState.contentValue = flowModel.contentValue;
                break;
        }

        manywho.utils.removeLoadingIndicator('loader');
        return Promise.resolve();
    }

    async componentWillUnmount(): Promise<void> {
        (manywho as any).eventManager.removeBeforeSendListener(this.componentId + "_core");
        (manywho as any).eventManager.removeDoneListener(this.componentId + "_core");
        return Promise.resolve();
    }

    loadOutcome(outcomeId: string) : FlowOutcome{
        if(outcomeId) {
            const outcome = manywho.model.getOutcome(outcomeId, this.props.flowKey);
            if(outcome) {
                this.Outcomes[outcome.developerName] = new FlowOutcome(outcome);
                return this.Outcomes[outcome.developerName];
            }
        }
    }

    loadOutcomes() {

        this.Outcomes = {};

        // add the outcomes from this component
        let outs = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
        for (const outcome of outs) {
            this.Outcomes[outcome.developerName] = new FlowOutcome(outcome);
        }
        // and the ones from the parent page
        outs = manywho.model.getOutcomes('', this.props.flowKey);
        for (const outcome of outs) {
            this.Outcomes[outcome.developerName] = new FlowOutcome(outcome);
        }
    }

    getOutcomeById(outcomeId: string): FlowOutcome | undefined {
        let oc;
        Object.keys(this.outcomes).forEach((key: string) => {
            if(this.outcomes[key].id === outcomeId) {
                oc = this.outcomes[key];
            }
        });
        if(!oc){
            oc = this.loadOutcome(outcomeId);
        }
        return oc;
    }

    loadAttributes() {
        const model = manywho.model.getComponent(this.ComponentId, this.FlowKey);
        // add the attributes
        const attrs = model.attributes;
        if (attrs) {
            for (const key of Object.keys(attrs)) {
                this.Attributes[key] = new FlowAttribute(key, attrs[key]);
            }
        }
    }

    loadModel() {
        const model = manywho.model.getComponent(this.ComponentId, this.FlowKey);
        if (model) {
            this.Model = {
                contentType: model.contentType,
                dataSource:  new FlowObjectDataArray([]),
                developerName: model.developerName,
                displayColumns: [],
                enabled:  model.isEnabled,
                height:  model.height,
                helpInfo:  model.helpInfo,
                hintInfo:  model.hintValue,
                joinUri: this.joinURI,
                label:  model.label,
                maxSize:  model.maxSize,
                multiSelect:  model.isMultiSelect,
                readOnly:  !model.isEditable,
                required:  model.isRequired,
                size:  model.size,
                validationMessage:  model.validationMessage,
                visible:  model.isVisible,
                width: model.width,
            };

            // get the datasource value name
            const ds = model.objectData;
            if (ds) {
                for (const od of ds) {
                    this.Model.dataSource.addItem(new FlowObjectData([od]));
                }
            }

            const cols = model.columns;
            if (cols) {
                for (const col of cols) {
                    this.Model.displayColumns.push(new FlowDisplayColumn(col));
                }
            }
        }
    }

    async loadValue(valueName: string): Promise<void> {
        this.LoadingState = eLoadingState.loading;


        const value: any = manywho.connection.request(this, "", this.valueurl + "/" + valueName , 'GET', this.TenantId, this.StateId, manywho.state.getAuthenticationToken(this.FlowKey), {});
        if(value) {
            this.Fields[value.developerName] = new FlowField(value); 
        }

        this.LoadingState = eLoadingState.ready;

        return Promise.resolve();
    }

    async getResultBodyText(response: any) : Promise<string> {
        return response.text()
        .then((text : string) => {
            if(text.startsWith("\"")) {
                text = text.substr(1);
            }
            if(text.endsWith("\"")) {
                text = text.substr(0, text.length-1);
            }
            return text;
        })
    }

    
    async callRequest(url: string, method: string, data: any, authenticationToken: string): Promise<any> {
        const results: any = [];
        const request: RequestInit = {};

        request.method = method;  
        request.headers = {
            "Content-Type": "application/json",
            "Authorization": authenticationToken,
            "ManyWhoTenant": this.tenantId
        };
        request.credentials= "same-origin";

        if(method === "POST" || method === "PUT") {
            request.body = data;
        }
            
        await fetch(url, request)
        .then(async (response: any) => {
            if(response.status === 200) {
                const json = await this.getResultBodyText(response);
                
                JSON.parse(json).forEach((value : any) => {
                    results.push(value);
                });;

                console.log("Loaded Values");
                return results;
            }
            else {
                //error
                const errorText = await this.getResultBodyText(response);
                console.log("Can't load values - " + errorText);
                return results;
            }
        });
        
    }

    async callRequestOld( url: string, method: string, data: any): Promise<any> {
        let output: any;
        const xhr = await manywho.connection.request(this, null, url , method, this.TenantId, this.StateId, manywho.state.getAuthenticationToken(this.FlowKey), null)

        return xhr;
    }

    async loadValues(): Promise<void> {
        this.LoadingState = eLoadingState.loading;
        this.Fields = {}
        const values: any = await this.callRequestOld(this.url,'GET',{});

        ((values as Array<IFlowStateValue>) || []).map((value: IFlowStateValue) => {
            if(value) {
                this.Fields[value.developerName] = new FlowField(value); 
            }
        });

        const userval = await this.callRequestOld(this.userurl,'GET',{});
        //manywho.connection.request(this, "", this.userurl , 'GET', this.TenantId, this.StateId, manywho.state.getAuthenticationToken(this.FlowKey), {});
        if(userval) {
            const u = new FlowField(userval);
            const props = (u.value as FlowObjectData).properties;
    
            this.User = {
                directoryId: props['Directory Id'].value as string,
                directoryName: props['Directory Name'].value as string,
                email: props['Email'].value as string || 'mark',
                firstName: props['First Name'].value as string,
                groupId: props['Primary Group Id'].value as string,
                groupName: props['Primary Group Name'].value as string,
                id: props['User ID'].value as string,
                ipAddress: props['IP Address'].value as string,
                language: props['Language'].value as string,
                lastName: props['Last Name'].value as string,
                location: props['Location'].value as string,
                roleId: props['Role Id'].value as string,
                roleName: props['Role Name'].value as string,
                status: props['Status'].value as string,
                userName: props['Username'].value as string,
            };
        }
        

        this.LoadingState = eLoadingState.ready;
        return Promise.resolve();
    }

    async dontLoadValues(): Promise<void> {
        this.LoadingState = eLoadingState.ready;
        return Promise.resolve();
    }

    getStateValue(): string | boolean | number | Date | FlowObjectData | FlowObjectDataArray {
        const flowState = manywho.state.getComponent(this.componentId, this.flowKey) || {};
        const flowModel = manywho.model.getComponent(this.ComponentId, this.FlowKey);
        switch (flowModel.contentType) {
            case 'ContentObject':
                return new FlowObjectData(flowState.objectData && flowState.objectData[0]? flowState.objectData[0] : {});

            case 'ContentList':
                return new FlowObjectDataArray(flowState.objectData? flowState.objectData : []);
                break;

            default:
                return flowState.contentValue? flowState.contentValue : "";
                break;
        }
    }

    getStateValueType(): string | boolean | number | Date | FlowObjectData | FlowObjectDataArray {
        const flowState = manywho.state.getComponent(this.componentId, this.flowKey) || {};
        const flowModel = manywho.model.getComponent(this.ComponentId, this.FlowKey);
        switch (flowModel.contentType) {
            case 'ContentObject':
                return new FlowObjectData(flowState.objectData && flowState.objectData[0]? flowState.objectData[0] : {});

            case 'ContentList':
                return new FlowObjectDataArray(flowState.objectData);
                break;

            default:
                return flowState.contentValue? flowState.contentValue : "" ;
                break;
        }
    }

    async setStateValue(value: string | boolean | number | Date | FlowObjectData | FlowObjectDataArray): Promise<void> {
        if(this.LoadingState === eLoadingState.ready) {
            this.LoadingState = eLoadingState.saving;
            const flowModel = manywho.model.getComponent(this.ComponentId, this.FlowKey);
            const flowState = manywho.state.getComponent(this.componentId, this.flowKey) || {};
            let newState: any;

            
            switch (flowModel.contentType) {
                case 'ContentObject':
                    let objectData: any = null;
                    if(value) {
                        objectData = (value as FlowObjectData).iFlowObjectDataArray();
                        objectData = JSON.parse(JSON.stringify(objectData));
                    }
                    newState = { objectData };
                    manywho.state.setComponent(this.componentId, newState, this.flowKey, true);
                    break;

                case 'ContentList':
                    let objectDataArray: any = null;
                    if(value) {
                        objectDataArray = (value as FlowObjectDataArray).iFlowObjectDataArray();
                        objectDataArray = JSON.parse(JSON.stringify(objectDataArray));
                    }
                    
                    newState = { objectDataArray };
                    manywho.state.setComponent(this.componentId, newState, this.flowKey, true);
                    break;

                case 'ContentDate':
                    flowState.contentValue = (value as Date).toISOString();
                    break;

                default:
                    flowState.contentValue = value as string;
                    break;

            }

            this.LoadingState = eLoadingState.ready;

            //manywho.component.handleEvent(this,manywho.model.getComponent(this.ComponentId,this.FlowKey),this.FlowKey,null);
            //await manywho.engine.sync(this.flowKey);

            if(manywho.collaboration.isInitialized(this.flowKey)) {
                //manywho.collaboration.sync(this.flowKey);
                //updateFields.forEach((field: IFlowField) => {
                //    manywho.collaboration.push(this.ComponentId,{"message": {"action":"REFRESH_FIELD","fieldName": field.developerName }},this.flowKey);
                //});
            }
            return Promise.resolve();
        }

        //manywho.component.handleEvent(this,manywho.model.getComponent(this.componentId, this.flowKey),this.FlowKey, this.eventHandled);
         //manywho.engine.sync(this.flowKey);
    }

    eventHandled(a?: any, b?: any) {
        console.log("ping");
    }

    async updateValues(values: FlowField[] | FlowField): Promise<void> {
        this.LoadingState = eLoadingState.saving;
        //this.forceUpdate();

        const updateFields: IFlowField[] = [];

        if(values.constructor.name === FlowField.name) {
            updateFields.push((values as FlowField).iFlowField());
        }
        else
        {
            for (const field of (values as Array<FlowField>)) {
                updateFields.push(field.iFlowField());
            }
        }
        

        await manywho.connection.request(this, null, this.url , 'POST', this.TenantId, this.StateId, manywho.state.getAuthenticationToken(this.FlowKey), updateFields);
        //manywho.component.handleEvent(this,manywho.model.getComponent(this.ComponentId,this.FlowKey),this.FlowKey,null);
        //await manywho.engine.sync(this.flowKey);

        if(manywho.collaboration.isInitialized(this.flowKey)) {
            //manywho.collaboration.sync(this.flowKey);
            updateFields.forEach((field: IFlowField) => {
                manywho.collaboration.push(this.ComponentId,{"message": {"action":"REFRESH_FIELD","fieldName": field.developerName }},this.flowKey);
            });
        }
        this.LoadingState = eLoadingState.ready;
        return Promise.resolve();
    }

    //sends a collaboration message but limited to 1 call every 100ms
    sendCollaborationMessage = throttle(this._sendCollaborationMessage, 100, null);
    _sendCollaborationMessage(message: any){
        if(manywho.collaboration.isInitialized(this.flowKey)) {
            //manywho.collaboration.sync(this.flowKey);
            manywho.collaboration.push(this.ComponentId,{"message": message},this.flowKey);
        }
    };
    
    

    
    //triggers the specified outcome, optionally passes a data object 
    async triggerOutcome(outcomeName: string, data?: IFlowObjectData[]): Promise<void> {
        this.LoadingState = eLoadingState.moving;
        //this.forceUpdate();

        if (!data) {
            data = [];
        }

        let oc: any;
        if (this.outcomes[outcomeName]) {
            oc = this.outcomes[outcomeName].iFlowOutcome();
        }

        if (oc) {
            await manywho.component.onOutcome(oc, data, this.FlowKey);
        } else {
            this.log('Could not find outcome ' + outcomeName);
        }
        return Promise.resolve();
    }

    log(message: string) {
        const now = new Date();
        const time = [('0' + now.getHours()).slice(-2), ('0' + now.getMinutes()).slice(-2),
            ('0' + now.getSeconds()).slice(-2)];
        const timestamp = '[' + time.join(':') + '] ';
        console.log(timestamp + message);
    }

    //helper to silently launch a flow
    async launchFlowSilent(tenant: string, flowId: string, player: string, objectData?: FlowObjectDataArray): Promise<void> {
        const baseUrl = manywho.settings.global('platform.uri') || 'https://flow.manywho.com';
        const url = `${baseUrl}/api/run/1/state`;

        const data: any = {};
        data.id = flowId;
        data.developerName = null;
        data.inputs = objectData ? objectData.iFlowObjectDataArray() : null;
        manywho.connection.request(this, "", url , 'POST', this.TenantId, "", manywho.state.getAuthenticationToken(this.FlowKey), data);
        return Promise.resolve();
    }

    //helper to open a specific flow in a new tab
    async launchFlowTab(tenant: string, flowId: string, player: string, objectData?: FlowObjectDataArray): Promise<void> {
        const baseUrl = manywho.settings.global('platform.uri') || 'https://flow.boomi.com';
        const url = baseUrl + '/' + tenant + '/play/' + player + '?flow-id=' + flowId;

        window.open(url, '_new');
        return Promise.resolve();
    }

    //this will get triggered by the collaboration engine
    async componentDidUpdate(): Promise<void> {
        const state: any = manywho.state.getComponent(this.componentId, this.flowKey) as IComponentValue;
        const message = state.message;
        this.loadModel();

        if(message) {
            manywho.state.setComponent(this.componentId,{"message": {}} as any, this.flowKey, false);
        }
        //&& state.message.action === "RELOADVALUES"
        if(message && message.action ) {
            switch (message.action.toUpperCase()) {
                case 'REFRESH_FIELDS':
                    await this.loadValues();
                    break;
                
                case 'REFRESH_FIELD':
                    await this.loadValue(message.fieldName);
                    break;

                default:
                    break; 
            }
        }
        return Promise.resolve();
   }

   //this is used by other components who might want to send in a generic window message
   //nothing to do with collaboration
    async receiveMessage(message: any): Promise<void> {
        if (message.data.data) {
            const msg = JSON.parse(message.data.data);
            if (msg.action) {
                switch (msg.action.toUpperCase()) {
                    case 'OUTCOME':
                        await this.triggerOutcome(msg.data);
                        break;
                    
                    case 'REFRESH_FIELDS':
                            await this.loadValues();
                            break;
                    
                    case 'REFRESH_FIELD':
                        await this.loadValue(msg.fieldName);
                        break;

                    default:
                        await this.handleMessage(msg);
                        break;
                }
            }
        }
        return Promise.resolve();
    }

    async handleMessage(msg: any): Promise<void> {
        return Promise.resolve();
    }

}
