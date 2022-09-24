<template>
  <div>
    <Breadcumb :list="[{ title: 'Supplier List', routeName: 'cms-supplier' }, { title: title, routeName: 'cms-supplier-detail-name-id' }]" />
    <SupplierDetail v-if="supplierDetails != null" :supplierDetails="supplierDetails" class="mt-5" />
  </div>
</template>

<script>
import SupplierDetail from '~/views/supplier/detail/index.vue'
import Breadcumb from '~/components/breadcumb/Breadcumb.vue'
import { supplierUseCase } from '~/domain/usecase'

export default {
  name: 'SupplierDetailPages',
  components: {
    SupplierDetail,
    Breadcumb
  },
  data() {
    return {
      supplierDetails: null,
      title: '',
    }
  },
  mounted() {
    this.getSupplierDetails()
  },
  methods: {
    getSupplierDetails() {
      this.isLoading = true
      supplierUseCase.getDataForm(this.$route.params.id).then((res) => {
        console.log('response details', res.data.result)
        if (!res.data.error) {
          this.supplierDetails = res.data.result
          this.title = res.data.result.name
        } else {
          this.$router.back()
        }
        this.isLoading = false
      })
    }
  }
}
</script>

<style>

</style>
