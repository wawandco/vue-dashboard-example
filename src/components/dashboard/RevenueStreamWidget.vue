<script>
import useLayoutMixin from '@/layout/mixins/layout';
import useChartMixin from '@/views/mixins/chart';
import { Skeleton } from 'primevue';

export default {
    components: { Skeleton },
    mixins: [useLayoutMixin, useChartMixin],

    props: {
        title: {
            type: String,
            default: 'Revenue Stream'
        }
    },

    data() {
        return {
            loading: false,
            error: null,
            totalRevenue: null
        };
    },

    computed: {
        source() {
            return [this.getPrimary, this.isDarkTheme];
        },
        formattedTotalRevenue() {
            return `$${this.totalRevenue.toLocaleString()}`;
        }
    },

    methods: {
        async fetchData() {
            try {
                this.loading = true;
                this.error = null;

                await new Promise((resolve) => setTimeout(resolve, 1000));

                this.chartData = this.setChartData();
                this.chartOptions = this.setChartOptions();

                this.calculateTotalRevenue();
            } catch (err) {
                this.error = 'Failed to load chart data.';
            } finally {
                this.loading = false;
            }
        }
    },

    mounted() {
        this.fetchData();
    },

    watch: {
        source(newSource, oldSource) {
            this.fetchData();
        }
    }
};
</script>

<template>
    <div class="card">
        <div class="flex justify-between items-center mb-6">
            <div class="font-semibold text-xl">{{ title }}</div>
            <button :disabled="loading" @click.prevent="fetchData" class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                <i class="pi pi-undo !text-xl text-gray-500"></i>
            </button>
        </div>

        <template v-if="chartData && !loading">
            <Chart type="bar" :data="chartData" :options="chartOptions" class="h-80" />
            <div class="text-right mt-4 font-semibold">Total Revenue: {{ formattedTotalRevenue }}</div>
        </template>

        <div v-else-if="loading" class="text-gray-500 flex justify-between gap-2">
            <Skeleton v-for="n in 12" height="22rem" width="2rem" class="mb-2"></Skeleton>
        </div>
    </div>
</template>
