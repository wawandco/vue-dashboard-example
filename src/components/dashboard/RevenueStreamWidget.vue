<script setup>
import { Skeleton } from 'primevue';
import { computed, onMounted, ref, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useChart } from '@/views/composables/chart';

onMounted(() => fetchData());

const { title = 'Revenue Stream' } = defineProps({
    title: String
});

const loading = ref(false);
const error = ref(null);
const totalRevenue = ref(null);

const chartData = ref(null);
const chartOptions = ref(null);

const formattedTotalRevenue = computed(() => `$${totalRevenue.value.toLocaleString()}`);

const { getPrimary, isDarkTheme } = useLayout();
const { setChartOptions, setChartData, calculateTotalRevenue } = useChart();

async function fetchData() {
    try {
        loading.value = true;
        error.value = null;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        chartData.value = setChartData();
        chartOptions.value = setChartOptions();
        const datasets = chartData.value?.datasets || [];

        totalRevenue.value = calculateTotalRevenue(datasets);
    } catch (err) {
        error.value = 'Failed to load chart data.';
    } finally {
        loading.value = false;
    }
}

watch([getPrimary, isDarkTheme], () => fetchData());
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
