import React from 'react'
import {Bar} from 'react-chartjs-2';
import { useEffect } from 'react';
import { useState } from 'react';

export const CountryData = () => {
    
    const [ countryData, setCountryData] = useState();

    useEffect(() => {
        async function fetchCountryData(){
            const apiResponse = await fetch('https://api.thevirustracker.com/free-api?global=stats');
            console.log(apiResponse);
            const dataFromApi = await apiResponse.json();
            console.log(dataFromApi);
            setCountryData(dataFromApi);
        }
        fetchCountryData();
    },[]);

    const data = {
        labels: ['Total','Recoverd','Active','Deaths'],
        datasets: [
          {
            label: 'World Cases',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [
                  countryData && countryData.results && countryData.results[0].total_cases,
                  countryData && countryData.results && countryData.results[0].total_recovered, 
                  countryData && countryData.results && countryData.results[0].total_active_cases+
                  countryData && countryData.results && countryData.results[0].total_serious_cases,
                  countryData && countryData.results && countryData.results[0].total_deaths, 
                ]
          }
        ]
      };

    return (
        <div>           
            <h4>Chart Showing World's COVID 19 Casses</h4>    
            <Bar
             data={data}
             width={60}
             height={430}
             options={{
              maintainAspectRatio: false
             }}
            />
        </div>
    )
}
