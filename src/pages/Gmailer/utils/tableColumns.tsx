import React from 'react';
import CheckBox from '../../../components/contollers/CheckBox/Checkbox'
import SelectComponent from '../../../components/contollers/Select/SelectComponent';

// const columns = (props : any) => {

//  [
//     {
//         dataField: 'checkBox',
//         formatter: (cellContent:any,row: any,rowIndex: any) => {
//             return (
//                 <CheckBox     
//                 checked={this.state.checked}
//                 onChange={()=>this.handleCheckboxClick(row,rowIndex)}
//                 cssClass="e-success" label = ''
//                 />  
//                 );
//             },
//         headerStyle: () => {
//             return { width: '40px' };
//         },
//     },
//     {
//         dataField: 'header',
//         text: 'header',
//         headerStyle: () => {
//             return { width: '400px' };
//         }
//     },
//     {
//         dataField: 'partner',
//         text: 'partner',
//         headerStyle: () => {
//             return { width: '250px' };
//         }
//     },
//     {
//         dataField: 'mail_date',
//         text: 'mailDate',
//     },
//     {
//         dataField: 'days',
//         text: 'days',
//         headerStyle: () => {
//             return { width: '50px' };
//         }
//     },
//     {
//         dataField: 'method',
//         text: 'method',
//         formatter : (row:any) => {
//             return(
//                 <SelectComponent
//                     placeHolder = ''
//                     onChange = {this.selectTypeOnChangeHandler(this.state.method)}
//                     value = {row.method}
//                     options = {[]}  
//                 />
//             )
//         }
//     }
// ]
// return  columns ;
// }