import React from 'react'
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";

type CheckBoxProps = {
    onChange : () => void,
    checked : boolean,
    cssClass : String,
    label : String
}

export default function Checkbox({onChange, checked, cssClass,label}: CheckBoxProps) {
    return (
        <div>
            <CheckBoxComponent     
                checked={checked}
                onChange={onChange}
                cssClass={cssClass}
                label = {label}
            />
        </div>
    )
}