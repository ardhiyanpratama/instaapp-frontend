<template>
  <div>
    <Breadcumb :list="[{ title: 'Code Service List', routeName: 'cms-settings' }, { title: 'Add Code', routeName: 'cms-settings-codes-add' }]" />
    <FormCodesService class="mt-5" />
  </div>
</template>

<script>
import FormCodesService from '~/views/codes/Form.vue'
import Breadcumb from '~/components/breadcumb/Breadcumb.vue'

export default {
  components: {
    FormCodesService,
    Breadcumb
  }
}
</script>

<style>

</style>
