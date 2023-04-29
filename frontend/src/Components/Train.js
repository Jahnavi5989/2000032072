import React from 'react'

const Train = ({trainname,trainnumber,hours,minutes,seconds,sleeper,ac,pricesleeper,priceAc,delaytime}) => {
  return (

 <div>
    TrainName: {trainname}<br/>
   Number:{trainnumber}<br/>
   Departure time:{hours}:{minutes}{seconds}<br/>
   Seats Availabele:<br/> 
   sleeper:{sleeper}<br/>
   AC:{ac}<br/>
   Prices:<br/>
   Sleeper:{pricesleeper}<br/>
   AC:{priceAc}<br/>
   DelayTime:{delaytime}<br/>
 </div>
  

  )
}

export default Train