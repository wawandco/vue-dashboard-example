export default {
    data() {
        return {
            chartData: null,
            chartOptions: null
        };
    },

    methods: {
        setChartData() {
            const documentStyle = getComputedStyle(document.documentElement);

            return {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Subscriptions',
                        backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                        data: [4000, 10000, 15000, 4000],
                        barThickness: 32
                    },
                    {
                        type: 'bar',
                        label: 'Advertising',
                        backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                        data: [2100, 8400, 2400, 7500],
                        barThickness: 32
                    },
                    {
                        type: 'bar',
                        label: 'Affiliate',
                        backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                        data: [4100, 5200, 3400, 7400],
                        borderRadius: {
                            topLeft: 8,
                            topRight: 8
                        },
                        borderSkipped: true,
                        barThickness: 32
                    }
                ]
            };
        },

        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const borderColor = documentStyle.getPropertyValue('--surface-border');
            const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

            return {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            color: textMutedColor
                        },
                        grid: {
                            color: 'transparent',
                            borderColor: 'transparent'
                        }
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            color: textMutedColor
                        },
                        grid: {
                            color: borderColor,
                            borderColor: 'transparent',
                            drawTicks: false
                        }
                    }
                }
            };
        },
        calculateTotalRevenue() {
            const datasets = this.chartData?.datasets || [];
            this.totalRevenue = datasets.reduce((total, dataset) => {
                return total + dataset.data.reduce((sum, value) => sum + value, 0);
            }, 0);
        }
    }
};
