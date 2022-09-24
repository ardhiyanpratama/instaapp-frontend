<template>
  <div>
    <div id="chart">
      <apexchart
      v-if="showChart"
        type="pie"
        height="380"
        :options="chartOptions"
        :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartPieUsage',
  props: {
    dashboard: null,
  },
  mounted() {
    this.getProviderUsage()
  },
  data() {
    return {
      providerUsage: [],
      showChart: false,
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    }
  },
  methods: {
    async getProviderUsage() {
      this.showChart = false
      const tempData = await this.dashboard
      this.chartOptions.labels = await tempData.map((x) => x.providerUsage)
      this.series = await tempData.map((x) => x.totalUsage)
      this.showChart = true
      console.log('provideruse', this.chartOptions.xaxis.categories)
      console.log('provideruse series', this.series.data)
    }
  }
}
</script>

<style>

</style>