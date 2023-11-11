export function findChartDataMinMax(chartData) {
    if (chartData && chartData.y && chartData.y.length > 0) {
        const maxValue = Math.max(...chartData.y);
        const minValue = Math.min(...chartData.y);
        return { max: maxValue, min: minValue };
    } else {
        return null;
    }
}

export function createChartData(chartData, yAxisKey) {
    return chartData ? {
        x: chartData.timestamps,
        y: chartData[yAxisKey]
    } : null;
}