import * as React from 'react';
import DatePicker from 'react-datepicker';

export default class HourComp extends React.Component<any, any> {
    
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this)
        this.state = {
            value: this.props.hourA,
        };
    }
    hourValue : String = '' ;

    onChange(hourHC:any){
        this.setState({hourHC})
        const hourSTR = hourHC.toTimeString().substring(0,5);
        this.props.onHourEndChange(hourSTR) ;
        this.props.onhourChangeLogics();
    }
   
    render(){
        if (this.state.hourHC != undefined){
            this.hourValue = this.state.hourHC.toTimeString().substring(0,5);
        }
        else {
            this.hourValue = this.props.hourA ;
        }

        let datePickerObject : object;

        if (this.hourValue.includes('/') || this.hourValue.includes('-')){
            datePickerObject = <DatePicker timeFormat="HH:mm" value={this.hourValue} disabled/> 
        }
        else{
            datePickerObject = <DatePicker showTimeSelect showTimeSelectOnly timeFormat="HH:mm" value={this.hourValue}
            selected = {this.state.hourHC} 
                            timeIntervals={5} onChange={ this.onChange } /> 
        }
        return(
            datePickerObject
        )
    }
}