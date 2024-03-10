export function findChartDataMinMax(chartData) {
    if (chartData && chartData.y && chartData.y.length > 0) {
        const maxValue = Math.max(...chartData.y);
        const minValue = Math.min(...chartData.y);
        return {max: maxValue, min: minValue};
    } else {
        return null;
    }
}

export function createChartData(measurements, key) {
    if (measurements) {
        return {
            x: measurements.map(measurement => new Date(measurement.timestamp).toLocaleTimeString()),
            y: measurements.map(measurement => measurement[key]),
        };
    }
}