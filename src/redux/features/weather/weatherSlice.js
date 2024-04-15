import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clouds: undefined,
  main: {
    feels_like: undefined,
    pressure: undefined,
    humidity: undefined
  },
  name: undefined,
  sys: {
    country: undefined
  },
  weather: {
    icon: undefined
  },
  wind: {
    speed: undefined
  },

  isLoaded: false
}

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers:{
        setWeatherData: (state, action) => {
            const {clouds,main,name,sys,weather,wind} = action.payload
            state.clouds = clouds
            state.main = main
            state.name = name
            state.sys = sys
            state.weather = weather[0]
            state.wind = wind
            state.isLoaded = true
        },

        resetWeatherData: (state) => {
          state.isLoaded = false
        }
    }
})

export const {setWeatherData, resetWeatherData} = weatherSlice.actions
export default weatherSlice.reducer