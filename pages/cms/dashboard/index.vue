<template>
  <div>
    <dashboard-index v-if="dashboard != null" :dashboard="dashboard" />
  </div>
</template>

<script>
import DashboardIndex from '~/views/dashboard/index.vue'
import {
  reportingUseCase
} from '~/domain/usecase'

export default {
  name: 'DashboardPages',
  components: {
    DashboardIndex
  },
  data() {
    console.log('response store', this.$store)
    return {
      dashboard: null
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll() {
      this.isLoading = true
      reportingUseCase.getAll(window.location.search).then((response) => {
        console.log('response', response.result)
        if (!response.error) {
          this.dashboard = response.result
          console.log('response dashboard', this.dashboard)
        } else {
          this.$toast.add({
            group: 'bc',
            severity: 'error',
            // summary: 'Error Message',
            detail: response.message,
            life: 3000
          })
        }
        this.isLoading = false
      })
    },
  }
}
</script>

<style>

</style>
