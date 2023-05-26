import { useCountDown } from '@/hooks/useCountDown'
import React from 'react'
import DateTimeDisplay from './DateTimeDisplay'

function ExpiredNotice() {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

function ShowCounter({ days, hours, minutes, seconds }: any) {
  return (
    <div>
      <DateTimeDisplay value={days} type={'Days'} />:
     
      <DateTimeDisplay value={hours} type={'Hours'} />:
      
      <DateTimeDisplay value={minutes} type={'Minutes'} />:
     
      <DateTimeDisplay value={seconds} type={'Seconds'} />
    </div>
  )
}


const CountDownTimer = ({ targetDate }: any) => {

  const [days, hours, minutes, seconds] = useCountDown(targetDate)

  if (days + hours + minutes + seconds <= 0) {
    return (
      <ExpiredNotice />
    );
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    )
  }
}

export default CountDownTimer