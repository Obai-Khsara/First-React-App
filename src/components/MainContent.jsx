import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayer from './Prayer';
import fajr from "./../assets/images/fajr-prayer.png"
import dhhr from "./../assets/images/dhhr-prayer-mosque.png"
import asr from "./../assets/images/asr-prayer-mosque.png"
import sunset from "./../assets/images/sunset-prayer-mosque.png"
import isha from "./../assets/images/night-prayer-mosque.png"
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from "axios"
import { useState, useEffect } from 'react';
import moment from "moment"
import "moment/dist/locale/ar-ly"

moment.locale("ar")

function MainContent() {

    

    const [selectedCity, setselectedCity] = useState({
        displayName: "مكة المكرمة",
        apiName: "Makkah al Mukarramah"
    })


    const [nextPrayerIndex, setNextPrayerIndex] = useState(0)

    const availableCities = [
        {
            displayName: "مكة المكرمة",
            apiName: "Makkah al Mukarramah"
        },
        {
            displayName: "الرياض",
            apiName: "Riyadh"
        },
        {
            displayName: "الدمام",
            apiName: "Dammam"
        }
    ]


    const [remainingTime, setRemainingTime] = useState("")


    const prayerArray = [
        {key: "Fajr", displayName: "الفجر"},
        {key: "Dhuhr", displayName: "الظهر"},
        {key: "Asr", displayName: "العصر"},
        {key: "Sunset", displayName: "المغرب"},
        {key: "Isha", displayName: "العشاء"}
    ]

    const [timings, setTimings] = useState({
        Fajr: "03:45",
        Dhuhr: "12:44",
        Asr: "04:28",
        Sunset: "07:55",
        Isha: "09:27"
    })

    const [today, setToday] = useState("")

    useEffect(() => {
        const data = axios.get(`https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`)
        .then(function (response) {
            // console.log(response.data.data.timings);
            setTimings(response.data.data.timings)

            
        })
    }, [selectedCity])

    useEffect(()=>{
        let interval = setInterval(()=>{
            setupCountdownTimer()
        },1000)

        const t = moment()
        setToday(t.format("MMM Do YYYY | h:mm"))

        return()=>{
            clearInterval(interval)
        }
    },[timings])
    

    const setupCountdownTimer = () => {
        const momentNow = moment()
        let prayerIndex = 2

        if(momentNow.isAfter(moment(timings["Fajr"],"hh:mm")) && momentNow.isBefore(moment(timings["Dhuhr"],"hh:mm"))){
            prayerIndex = 1
        }else if(momentNow.isAfter(moment(timings["Dhuhr"],"hh:mm")) && momentNow.isBefore(moment(timings["Asr"],"hh:mm"))){
            prayerIndex = 2
        }else if(momentNow.isAfter(moment(timings["Asr"],"hh:mm")) && momentNow.isBefore(moment(timings["Sunset"],"hh:mm"))){
            prayerIndex = 3
        }else if(momentNow.isAfter(moment(timings["Sunset"],"hh:mm")) && momentNow.isBefore(moment(timings["Isha"],"hh:mm"))){
            prayerIndex = 4
        }else{
            prayerIndex = 0
        }
        
        setNextPrayerIndex(prayerIndex)

        const nextPrayerObject = prayerArray[prayerIndex]
        const nextPrayerTime = timings[nextPrayerObject.key]
        const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm")
        
        let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow)

        if(remainingTime < 0){
            const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow)
            const fajrToMidnightDiff = nextPrayerTimeMoment.diff(moment("00:00:00", "hh:mm:ss"))
            const totalDifference = midnightDiff + fajrToMidnightDiff
            remainingTime = totalDifference
        }
        const durationRemainingTime = moment.duration(remainingTime)

        setRemainingTime(`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`)
    }


    const handleCityChange = (event) => {
        const cityObject = availableCities.find((city) => {
            return city.apiName == event.target.value
        })
        setselectedCity(cityObject)
    };
    return (
    <>
        {/* top row */}
        <Grid container>
            <Grid className=".MuiGrid-grid-xs-12 .MuiGrid-grid-md-6" textAlign="center" marginInline="auto">
                <div>
                    <h2>{today}</h2>
                    <h1>{selectedCity.displayName}</h1>
                </div>
            </Grid>

            <Grid className=".MuiGrid-grid-xs-12 .MuiGrid-grid-md-6" textAlign="center" marginInline="auto">
                <div>
                    <h2>متبقي حتى صلاة {prayerArray[nextPrayerIndex].displayName}</h2>
                    <h1>{remainingTime}</h1>
                </div>
            </Grid>
        </Grid>
        {/* top row */}

        <Divider style={{borderColor: "white", opacity: "0.1"}}/>
        
        {/* Prayers Cards */}
        <Stack direction="row" justifyContent={"center"} alignItems={"center"} flexWrap={"wrap"}
        style={{marginTop: "50px"}}>
            <Prayer name="الفجر" time={timings.Fajr} image={fajr}/>
            <Prayer name="الظهر" time={timings.Dhuhr} image={dhhr}/>
            <Prayer name="العصر" time={timings.Asr} image={asr}/>
            <Prayer name="المغرب" time={timings.Sunset} image={sunset}/>
            <Prayer name="العشاء" time={timings.Isha} image={isha}/>
        </Stack>
        {/* Prayers Cards */}

        {/* Select City */}
        <Stack direction="row" justifyContent={"center"} style={{marginTop: "40px", marginBottom: "10px"}}>
            <FormControl style={{width: "20%"}}>
            <InputLabel id="demo-simple-select-label">
                <span style={{color: "white"}}>
                المدينة
                </span>
            </InputLabel>
            <Select
                style={{color: "white"}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={handleCityChange}
            >
                {availableCities.map((city) => {
                    return(
                        <MenuItem key={city.apiName} value={city.apiName}>{city.displayName}</MenuItem>
                    )
                })}
            </Select>
            </FormControl>
        </Stack>
        {/* Select City */}
        </>
  )
}

export default MainContent