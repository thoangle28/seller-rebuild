import { Bar } from 'react-chartjs-2'
import { registerables } from 'chart.js'
import Chart from 'chart.js/auto'
Chart.register(...registerables);

interface iBarChart {
    chartData: any,
    options?: any
}

function BarChart({ chartData, options }: iBarChart) {
    return <Bar data={chartData} options={options} />;
}

export default BarChart