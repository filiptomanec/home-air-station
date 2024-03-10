import styles from '../styles/main.module.css'
import useFetch from "../hooks/useFetch";
import {useEffect} from "react";
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from "@mui/material/CircularProgress";

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'temperature',
        headerName: 'Teplota',
        type: 'number',
        width: 120,
    },
    {
        field: 'humidity',
        headerName: 'Vlhkost',
        type: 'number',
        width: 120,
    },
    {
        field: 'co2',
        headerName: 'CO2',
        type: 'number',
        width: 120,
    },
];

const Table = () => {
    const [sensorData1, reloadSensorData1] = useFetch(process.env.REACT_APP_API_URL+ "measurement/today/" + 1);
    const [sensorData2, reloadSensorData2] = useFetch(process.env.REACT_APP_API_URL+ "measurement/today/" + 2);

    useEffect(() => {
        const interval = setInterval(() => {
            reloadSensorData1();
            reloadSensorData2();
        }, 60000);

        return () => clearInterval(interval);
    }, [reloadSensorData1, reloadSensorData2]);

    if (!sensorData1 || !sensorData2) {
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "70vh"}}>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <div className={styles.table}>
            {sensorData1 &&
                <DataGrid
                    rows={sensorData1}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[10, 50, 100]}
                />
            }
        </div>
    );
};

export default Table;