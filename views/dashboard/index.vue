<template>
  <div>
    <div class="grid grid-cols-3 gap-4 mb-4">
      <div v-if="this.$store.state.appActiveUser.roles === 'Admin'" class="card-services rounded-lg">
        <Card class="no-bs">
          <template #title>
            <img style="width:48px; height:48px;" src="~/assets/img/company.png" />
          </template>
          <template #content>
            <div class="flex w-full items-center justify-between mb-1">
              <div class="flex items-center">
                <p class="text-gray-400 font-bold text-xs break-words">Jumlah Company</p>
              </div>
            </div>
            <div class="flex w-full items-center justify-between">
              <div class="flex items-center">
                <p class="text-xl break-words">{{dashboard.totalCompanyActive}}</p>
              </div>
              <button class="bg-blue-300 rounded" @click="seeCompany()">
                <p class="font-bold px-4 py-1 text-xs text-blue-500">See all</p>
              </button>
              <!-- <ToggleButton color="#007AFC" value="data.isactive" @onchange="changeActive()"/> -->
            </div>
          </template>
        </Card>
      </div>
      <div v-if="this.$store.state.appActiveUser.roles === 'Admin'" class="card-services rounded-lg">
        <Card class="no-bs">
          <template #title>
            <img style="width:48px; height:48px;" src="~/assets/img/browser.png" />
          </template>
          <template #content>
            <div class="flex w-full items-center justify-between mb-1">
              <div class="flex items-center">
                <p class="text-gray-400 font-bold text-xs break-words">Jumlah Supplier Aktif</p>
              </div>
            </div>
            <div class="flex w-full items-center justify-between">
              <div class="flex items-center">
                <p class="text-xl break-words">{{dashboard.totalSupplierActive}}</p>
              </div>
              <button class="bg-blue-300 rounded" @click="seeSupplier()">
                <p class="font-bold px-4 py-1 text-xs text-blue-500">See all</p>
              </button>
              <!-- <ToggleButton color="#007AFC" value="data.isactive" @onchange="changeActive()"/> -->
            </div>
          </template>
        </Card>
      </div>

      <div v-if="this.$store.state.appActiveUser.roles === 'Company'" class="card-services rounded-lg">
        <Card class="no-bs">
          <template #title>
            <img style="width:48px; height:48px;" src="~/assets/img/phone.png" />
          </template>
          <template #content>
            <div class="flex w-full items-center justify-between mb-1">
              <div class="flex items-center">
                <p class="text-gray-400 font-bold text-xs break-words">Jumlah Request Aktif</p>
              </div>
            </div>
            <div class="flex w-full items-center justify-between">
              <div class="flex items-center">
                <p class="text-xl break-words">{{dashboard.totalAllRequest}}</p>
              </div>
              <button class="bg-blue-300 rounded" @click="seeCompany()">
                <p class="font-bold px-4 py-1 text-xs text-blue-500">See all</p>
              </button>
              <!-- <ToggleButton color="#007AFC" value="data.isactive" @onchange="changeActive()"/> -->
            </div>
          </template>
        </Card>
      </div>
      <div v-if="this.$store.state.appActiveUser.roles === 'Company'" class="card-services rounded-lg">
        <Card class="no-bs">
          <template #title>
            <img style="width:48px; height:48px;" src="~/assets/img/bag.png" />
          </template>
          <template #content>
            <div class="flex w-full items-center justify-between mb-1">
              <div class="flex items-center">
                <p class="text-gray-400 font-bold text-xs break-words">Agreement Aktif</p>
              </div>
            </div>
            <div class="flex w-full items-center justify-between">
              <div class="flex items-center">
                <p class="text-xl break-words">{{dashboard.totalAgreementActive}}</p>
              </div>
              <button class="bg-blue-300 rounded" @click="seeAgreement()">
                <p class="font-bold px-4 py-1 text-xs text-blue-500">See all</p>
              </button>
              <!-- <ToggleButton color="#007AFC" value="data.isactive" @onchange="changeActive()"/> -->
            </div>
          </template>
        </Card>
      </div>
      <div>
        <Card class="no-bs">
          <template #title>
            <img style="width:48px; height:48px;" src="~/assets/img/fail.png" />
          </template>
          <template #content>
            <div class="flex w-full items-center justify-between mb-1">
              <div class="flex items-center">
                <p v-if="dashboard.statusSimpleWa" class="text-gray-400 font-bold text-xl break-words">Connected</p>
                <p v-if="!dashboard.statusSimpleWa" class="text-gray-400 font-bold text-xl break-words">Disconnected</p>
              </div>
            </div>
          </template>
        </Card>
      </div>

    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <Card class="no-bs mb-4">
          <template #title>
            <p class="font-bold text-md">Grafik Request OTP</p>
            <div class="flex items-center mt-1">
              <p class="font-bold text-xl">{{dashboard.totalAllRequest}}&nbsp;</p>
              <p class="text-xl">Total Request</p>
            </div>
          </template>
          <template #content>
            <ChartColumnReqOtpVue v-if="dashboard.dataReportingDate != null" :dashboard="dashboard" />
          </template>
        </Card>
      </div>
      <div class="card-services rounded-lg">
        <ListLogs :failedLogs="dashboard.dataReportingFailedLog" />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <Card class="no-bs mb-4">
          <template #title>
            <p class="font-bold text-md">Grafik Request OTP</p>
            <div class="flex items-center mt-1">
              <p class="font-bold text-xl">{{dashboard.totalAllRequest}}&nbsp;</p>
              <p class="text-xl">Total Request</p>
            </div>
          </template>
          <template #content>
            <ChartColumnStatOtp v-if="dashboard.dataReportingStatus != null"
              :dashboard="dashboard.dataReportingStatus" />
          </template>
        </Card>
      </div>
      <div>
        <Card class="no-bs">
          <template #title>
            <p class="font-bold text-md">Grafik Request OTP</p>
            <div class="flex items-center mt-1">
              <p class="font-bold text-xl">{{dashboard.totalAllRequest}}&nbsp;</p>
              <p class="text-xl">Total Request</p>
            </div>
          </template>
          <template #content>
            <ChartPieUsage v-if="dashboard.dataReportingStatus != null" :dashboard="dashboard.dataReportingUsage" />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import ChartColumnReqOtpVue from '~/views/dashboard/components/ChartColumnReqOtp.vue'
import ChartColumnStatOtp from '~/views/dashboard/components/ChartColumnStatOtp.vue'
import ChartPieUsage from '~/views/dashboard/components/ChartPieUsage.vue'
import ListLogs from './components/ListLogs.vue'

export default {
  components: {
    ChartColumnReqOtpVue,
    ChartColumnStatOtp,
    ChartPieUsage,
    ListLogs
  },
  props: {
    dashboard: null,
    roles: null
  },
  methods: {
    seeSupplier() {
      this.$router.push({
        name: 'cms-supplier'
      })
    },
    seeCompany() {
      this.$router.push({
        name: 'cms-company'
      })
    },
    seeAgreement() {
      this.$router.push({
        name: 'cms-agreement'
      })
    }
  }
}

</script>

<style>

</style>
