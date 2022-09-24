<template>
  <div>
    <div class="header mb-3">
      <HeaderFilter
        labelBtn="Tambah Supplier"
        title="Our Supplier"
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
        <template #nameSupplier="{ slotProps }">
          {{slotProps.data.name}}
        </template>
        <template #noTelp="{ slotProps }">
          {{slotProps.data.phone}}
        </template>
        <template #address="{ slotProps }">
          {{slotProps.data.address}}
        </template>
        <template #contactPerson="{ slotProps }">
          {{slotProps.data.contactPerson}}
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
        <!-- eslint-disable-next-line vue/valid-v-bind -->
        <ListActions
          :details="true"
          :edit="true"
          :add="true"
          :actived="true"
          titleEdit="Edit Supplier"
          titleAdd="Add Services"
          @details="showDetails"
          @edit="editData"
          @add="addServices"
          @actived="IsActived" />
      </OverlayPanel>
    </div>
  </div>
</template>

<script>
import TableCustom from '~/components/table-custom/TableCustom.vue'
import HeaderFilter from '~/components/header-filter/HeaderFilter.vue'
import {
  supplierUseCase
} from '~/domain/usecase'
import ListActions from '~/components/list-actions/ListActions.vue'
import {
  converQueryRoute
} from '~/helpers/formatted'

export default {
  name: 'SupplierPages',
  components: {
    TableCustom,
    ListActions,
    HeaderFilter
  },
  data() {
    return {
      data: [],
      dataForm: null,
      totalRecords: 0,
      isLoading: true,
      columns: [{
        title: 'Nama Supplier',
        field: 'nameSupplier'
      }, {
        title: 'No. Telp',
        field: 'noTelp'
      }, {
        title: 'Alamat',
        field: 'address'
      }, {
        title: 'Contact Person',
        field: 'contactPerson'
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
      this.isLoading = true
      supplierUseCase.getAll(window.location.search).then((response) => {
        console.log('data isactive', response.result.data)
        if (!response.error) {
          this.data = response.result.data
          this.totalRecords = response.result.count
        } else {
          this.$toast.add({
            group: 'bc',
            severity: 'error',
            // summary: 'Error Message',
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
    openOverlay(event, val) {
      this.$refs.op.toggle(event)
      this.dataForm = val
    },
    showDetails() {
      this.$router.push({
        name: 'cms-supplier-detail-name-id',
        params: {
          name: this.dataForm.name,
          id: this.dataForm.id
        }
      })
      console.log('sekian')
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
    IsActived() {
      this.$confirm.require({
        message: this.$strInd.confirm.msgChange,
        header: 'Status Aktif',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.overlayIsActive(this.dataForm)
        },
        reject: () => {
          this.dataForm.isactive = !this.dataForm.isactive
        }
      })
    },
    async overlayIsActive(val) {
      this.$store.dispatch('showLoading')
      val.isactive = !val.isactive
      const dataForm = {
        IsActive: val.isactive
      }
      const response = await supplierUseCase.changeIsActive(val.id, dataForm)
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
    async processIsActive(val) {
      this.$store.dispatch('showLoading')
      const dataForm = {
        IsActive: val.isactive
      }
      const response = await supplierUseCase.changeIsActive(val.id, dataForm)
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
        name: 'cms-supplier-add'
      })
    },
    onSearch() {
      this.getAll()
    },
    editData() {
      this.$router.push({
        name: 'cms-supplier-edit-id',
        params: {
          id: this.dataForm.id
        }
      })
    },
    addServices() {
      this.$router.push({
        name: 'cms-supplier-service-add-id',
        params: {
          id: this.dataForm.id
        }
      })
    }
  }
}
</script>
