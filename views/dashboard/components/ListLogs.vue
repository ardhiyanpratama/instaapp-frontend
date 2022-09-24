<template>
  <div class="list-logs">
    <Card class="no-bs">
      <template #title>
        <HeaderFilter
          title="Failed Logs"
          :isShowButton='false'
          @onSearch="onSearch"
          />
      </template>
      <template #content>
        <TableCustom
              :columns="columns"
              :values="data"
              :isLoading="isLoading"
              :totalRecords="totalRecords"
              @changePage="onPage">
              <template #nameCompany="{ slotProps }">
                {{slotProps.data.name}}
              </template>
              <template #createDate="{ slotProps }">
                {{slotProps.data.createDate}}
              </template>
              <template #isdn="{ slotProps }">
                {{slotProps.data.isdn}}
              </template>
              <template #trxId="{ slotProps }">
                {{slotProps.data.trxId}}
              </template>
              <template #provider="{ slotProps }">
                {{slotProps.data.provider}}
              </template>
              <template #status="{ slotProps }">
                {{slotProps.data.status}}
              </template>
          </TableCustom>
      </template>
    </Card>
  </div>
</template>

<script>
import TableCustom from '~/components/table-custom/TableCustom.vue'
import HeaderFilter from '~/components/header-filter/HeaderFilter.vue'

export default {
  name: 'ListLogs',
  components: {
    TableCustom,
    HeaderFilter
  },
  props: {
    failedLogs: null
  },
  data() {
    return {
      data: [],
      totalRecords: 0,
      isLoading: true,
      columns: [{
        title: 'Nama Company',
        field: 'nameCompany',
      },
      {
        title: 'Tanggal',
        field: 'createDate',
      },
      {
        title: 'No. Telp',
        field: 'isdn',
      },
      {
        title: 'Trx ID',
        field: 'trxId',
      },
      {
        title: 'Provider',
        field: 'provider',
      },
      {
        title: 'Status',
        field: 'status',
      }]
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll() {
      this.isLoading = true
      this.data = this.failedLogs
      this.totalRecords = this.failedLogs.length
      this.isLoading = false
    },
    onPage() {
      this.getAll()
    },
    onSearch() {
      this.getAll()
    },
  }
}
</script>

<style lang="scss">
.p-inputtext{
  border: 1px solid #ccc;
}
</style>
