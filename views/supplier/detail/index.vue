<template>
  <div class="grid grid-cols-3 gap-8">
    <div>
      <CardProfile :supplierDetails="supplierDetails"/>
    </div>
    <div class="col-span-2">
      <ListService :tokenSupplier="supplierDetails.id" />
    </div>
  </div>
</template>

<script>
import CardProfile from '~/views/supplier/detail/CardProfile.vue'
import ListService from '~/views/supplier/detail/ListServices.vue'

export default {
  name: 'SupplierDetail',
  components: {
    CardProfile,
    ListService
  },
  props: {
    supplierDetails: [],
  },
  mounted() {
    console.log('test', this.supplierDetails)
  }
}
</script>

<style>

</style>
