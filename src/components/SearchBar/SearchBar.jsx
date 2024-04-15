import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react'
import styles from "./SearchBar.module.scss"
import { Autocomplete, TextField } from "@mui/material"
import { useDispatch } from 'react-redux';
import { resetWeatherData, setWeatherData } from '../../redux/features/weather/weatherSlice';
import PositionSvg from "../Svgs/PositionSvg"


function SearchBar() {
  const [cities, setCities] = useState([]);
  const [unity, setUnity] = useState("metric")
  const [geoLocation, setGeoLocation] = useState(undefined);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false)

  const dispatch = useDispatch(); 
  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=b253f9468c8c44c6b5002e18abdf256f`)
      .then(response => response.json())
      .then(json => setCities(json.results.map((data) => {
        const {city, country, lat, lon, formatted} = data;
        return {city, country, lat, lon, formatted}
      })))
  }

  const getGeoLocation = () => {
    return navigator.geolocation.getCurrentPosition((position) => {
      setIsCurrentLocation(true)
      setGeoLocation({
        lon: position.coords.longitude,
        lat: position.coords.latitude
      })
    })
  }

  useEffect(() => {
      getGeoLocation()
  },[]);

  useEffect(() => {
    getData();
  },[geoLocation])

  const hasGeoLocation = () => {
    return navigator.geolocation;
  }

  const getData = () => {
    if (geoLocation) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${unity}&lon=${geoLocation.lon}&appid=3011cc9c46fd9d9d916b1585c9e0c42f`)
      .then(response => response.json())
      .then(json => {
        const {clouds,main,name,sys,weather,wind} = json
        dispatch(setWeatherData({clouds,main,name,sys,weather,wind}))
     }) 
    }
  }

function handleAutoCompleteSelect(e, value) {
  if (value !== null) {
    const {lat, lon} = value;
    setIsCurrentLocation(false)
    setGeoLocation({
      lat,
      lon
    })
  } else {
    dispatch(resetWeatherData())
  }
 
  }
  return (
    <>
      <Form>
        <Form.Group className={`${styles.searchContainer}`}>
          <Autocomplete className={styles.searchInput}
            clearOnBlur={false}
            onChange={handleAutoCompleteSelect}
            getOptionLabel={(option) => option.formatted}
            renderInput={(params) => <TextField onChange={handleInputChange} {...params} label={"Enter your city ..."} />}
            options={cities} />
          <Button disabled={geoLocation === undefined || isCurrentLocation === true} variant="primary"
                        onClick={() => getGeoLocation()}><PositionSvg color={'#fff'}/></Button>
        </Form.Group>
      </Form>
    </>
  )
}


export default SearchBar