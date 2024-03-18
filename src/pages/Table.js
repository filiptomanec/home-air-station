import useFetch from "../hooks/useFetch";
import {useEffect} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MyDataGrid from "../components/MyDataGrid";
import '../styles/main.css';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'temperature',
        headerName: 'Teplota',
        type: 'number',
        width: 120,
        editable: true
    },
    {
        field: 'humidity',
        headerName: 'Vlhkost',
        type: 'number',
        width: 120,
        editable: true
    },
    {
        field: 'co2',
        headerName: 'CO2',
        type: 'number',
        width: 120,
        editable: true
    },
];

const Table = () => {
    const {
        data: sensorData1,
        fetchData: reloadSensorData1
    } = useFetch(process.env.REACT_APP_API_URL + "measurement/today/" + 1);
    const {
        data: sensorData2,
        fetchData: reloadSensorData2
    } = useFetch(process.env.REACT_APP_API_URL + "measurement/today/" + 2);

    useEffect(() => {
        const interval = setInterval(() => {
            reloadSensorData1();
            reloadSensorData2();
        }, 60000);

        return () => clearInterval(interval);
    }, [reloadSensorData1, reloadSensorData2]);

    if (!sensorData1 || !sensorData2) {
        return (<div className="loading">
            <CircularProgress/>
        </div>)
    }

    return (
        <div className="table">
            <MyDataGrid
                rows={sensorData1}
                columns={columns}
                title="Senzor: Obývák"
            />
            <MyDataGrid
                rows={sensorData2}
                columns={columns}
                title="Senzor: Ložnice"
            />
        </div>
    );
};

export default Table;