import * as React from 'react';
import DatePicker from 'react-datepicker';
var parseISO = require('date-fns/parseISO')



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
    }
   
    render(){
        if (this.state.hourHC != undefined){
            this.hourValue = this.state.hourHC.toTimeString().substring(0,5);
        }
        else {
            this.hourValue = this.props.hourA ;
        }
        return(
            <DatePicker showTimeSelect showTimeSelectOnly timeFormat="HH:mm" value={this.hourValue}
            selected = {this.state.hourHC} 
                            timeIntervals={30} onChange={ this.onChange } /> 
        )
    }
}