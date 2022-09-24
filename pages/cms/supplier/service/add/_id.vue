<template>
  <div>
    <Breadcumb :list="[{ title: 'Detil Supplier', routeName: 'cms-supplier-detail-name-id' }, { title: 'Tambah Service', routeName: 'cms-supplier-service-add-id' }]" />
    <FormSupplier class="mt-5" />
  </div>
</template>

<script>
import FormSupplier from '~/views/service/Form.vue'
import Breadcumb from '~/components/breadcumb/Breadcumb.vue'

export default {
  components: {
    FormSupplier,
    Breadcumb
  }
}
</script>

<style>

</style>
