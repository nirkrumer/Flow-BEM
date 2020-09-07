import { FlowObjectDataArray } from '../../../models/FlowObjectDataArray';
import { FlowObjectData} from '../../../models/FlowObjectData';
import {createGuid} from '../../../utils/utils';

export const gmailproductArray = (productArray : [], productList:FlowObjectDataArray) => {

    if (productArray.length == 0){
        productArray = [] ;
        let product_element: any = {};
        const api_request: FlowObjectDataArray = productList;
        api_request.items.forEach((item: FlowObjectData) => {
            product_element = {};
            Object.keys(item.properties).forEach((key: string) => {
                switch (key) {
                    case "header":
                        product_element["header"] = item.properties[key].value;
                        break;
                    case "partner":
                        product_element["partner"] = item.properties[key].value;
                        break;
                    case "mail_date":
                        product_element["mail_date"] = item.properties[key].value;
                        break;
                    case "days":
                        product_element["days"] = item.properties[key].value;
                        break;
                    case "method":
                        product_element["method"] = item.properties[key].value;
                        break;
                    case "aggregated_mail":
                        product_element["aggregated_mail"] = item.properties[key].value;
                        break;                    
                }
            });
            product_element["guid"] = createGuid();
            // productArray.push(product_element)
        });
    }
    return (productArray)
}