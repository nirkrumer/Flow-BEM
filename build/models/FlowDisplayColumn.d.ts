export interface IFlowDisplayColumn {
    componentType: string;
    contentFormat: string;
    contentType: string;
    developerName: string;
    isDisplayValue: boolean;
    isEditable: boolean;
    label: string;
    order: number;
    typeElementPropertyId: string;
    typeElememtPropertyToDisplayId: string;
}
export declare class FlowDisplayColumn {
    private ComponentType;
    private ContentFormat;
    private ContentType;
    private DeveloperName;
    private Visible;
    private ReadOnly;
    private Label;
    private DisplayOrder;
    private TypeElementPropertyId;
    private TypeElememtPropertyToDisplayId;
    private Column;
    readonly componentType: string;
    readonly contentFormat: string;
    readonly contentType: string;
    readonly developerName: string;
    readonly visible: boolean;
    readonly readOnly: boolean;
    readonly label: string;
    readonly displayOrder: number;
    readonly typeElementPropertyId: string;
    readonly typeElememtPropertyToDisplayId: string;
    constructor(column: IFlowDisplayColumn);
    iFlowDisplayColumn(): IFlowDisplayColumn;
}
