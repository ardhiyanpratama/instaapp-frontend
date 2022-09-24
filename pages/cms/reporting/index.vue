<template>
<div>
  <div class="flex items-center justify-center mx-auto mt-32">
    <div class="grid grid-cols-2 gap-10">
      <div class="max-w-lg rounded overflow-hidden shadow-lg transform hover:scale-110 motion-reduce:transform-none" @click="toPrint()">
        <img class="w-full" src="~/assets/img/191.jpg" alt="Sunset in the mountains">
        <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Cetak Laporan</div>
          <p class="text-gray-700 text-base">
            Mencetak pelaporan berdasarkan tanggal yang dipilih
          </p>
        </div>
      </div>
      <div class="max-w-lg rounded overflow-hidden shadow-lg transform hover:scale-110 motion-reduce:transform-none" @click="toDetil()">
        <img class="w-full" src="~/assets/img/191.jpg" alt="Sunset in the mountains">
        <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Detil Laporan</div>
          <p class="text-gray-700 text-base">
            Detil rincian laporan
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'ReportingPages',
  data() {
    return {}
  },
  methods: {
    toPrint() {
      console.log('print')
      this.$router.push({ name: 'cms-reporting-print' })
    },
    toDetil() {
      this.$router.push({ name: 'cms-reporting-detil' })
    }
  }
}

</script>
