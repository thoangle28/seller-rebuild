import { Bar } from 'react-chartjs-2'
import { registerables } from 'chart.js'
import Chart from 'chart.js/auto'
Chart.register(...registerables);

interface iBarChart {
    chartData: any
}

function BarChart({ chartData }: iBarChart) {
    return <Bar data={chartData} />;
}

export default BarChart