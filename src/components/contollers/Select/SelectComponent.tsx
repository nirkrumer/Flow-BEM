import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

type SelectProps = {
    placeHolder : String,
    onChange : (e:any) => void,
    value : String,
    options : any, // array of objects {String : String}
}

export default function SelectComponent({placeHolder, onChange, value, options} : SelectProps) {
    const animatedComponents = makeAnimated();
    return (
        <div>
            <Select
                name="colors"
                options={options}
                className="basic-multi-select"
                placeholder= {placeHolder}
                classNamePrefix="Select"
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={onChange} 
                value={value}
            />
        </div>
    )
}