import * as React from 'react';
import './Weekdaypicker.css';


export default class WeekDaysPicker extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.toggleClass = this.toggleClass.bind(this)
        this.state = {
            WDactive: this.props.active,
        };
    }
    toggleClass() {
        this.setState({ WDactive: !this.state.WDactive});
        this.props.handleWD_Change(this.props.text,!this.state.WDactive) ;
        console.log(this.props.text,!this.state.WDactive)
    };

    render() {
        
        return(
            <div className = "sched_days">
                 <h6>
                    <span className={this.state.WDactive ? "weekday weekday-active" : 
                        "weekday weekday-not-active"} onClick = {this.toggleClass}
                    > {this.props.text} 
                    </span></h6>     
            </div>
        )
    }    
}
