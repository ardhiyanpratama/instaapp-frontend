<template>
  <div class="pagination">
    <Paginator :rows="rows" :totalRecords="totalRecords" :rowsPerPageOptions="[10,20,30]" @page="onPage"></Paginator>
  </div>
</template>

<script>
import Paginator from 'primevue/paginator'

export default {
  name: 'Pagination',
  components: {
    Paginator
  },
  props: {
    totalRecords: {
      required: true,
      type: Number,
      default: () => 0
    }
  },
  emits: ['changePage'],
  data() {
    return {
      rows: 10
    }
  },
  methods: {
    async onPage(prams) {
      await this.$router.replace({
        name: this.$route.name,
        query: {
          pageSize: prams.rows,
          pageNumber: prams.page + 1,
          name: this.$route.query.name
        }
      }).then(() => {
        this.$emit('changePage')
      }).catch(() => {})
      // console.log('change page', prams)
    }
  }
}
</script>

<style lang="scss">
.pagination {
  .p-paginator {
    background: none;
  }
}
</style>
