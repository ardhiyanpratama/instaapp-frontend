<template>
  <div>
    <Breadcumb :list="[{ title: 'Detil Company', routeName: 'cms-company-details-name-id' }, { title: 'Agreement', routeName: 'cms-agreement-add-id' }]" />
    <FormAgreement class="mt-5" />
  </div>
</template>

<script>
import FormAgreement from '~/views/agreement/Form.vue'
import Breadcumb from '~/components/breadcumb/Breadcumb.vue'

export default {
  components: {
    FormAgreement,
    Breadcumb
  }
}
</script>

<style>

</style>
