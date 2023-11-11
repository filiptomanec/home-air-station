import {Line} from "react-chartjs-2";
import {useEffect, useState} from "react";

const LineChartComponent = ({data, min, max, label, color}) => {
    const [fontSize, setFontSize] = useState(22);
    const [borderWidth, setBorderWidth] = useState(2);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth < 500) {
                setFontSize(12);
                setBorderWidth(1.5);
            } else if (windowWidth < 1300) {
                setFontSize(14);
                setBorderWidth(2);
            } else {
                setFontSize(16);
                setBorderWidth(2);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return data && (
        <Line
            data={{
                labels: data.x,
                datasets: [{
                    label: label,
                    backgroundColor: color,
                    borderColor: color,
                    data: data.y,
                    pointStyle: false,
                    borderWidth: borderWidth
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
