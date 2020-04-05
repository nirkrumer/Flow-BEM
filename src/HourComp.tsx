import * as React from 'react';
import DatePicker from 'react-datepicker';

export default class WeekDaysPicker extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        //this.toggleClass = this.toggleClass.bind(this)
        this.state = {
            hour: this.props.hour,
        };
    }
    onChange(){
        this.props.onHourEndChange(this.state.hour) ;
    }
    render(){
        return(
            <DatePicker showTimeSelect showTimeSelectOnly timeFormat="HH:mm" value={this.state.hour}
            selected = {this.state.hour}
                            timeIntervals={30} onChange={ this.onChange } /> 
        )
    }
}