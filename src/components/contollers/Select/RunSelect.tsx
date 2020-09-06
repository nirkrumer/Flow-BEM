import * as React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default class RunSelect extends React.Component<any, any> {
  
  state : any = {
    selected : []
  };    
  
  constructor(props: any) {
    super(props);
    this.SelecthandleChange = this.SelecthandleChange.bind(this) ;
    }
  SelecthandleChange (selectedOption : React.FormEvent) {
    this.props.SelecthandleChange(selectedOption)
   };

  render(){
    const selected = this.props.selected;
      const animatedComponents = makeAnimated();
      return(
        <div>
          <Select
                isMulti
                name="colors"
                options={this.props.processes_list}
                className="basic-multi-select"
                placeholder='Choose Process...'
                classNamePrefix="Select"
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={this.SelecthandleChange} 
                value={this.state.selectedOption}
            />
      </div>
      )
  }
}