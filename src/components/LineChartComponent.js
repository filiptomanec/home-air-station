import {Line} from "react-chartjs-2";

const LineChartComponent = ({data, min, max, label, color}) => {
    const fontSize = window.innerWidth < 1300 ? 22 : 14;
    return data && (
        <Line
            data={{
                labels: data.x,
                datasets: [{
                    label: label,
                    backgroundColor: color,
                    borderColor: color,
                    data: data.y,
                    pointStyle: false
                }]
            }}
            options={{
                title: {
                    display: true,
                    text: label
                },
                scales: {
                    y: {
                        min: min,
                        max: max,
                        ticks: {
                            font: {
                                size: fontSize
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: fontSize
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: fontSize
                            }
                        }
                    },
                    tooltip: {
                        titleFont: {
                            size: fontSize
                        },
                        bodyFont: {
                            size: fontSize
                        },
                        footerFont: {
                            size: fontSize
                        }
                    }
                }
            }}
        />
    );
};

export default LineChartComponent;
