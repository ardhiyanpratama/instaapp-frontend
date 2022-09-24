<template>
  <div>
    <Breadcumb :list="[{ title: 'Company List', routeName: 'cms-company'}, { title: this.$route.params.name, routeName: 'cms-company-details-name-id' }]" />
    <CompanyDetail v-if="details != null" :details="details" class="mt-5" />
  </div>
</template>

<script>
import Breadcumb from '~/components/breadcumb/Breadcumb.vue'
import CompanyDetail from '~/views/company/detail/index.vue'
import {
  companyUseCase
} from '~/domain/usecase'

export default {
  name: 'CompanyDetailPage',
  components: {
    Breadcumb,
    CompanyDetail
  },
  data() {
    return {
      details: null,
      title: null,
    }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    getDetails() {
      this.isLoading = true
      companyUseCase.getDataForm(this.$route.params.id).then((res) => {
        console.log('response details', res.data.result)
        if (!res.data.error) {
          this.details = res.data.result
          this.title = this.details.name
        } else {
          this.$router.back()
        }
        this.isLoading = false
      })
    },
  }
}
</script>