import React from 'react';
import Styles from './counterTimer.styles.module.scss'

function DateTimeDisplay({value,type}:any){
  return (
    <div className={Styles.timerText}>
      <span >{type}</span>
      <h4 style={{paddingLeft: "10px"}}>{value}</h4>
    </div>
  );
};

export default DateTimeDisplay;
