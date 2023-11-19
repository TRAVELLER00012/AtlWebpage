'use client'
import attendenceService, { AttendenceProps } from '../services/attendenceService';

import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { CanceledError } from '../services/api-client';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgb(255, 255, 255)',
      },
    },
  },
  scales:{
    y:{
      ticks:{
        color:'rgb(255,255,255)'
      }
    },
    x:{
      ticks:{
        color:'rgb(255,255,255)'
      }
    }
  }
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function AttendenceGraph(){
    const [attendenceData, setData] = useState<ChartData<'line', any, any>>({
        labels:[],
        datasets:[]
    });
    useEffect(() => {
        const {request,cancel} = attendenceService.getAttendence()
        request.then((res) => {
            let absentData : number[] = [];
            let presentData: number[] = [];
            let data: AttendenceProps[] = res.data;
            const uniqueMonths = Array.from(new Set(data.map((item) => item.month)));
          
            uniqueMonths.forEach((month) => {
              let presentCount = 0;
              let absentCount = 0;
              data.forEach((d) => {
                if (d.month === month) {
                  if (d.state === 'Present') presentCount++;
                  else absentCount++;
                }
              });
              presentData.push(presentCount);
              absentData.push(absentCount);
            });
            setData({
                labels,
                datasets: [
                  {
                    label: 'Present',
                    data: presentData,
                    borderColor: 'rgb(0, 255, 0)',
                    backgroundColor: 'rgba(0, 255, 0, 0.5)',
                  },
                  {
                    label: 'Absent',
                    data: absentData,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  }
                ],
              })
        }).catch(err => {
            if (err == CanceledError) return;
        })

        return () => cancel();          
    },[])
  

  return <Line options={options} data={attendenceData} />
  
}

export default AttendenceGraph;