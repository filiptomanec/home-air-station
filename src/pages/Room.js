import useFetch from "../hooks/useFetch";
import LineChartComponent from "../components/LineChartComponent";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import {createChartData, findChartDataMinMax} from "../utils";
import {useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {useTranslation} from "react-i18next";

Chart.register(CategoryScale);

const Room = ({sensorId}) => {
    const { data: currentData, fetchData: reloadCurrentData, isLoading: currentDataLoading } = useFetch(process.env.REACT_APP_API_URL + "measurement/last/" + sensorId);
    const { data: chartData, fetchData: reloadChartData, isLoading: chartDataLoading } = useFetch(process.env.REACT_APP_API_URL + "measurement/today/" + sensorId);

    const {t} = useTranslation();

    const temperatureChartData = createChartData(chartData, 'temperature');
    const humidityChartData = createChartData(chartData, 'humidity');
    const co2ChartData = createChartData(chartData, 'co2');

    useEffect(() => {
        const interval = setInterval(() => {
            reloadCurrentData();
            reloadChartData();
        }, 60000);

        return () => clearInterval(interval);
    }, [reloadCurrentData, reloadChartData]);

    if (currentDataLoading || chartDataLoading) {
        return (
            <div className="loading">
                <CircularProgress/>
            </div>
        )
    }

    return (
        <div>
            <div className="dashboard">
                <div className="dashboard">
                    <h2>{t("currentValues")}:</h2>
                    <div>{t("temperature")}: {currentData?.temperature || '-'} °C</div>
                    <div>{t("humidity")}: {currentData?.humidity || '-'} %</div>
                    <div>CO2: {currentData?.co2 || '-'} ppm</div>
                </div>
            </div>
            <div className="chartContainer">
                <div className="chart">
                    <LineChartComponent
                        data={temperatureChartData}
                        min={findChartDataMinMax(temperatureChartData)?.min - 2}
                        max={findChartDataMinMax(temperatureChartData)?.max + 2}
                        label={t("temperature")}
                        color={'rgb(255, 99, 132)'}
                    />
                </div>
                <div className="chart">
                    <LineChartComponent
                        data={humidityChartData}
                        min={findChartDataMinMax(humidityChartData)?.min - 5}
                        max={findChartDataMinMax(humidityChartData)?.max + 5}
                        label={t("humidity")}
                        color={'rgb(54, 162, 235)'}
                    />
                </div>
                <div className="chart">
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