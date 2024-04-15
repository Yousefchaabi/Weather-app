import React from 'react'
import styles from "./Weather.module.scss"
import {Card} from "react-bootstrap";
import PositionSvg from '../Svgs/LightRain';
import DefaultWeather from '../Svgs/DefaultWeather';
import Thermometer  from '../Svgs/Thermometer';
import Time from "../Svgs/Time";
import Wind from "../Svgs/Wind";
import Cloudy from '../Svgs/Cloudy';
import Rainy from '../Svgs/Rainy';
import Sunny from '../Svgs/Sunny';
import SunnyRainy from '../Svgs/SunnyRainy';
import Thunder from '../Svgs/Thunder';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';

function Weather() {

    const weather = useSelector(({weather}) => weather)
    console.log(weather)
    const defaultWidth = '200px';
    const defaultHight = '200px';

    const displayIcon = () => {
        const number = weather.weather.icon.substring(0, 2);
        console.log(weather.weather.icon)
        switch(number) {
            case '01': return <Rainy width={defaultWidth} height={defaultHight}/>
            case '02': 
            case '03' : return <Sunny width={defaultWidth} height={defaultHight}/>
            case '04': return <Cloudy width={defaultWidth} height={defaultHight}/>
            case '09': return <Rainy width={defaultWidth} height={defaultHight}/>
            case '10': return <SunnyRainy width={defaultWidth} height={defaultHight}/>
            case '11': return <Thunder width={defaultWidth} height={defaultHight}/>
            default: return <img src={`https://openweathermap.org/img/wn/${displayIcon}@2x.png`} alt="" />

        }
    }

  return (
    <>
    <Card className={styles.container}>
        {weather.isLoaded ? 
        <Card.Body>        
            <Card.Title className={styles.card_title}>
                {weather.name}, {weather.sys.country} <PositionSvg width='30px' height='30px'/> 

                <div className={styles.date}>

                    <div>
                        <Moment format={'llll'}/> 
                    </div>
                    <div>
                        <Time width="18px" height="18px"/>
                    </div>
                </div>

            </Card.Title>
            <Card.Text className={styles.weather_infos}>
                <div>
                    {displayIcon()}
                </div>
                <div className={styles.temperature}>
                    <span>{weather.main.feels_like} C</span>
                    <span>
                        <Thermometer/>
                    </span>
                </div>

                <div>
                    Good Morning {weather.name}
                </div>

                <div className={styles.infos}>
                    <div className={styles.border_right}>
                        <div><DefaultWeather color="white"/></div>
                        <div>Sunrise</div>
                        <Moment unix={true} format={'hh:mm'}>
                            {weather.sys.sunrise}
                        </Moment>
                    </div>
                    <div className={styles.border_right}>
                        <div><Wind/></div>
                        <div>Wind</div>
                        <div> {weather.wind.speed} KM/s</div>
                    </div>
                    
                    <div>
                        <div><Thermometer color='white' width='22px' height='22px'/></div>
                        <div>Température</div>
                        <div> {weather.main.feels_like} C</div>
                    </div>
                </div>
                
            </Card.Text>
        </Card.Body> : 
        <Card.Body>
            <Card.Title>Please choose your country.</Card.Title>
        </Card.Body>
        }
    </Card>
    </>
  )
}

export default Weather