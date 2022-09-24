<template>
  <div>
    <div id="chart">
      <apexchart
      v-if="showChart"
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartColumnReqOtp',
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
      series: [{
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Service statistik tiap minggu',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              // colors: colors,
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Total Request'
          },
          min: 0,
          max: 0
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
    }
  },
  methods: {
    async getProviderUsage() {
      this.showChart = false
      const tempData = await this.dashboard.dataReportingDate
      this.chartOptions.xaxis.categories = await tempData.map((x) => x.usageBydate)
      this.chartOptions.yaxis.max = await this.dashboard.totalAllRequest
      this.series[0].data = await tempData.map((x) => x.totalDate)
      this.showChart = true
      console.log('provideruse', this.chartOptions.xaxis.categories)
      console.log('provideruse series', this.series.data)
    }
  }
}
</script>

<style>

</style>
