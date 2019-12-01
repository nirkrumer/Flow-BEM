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

export class FlowObjectDataProperty {

    static newInstance(developerName: string, contentType: eContentType, value: string | number | boolean | FlowObjectData | FlowObjectDataArray) {

        let cv: string ="";
        let objd: IFlowObjectData[] = [];

        switch (contentType) {
            case eContentType.ContentObject:
                const od: FlowObjectData = value as FlowObjectData;
                objd.push(od.iObjectData());
                break;

            case eContentType.ContentList:
                const oda: FlowObjectDataArray = value as FlowObjectDataArray;
                objd = oda.iFlowObjectDataArray();
                break;

            default:
                cv = value as string;
                break;
        }
        const data: IFlowObjectDataProperty = {
            contentFormat: "",
            contentType: eContentType[contentType],
            contentValue: cv,
            developerName,
            objectData: objd,
            typeElementId: "",
            typeElementPropertyId: "",
        };
        return new this(data);
    }

    private ContentFormat: string = "";
    private ContentType: eContentType = eContentType.unknown;
    private DeveloperName: string = "";
    private TypeElementId: string = "";
    private TypeElementPropertyId: string= "";
    private Value: string | number | boolean | FlowObjectData | FlowObjectDataArray | undefined;

    constructor(property: IFlowObjectDataProperty | undefined) {
        if(property) {
            this.DeveloperName = property.developerName;
            this.ContentType = eContentType[property.contentType as keyof typeof eContentType];
            this.ContentFormat = property.contentFormat? property.contentFormat : "";
            this.TypeElementId = property.typeElementId? property.typeElementId : "";
            this.TypeElementPropertyId = property.typeElementPropertyId;

            switch (this.ContentType) {
                case eContentType.ContentObject:
                    this.Value = property.objectData ? new FlowObjectData(property.objectData) : undefined;
                    break;

                case eContentType.ContentList:
                    this.value = property.objectData ? new FlowObjectDataArray(property.objectData) : new FlowObjectDataArray([]);
                    break;

                default:
                    this.value = property.contentValue? property.contentValue : "" ;
                    break;
            }
        }
    }

    get contentFormat(): string {
            return this.ContentFormat;
        }
    set contentFormat(contentFormat: string) {
            this.contentFormat = contentFormat;
        }

    get contentType(): eContentType {
        return this.ContentType;
        }
    set contentType(contentType: eContentType) {
        this.ContentType = contentType;
        }

    get developerName(): string {
        return this.DeveloperName;
        }
    set developerName(developerName: string) {
        this.DeveloperName = developerName;
        }

    get typeElementId(): string {
        return this.TypeElementId;
        }
    set typeElementId(typeElementId: string) {
        this.TypeElementId = typeElementId;
        }

    get typeElementPropertyId(): string {
        return this.TypeElementPropertyId;
        }
    set typeElementPropertyId(typeElementPropertyId: string) {
        this.TypeElementPropertyId = typeElementPropertyId;
        }

    get value(): string | number | boolean | FlowObjectData | FlowObjectDataArray | undefined {
        switch (this.contentType) {
            case eContentType.ContentNumber:
                return parseFloat(this.Value ? this.Value as string : '0');

            case eContentType.ContentBoolean:
                return new String(this.Value).toLowerCase() === 'true';

            default:
                return this.Value;
        }

    }

    set value(value: string | number | boolean | FlowObjectData | FlowObjectDataArray | undefined) {
        this.Value = value;
        }

    clone() : FlowObjectDataProperty {

        let value: any;
        switch(this.contentType) {
            case eContentType.ContentList: 
                value = new FlowObjectDataArray();
                (this.value as FlowObjectDataArray).items.forEach((item: FlowObjectData) => {
                    (value as FlowObjectDataArray).addItem(item.clone(item.developerName));
                })
                break;

            case eContentType.ContentObject:
                value=(this.value as FlowObjectData).clone((this.value as FlowObjectData).developerName);
                break;
            
            default:
                value = this.value;
        }
        const clone: FlowObjectDataProperty = FlowObjectDataProperty.newInstance(this.developerName, this.contentType, value);
        return clone;
    }

    iFlowObjectDataProperty(): IFlowObjectDataProperty {

        let contentValue: string = "";
        let objectData: IFlowObjectData[] = [];

        switch (this.ContentType) {
            case eContentType.ContentObject:
                const od: FlowObjectData = this.Value as FlowObjectData;

                // if it has no developerName then skip it
                if (od && od.developerName && od.developerName.length > 0) {
                    objectData.push(od.iObjectData());
                }
                break;

            case eContentType.ContentList:
                const oda: FlowObjectDataArray = this.Value as FlowObjectDataArray;
                objectData = oda.iFlowObjectDataArray();
                break;

            default:
                contentValue = this.Value as string;
                break;
        }

        const output: IFlowObjectDataProperty = {
            contentFormat: this.ContentFormat,
            contentType: eContentType[this.ContentType],
            contentValue,
            developerName: this.DeveloperName,
            objectData,
            typeElementId: this.TypeElementId,
            typeElementPropertyId: this.TypeElementPropertyId,
        };
        return output;

    }

}
