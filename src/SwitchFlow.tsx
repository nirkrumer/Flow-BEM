import * as React from 'react';
import ​'./ScheduleScreen.css';
import Switch from "react-switch";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";

export default class SwitchFlow extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.toggleClass = this.toggleClass.bind(this)
        this.state = {
            swToggleOption : this.props.toggleOption
        };
    }
    toggleClass(swToggleOption:any) {
        this.setState({swToggleOption})
        this.props.handleSwitchChange(swToggleOption) ;
        this.props.handleSwitchChangeLogics() ;
    };

    render() {
        return(
            <Switch id="toggle" onChange={this.toggleClass} checked={this.state.swToggleOption}
                         offColor="#000" className="react-switch"/>
        )
    }    
}
