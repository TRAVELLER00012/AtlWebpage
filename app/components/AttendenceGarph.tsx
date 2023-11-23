import { useEffect, useState } from "react";
import useAuthenticator from "../hook/useAuthticator";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import attendenceService from "../services/attendenceService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'white',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: 'white',
      },
    },
    y: {
      ticks: {
        color: 'white',
      },
    },
  },
};


function AttendenceGraph() {
  const [labels,setLabels] = useState<string[]>([])
  const { email , id} = useAuthenticator();
  const [presentData,setPresentData] = useState<number[]>([])
  const [absentData,setAbsentData] = useState<number[]>([])
  useEffect(() => {
    if (id) {
      console.log(id);
      
    }
  }, [id]);


  const data = {
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
  
      },
    ],
  };



  return(
    <>
      <Line options={options} data={data} />
    </>
  )
}

export default AttendenceGraph;
