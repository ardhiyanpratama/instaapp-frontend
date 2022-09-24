<template>
  <div>
    <HeaderTitle :details="details" />
    <div class="grid grid-cols-3 gap-8 mt-5">
      <div class="">
        <InformationCard :details="details" />
      </div>
      <div class=" col-span-2">
        <ListAgreement :details="details" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTitle from '~/views/company/detail/HeaderTitle.vue'
import InformationCard from '~/views/company/detail/InformationCard'
import ListAgreement from '~/views/company/detail/ListAgreement'

export default {
  name: 'CompanyDetail',
  components: {
    HeaderTitle,
    InformationCard,
    ListAgreement
  },
  props: {
    details: [],
  },
  mounted() {
    console.log('test', this.details)
  }
}
</script>
