import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Button, Stack } from '@mui/material'
import Train from './Train'

const Trains = () => {
    const[trains,setTrains]=useState()
    const sendRequest=async()=>{
        const res=await axios.get(`http://localhost:5000/train/trains`,{
            headers:{
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55TmFtZSI6IlRyYWluIENlbnRyYWwiLCJpYXQiOjE2ODI3ODAzMDEsImV4cCI6MTY4Mjc4MzkwMX0.C-cAFTNA9-bu3yZrOcW7ga-r_wg-1lCRj410fTuI79U"
            }
        }).catch((err)=>console.log(err))
        const data= await res.data;
        console.log(data)
        return data
      }
      useEffect(()=>{ 
        sendRequest().then((data)=>setTrains(data))
      },[]);
  return (
    <Stack direction="row" sx={{gap:{lg:'50px',xs:'25px'}}} flexWrap="wrap" justifyContent="center">
    {" "}
 
    {trains &&
      trains.map((train, index) => (
        <Train
         trainname={train.trainName}
          key={index}
          trainnumber={train.trainNumber}
          hours={train.departureTime.Hours}
          minutes={train.departureTime.Minutes}
          seconds={train.departureTime.seconds}
          sleeper={train.seatsAvailable.sleeper}
          ac={train.seatsAvailable.AC}
          pricesleeper={train.price.sleeper}
          priceAc={train.price.AC}
          delaytime={train.delayedBy}
        />
      ))}
   
  </Stack>
  )
}

export default Trains