import styles from '../styles/main.module.css'
import useFetch from "../hooks/useFetch";
import LineChartComponent from "../components/LineChartComponent";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import {createChartData, findChartDataMinMax} from "../utils";
import {useEffect} from "react";

Chart.register(CategoryScale);

const Room = ({sensorId}) => {
    const [currentData, reloadCurrentData] = useFetch("http://filiptomanec.php5.cz/get-current-values.php?sensor_id=" + sensorId);
    const [chartData, reloadChartData] = useFetch("http://filiptomanec.php5.cz/get-chart-data.php?sensor_id=" + sensorId);

    const temperatureChartData = createChartData(chartData, 'temperatures');
    const humidityChartData = createChartData(chartData, 'humidities');
    const co2ChartData = createChartData(chartData, 'co2_values');

    useEffect(() => {
        const interval = setInterval(() => {
            reloadCurrentData();
            reloadChartData();
        }, 60000);

        return () => clearInterval(interval);
    }, [reloadCurrentData, reloadChartData]);

    return (
        <div>
            <div className={styles.dashboard}>
                <div className={styles.dashboard}>
                    <h2>Aktuální hodnoty:</h2>
                    <div>Teplota: {currentData?.data?.temperature || '-'} °C</div>
                    <div>Vlhkost: {currentData?.data?.humidity || '-'} %</div>
                    <div>CO2: {currentData?.data?.co2 || '-'} ppm</div>
                </div>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chart}>
                    <LineChartComponent
                        data={temperatureChartData}
                        min={findChartDataMinMax(temperatureChartData)?.min - 2}
                        max={findChartDataMinMax(temperatureChartData)?.max + 2}
                        label={'Teplota'}
                        color={'rgb(255, 99, 132)'}
                    />
                </div>
                <div className={styles.chart}>
                    <LineChartComponent
                        data={humidityChartData}
                        min={findChartDataMinMax(humidityChartData)?.min - 5}
                        max={findChartDataMinMax(humidityChartData)?.max + 5}
                        label={'Vlhkost'}
                        color={'rgb(54, 162, 235)'}
                    />
                </div>
                <div className={styles.chart}>
                    <LineChartComponent
                        data={co2ChartData}
                        min={findChartDataMinMax(co2ChartData)?.min - 100}
                        max={findChartDataMinMax(co2ChartData)?.max + 100}
                        label={'CO2'}
                        color={'rgb(75, 192, 192)'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Room;