<template>
  <div>
    <div class="header-filter">
      <div class="section-left gap-3">
        <DatePicker v-model="StartDate" format="YYYY-MM-DD" type="date" placeholder="Start date" />
        <p> - </p>
        <DatePicker v-model="EndDate" format="YYYY-MM-DD" type="date" placeholder="End date" />
      </div>
      <div class="section-right">
        <Button label="Check Reporting" class="font-semibold p-button-sm btn-primary" @click="SendPdf()" />
      </div>
    </div>
    <div class="hero container max-w-screen-lg mx-auto mt-32">
      <img class="mx-auto" src="~/assets/img/ic-file-text.svg" height="350" width="387">
      <p class="items-center text-center text-lg">You can download your report based on date you choose</p>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  name: 'PrintReportingPages',
  components: {
    DatePicker
  },
  data() {
    return {
      StartDate: null,
      EndDate: null,
      companyToken: '',
      Uri: null,
      Encode64: null
    }
  },
  methods: {
    SendPdf() {
      this.companyToken = this.$store.state.appActiveUser.token
      this.Uri = `Uri=https://stgotp.monstergroup.co.id/v2/Reporting/Generate-reporting?companyToken=${this.companyToken}&from=${moment(this.StartDate).format('YYYY-MM-DD')}&to=${moment(this.EndDate).format('YYYY-MM-DD')};header:Authorization="Bearer ${this.$store.state.authenticated.accessToken}"`
      this.Encode64 = btoa(this.Uri)
      console.log('date time', moment(this.StartDate).format('YYYY-MM-DD'))
      window.location.href = `https://report.monstergroup.co.id/api/pdf?reportName=OtpLaporanPrint&JsonConnectionString=${this.Encode64}`
    }
  }
}
</script>

<style lang="scss">
  .header-filter {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    .section-left {
      display: flex;
      align-items: center;
    }

    .input-on-header.p-inputtext {
      border: none;
      border-radius: 1rem;
    }
  }

</style>
