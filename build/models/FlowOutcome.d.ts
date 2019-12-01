import { FlowAttribute } from './FlowAttribute';
export declare enum ePageActionBindingType {
    Save = "SAVE",
    PartialSave = "PARTIAL_SAVE",
    NoSave = "NO_SAVE"
}
export declare enum ePageActionType {
    New = "NEW",
    Query = "QUERY",
    Insert = "INSERT",
    Update = "UPDATE",
    Upsert = "UPSERT",
    Delete = "DELETE",
    Remove = "REMOVE",
    Add = "ADD",
    Edit = "EDIT",
    Next = "NEXT",
    Back = "BACK",
    Done = "DONE",
    Save = "SAVE",
    Cancel = "CANCEL",
    Apply = "APPLY",
    Import = "IMPORT",
    Close = "CLOSE",
    Open = "OPEN",
    Submit = "SUBMIT",
    Escalate = "ESCALATE",
    Reject = "REJECT",
    Delegate = "DELEGATE"
}
export interface IFlowOutcome {
    attributes: any;
    developerName: string;
    id: string;
    isBulkAction: boolean;
    isOut: boolean;
    label: string;
    order: number;
    pageActionBindingType: ePageActionBindingType;
    pageActionType: ePageActionType;
    pageObjectBindingId: string;
}
export declare class FlowOutcome {
    private Attributes;
    private DeveloperName;
    private Id;
    private IsBulkAction;
    private IsOut;
    private Label;
    private Order;
    private PageActionBindingType;
    private PageActionType;
    private PageObjectBindingId;
    private Outcome;
    readonly developerName: string;
    readonly id: string;
    readonly isBulkAction: boolean;
    readonly isOut: boolean;
    readonly label: string;
    readonly order: number;
    readonly pageActionBindingType: ePageActionBindingType;
    readonly pageActionType: ePageActionType;
    readonly pageObjectBindingId: string;
    readonly attributes: {
        [key: string]: FlowAttribute;
    };
    constructor(outcome: IFlowOutcome);
    iFlowOutcome(): IFlowOutcome;
}
