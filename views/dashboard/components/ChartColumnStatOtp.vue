<template>
  <div>
    <div id="chart">
      <apexchart
      v-if="showChart"
        type="bar"
        height="350"
        :options="chartOptions"
        :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartColumnStatOtp',
  props: {
    dashboard: null,
  },
  mounted() {
    this.getStatusUsage()
  },
  data() {
    return {
      statusUsage: [],
      showChart: false,
      series: [{
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: (chart, w, e) => {
              console.log(chart, w, e)
            }
          }
        },
        // colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              // colors: colors,
              fontSize: '12px'
            }
          }
        }
      },
    }
  },
  methods: {
    async getStatusUsage() {
      this.showChart = false
      const tempData = await this.dashboard
      this.chartOptions.xaxis.categories = await tempData.map((x) => x.status)
      this.series[0].data = await tempData.map((x) => x.totalStatus)
      this.showChart = true
      console.log('provideruse', this.chartOptions.xaxis.categories)
      console.log('provideruse series', this.series.data)
    }
  }
}
</script>

<style>

</style>
