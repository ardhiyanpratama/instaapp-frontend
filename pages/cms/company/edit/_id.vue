<template>
  <div>
    <Breadcumb :list="[{ title: 'Company List', routeName: 'cms-company' }, { title: 'Edit Company', routeName: 'cms-company-edit-id' }]" />
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