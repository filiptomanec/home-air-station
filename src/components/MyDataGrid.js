import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes,} from '@mui/x-data-grid';
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

function DataGridTitle(title) {
    return (
        <Box className="tableTitle">
            <Typography variant="h6">{title}</Typography>
        </Box>
    )
}

export default function MyDataGrid(props) {
    const {t} = useTranslation();
    const [rows, setRows] = React.useState(props.rows);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id) => async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + "measurement/" + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error("Delete failed.");
            }
            setRows(rows.filter(row => row.id !== id));
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + "measurement/" + newRow.id, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    temperature: +newRow.temperature,
                    humidity: +newRow.humidity,
                    co2: +newRow.co2,
                }),
            });
            if (!response.ok) {
                throw new Error("Update failed.");
            }
            const data = await response.json();
            setRows(rows.map((row) => (row.id === newRow.id ? data : row)));
            return data;
        } catch (error) {
            console.error("Update error:", error);
            throw new Error("Update failed.");
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        ...props.columns,
        {
            field: 'actions',
            type: 'actions',
            headerName: t("actions"),
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slotProps={{
                toolbar: {setRows, setRowModesModel},
            }}
            slots={{
                toolbar: () => DataGridTitle(props.title)
            }}
            initialState={{
                pagination: {
                    paginationModel: {page: 0, pageSize: 5},
                },
            }}
            pageSizeOptions={[5, 50, 100]}
        />
    );
}