<template>
  <div>
    <Breadcumb :list="[{ title: 'Supplier List', routeName: 'cms-supplier' }, { title: 'Edit Supplier', routeName: 'cms-supplier-edit-id' }]" />
    <FormSupplier class="mt-5" />
  </div>
</template>

<script>
import FormSupplier from '~/views/supplier/Form.vue'
import Breadcumb from '../../../../components/breadcumb/Breadcumb.vue'

export default {
  components: {
    FormSupplier,
    Breadcumb
  }
}
</script>

<style>

</style>
