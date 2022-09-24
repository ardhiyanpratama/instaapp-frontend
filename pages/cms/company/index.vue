<template>
    <div>
        <div class="header mb-3">
            <HeaderFilter
                labelBtn="Tambah Company"
                title="Our Company"
                @onSearch="onSearch"
                @onClickBtn="addData" />
        </div>
        <div class="content">
            <TableCustom
                :columns="columns"
                :values="data"
                :isLoading="isLoading"
                :totalRecords="totalRecords"
                @changePage="onPage">
                <template #nameCompany="{ slotProps }">
                  {{slotProps.data.name}}
                </template>
                <template #noTelp="{ slotProps }">
                  {{slotProps.data.phone}}
                </template>
                <template #address="{ slotProps }">
                  {{slotProps.data.address}}
                </template>
                <template #jenisUsaha="{ slotProps }">
                  {{slotProps.data.jenisUsaha}}
                </template>
                <template #active="{ slotProps }">
                  <InputSwitch
                    class="switch-og"
                    v-model="slotProps.data.isactive"
                    @change="changeIsActive(slotProps.data)" />
                </template>
                <template #action="{ slotProps }">
                  <i class="pi pi-ellipsis-v cursor-pointer" @click="openOverlay($event, slotProps.data)" />
                </template>
            </TableCustom>
            <OverlayPanel ref="op">
                <ListActions
                :details="true"
                :edit="true"
                :add="true"
                :actived="true"
                titleEdit="Edit Company"
                titleAdd="Add Agreement"
                @details="showDetails"
                @edit="editData"
                @add="addAgreement"
                @actived="IsActived" />
            </OverlayPanel>
        </div>
    </div>
</template>

<script>
import TableCustom from '~/components/table-custom/TableCustom.vue'
import HeaderFilter from '~/components/header-filter/HeaderFilter.vue'
import {
  companyUseCase
} from '~/domain/usecase'
import ListActions from '~/components/list-actions/ListActions.vue'
import {
  converQueryRoute
} from '~/helpers/formatted'

export default {
  name: 'CompanyPages',
  components: {
    TableCustom,
    HeaderFilter,
    ListActions
  },
  data() {
    return {
      companyIds: null,
      data: [],
      totalRecords: 0,
      isLoading: true,
      columns: [{
        title: 'Nama Company',
        field: 'nameCompany',
      }, {
        title: 'No. Telp',
        field: 'noTelp'
      }, {
        title: 'Alamat',
        field: 'address'
      }, {
        title: 'Jenis Usaha',
        field: 'jenisUsaha'
      }, {
        title: 'Active',
        field: 'active'
      }, {
        title: '',
        field: 'action'
      }]
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll() {
      // eslint-disable-next-line no-unused-expressions
      this.isLoading = true
      companyUseCase.getAll(window.location.search).then((response) => {
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
    openOverlay(event, values) {
      this.companyIds = values
      this.$refs.op.toggle(event)
    },
    showDetails() {
      this.$router.push({
        name: 'cms-company-details-name-id',
        params: {
          name: this.companyIds.name,
          id: this.companyIds.id
        }
      })
      console.log(this.companyIds)
    },
    changeIsActive(val) {
      this.$confirm.require({
        message: this.$strInd.confirm.msgChange,
        header: 'Status Aktif',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.processIsActive(val)
        },
        reject: () => {
          val.isactive = !val.isactive
        }
      })
    },
    async processIsActive(val) {
      this.$store.dispatch('showLoading')
      const dataForm = {
        IsActive: val.IsActive
      }
      const response = await companyUseCase.changeIsActive(val.id, dataForm)
      if (response.error) {
        val.isactive = !val.isactive
        this.$toast.add({
          severity: 'error',
          detail: response.message,
          group: 'bc',
          life: 1500
        })
      } else {
        this.$toast.add({
          severity: 'success',
          detail: response.result.detail,
          group: 'bc',
          life: 1500
        })
      }
      this.$store.dispatch('hideLoading')
    },
    IsActived() {
      this.$confirm.require({
        message: this.$strInd.confirm.msgChange,
        header: 'Status Aktif',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.overlayIsActive(this.companyIds)
        },
        reject: () => {
          this.companyIds.isactive = !this.companyIds.isactive
        }
      })
    },
    async overlayIsActive(val) {
      this.$store.dispatch('showLoading')
      val.isactive = !val.isactive
      const dataForm = {
        IsActive: val.isactive
      }
      const response = await companyUseCase.changeIsActive(val.id, dataForm)
      if (response.error) {
        val.isactive = !val.isactive
        this.$toast.add({
          severity: 'error',
          detail: response.message,
          group: 'bc',
          life: 1500
        })
      } else {
        this.$toast.add({
          severity: 'success',
          detail: response.result.detail,
          group: 'bc',
          life: 1500
        })
      }
      this.$store.dispatch('hideLoading')
    },
    addData() {
      this.$router.push({
        name: 'cms-company-add',
      })
    },
    editData() {
      this.$router.push({
        name: 'cms-company-edit-id',
        params: {
          id: this.companyIds.id
        }
      })
    },
    onSearch() {
      this.getAll()
    },
    addAgreement() {
      this.$router.push({
        name: 'cms-agreement-add-id',
        params: {
          id: this.companyIds.id
        }
      })
    }
  }
}
</script>
