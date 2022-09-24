<template>
  <div class="list-logs">
    <div class="header mb-3">
        <HeaderFilter
          title="Detil Reporting"
          :isShowButton='false'
          @onSearch="onSearch"
          />
    </div>
    <div class="content">
      <TableCustom
              :columns="columns"
              :values="data"
              :isLoading="isLoading"
              :totalRecords="totalRecords"
              @changePage="onPage">
              <template #nameCompany="{ slotProps }">
                {{slotProps.data.companyName}}
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
                {{slotProps.data.providerUsage}}
              </template>
              <template #status="{ slotProps }">
                {{slotProps.data.status}}
              </template>
          </TableCustom>
    </div>
  </div>
</template>

<script>
import TableCustom from '~/components/table-custom/TableCustom.vue'
import HeaderFilter from '~/components/header-filter/HeaderFilter.vue'
import {
  reportingUseCase
} from '~/domain/usecase'

export default {
  name: 'ListLogs',
  components: {
    TableCustom,
    HeaderFilter
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
      reportingUseCase.getAllLogs(window.location.search).then((response) => {
        console.log('all logs', response)
        if (!response.error) {
          this.data = response.result.data
          this.totalRecords = response.result.count
        } else {
          this.$toast.add({
            group: 'bc',
            severity: 'error',
            detail: response.message,
            life: 3000
          })
        }
        this.isLoading = false
      })
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