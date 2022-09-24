<template>
  <div>
    <Breadcumb :list="[{ title: 'Company List', routeName: 'cms-company' }, { title: 'Tambah Company', routeName: 'cms-company-add' }]" />
    <FormSupplier class="mt-5" />
  </div>
</template>

<script>
import FormSupplier from '~/views/company/Form.vue'
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
