const moment = require('../../node_modules/moment');

export const checkBoxClick = (row:any,rowIndex:Number, map:Map<Number,String>) => {
    if (map.get(rowIndex) !== undefined){
        map.delete(rowIndex)
    }
    else {
        map.set(rowIndex , row.guid)
    }
    return (map)
}

export const createGuid = () => {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  export const convertDateFormat = (
    dateString:Date, currentDateFormat:String, newDateFormat:String) => {
        return (
            moment(new Date (dateString), currentDateFormat).format(newDateFormat)
        )
  }
