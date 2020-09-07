import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateTimePick2 = (
    onChange : (event:any) => void, 
    selected:String, 
    dateFormat:String, 
    value:String, 
    todayButton:String
    ) => {

    return (
        <DatePicker
            onChange={onChange} 
            selected={selected}
            dateFormat={dateFormat}
            value = {value}    
            todayButton={todayButton}
        />
    )
}

type DateTimePickProps = {
    onChange : (event:any) => void, 
    selected ? :String, 
    dateFormat:String, 
    value:String, 
    todayButton:String
}

export default function DateTimePick(
    {onChange, selected, dateFormat, value, todayButton} : DateTimePickProps) {
        return (
            <DatePicker
                onChange={onChange} 
                selected={selected}
                dateFormat="dd-MM-yyyy"
                value = {value}    
                todayButton={todayButton}
            />
    )
}
