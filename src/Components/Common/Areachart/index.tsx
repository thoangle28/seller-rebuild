import { Line } from 'react-chartjs-2'
import { registerables } from 'chart.js'
import Chart from 'chart.js/auto'
Chart.register(...registerables);

interface Props {
    data: any,
    options?: any
}

function AreaChart(props: Props) {
    const { data, options } = props
    return <Line data={data} options={options} />
}

export default AreaChart