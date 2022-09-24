<template>
  <div class="flex">
    <div class="mx-auto p-5" style="min-width: 550px; width: 60%;">
      <h5 class="font-semibold mb-3">{{title}}</h5>
      <ValidationObserver ref="form">
        <form @submit.prevent="submit" class="p-fluid">
          <div class="p-field mb-3">
            <ValidationProvider
              name="Choose Supplier"
              rules="required"
              v-slot="{ errors }">
              <label for="idSupplierList" class="text-body3-grey">Choose Supplier</label>
              <vSelect :options="supplierList" label="name" v-model="selectedSupplier" :reduce="supp => supp.id" @option:selected="dataSupplier">
              </vSelect>
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Choose Service"
              rules="required"
              v-slot="{ errors }">
              <label for="idServiceList" class="text-body3-grey">Choose Service</label>
              <vSelect :options="serviceList" label="name" v-model="selectedService" :reduce="serv => serv.id">
              </vSelect>
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Secretkey"
              rules="required"
              v-slot="{ errors }">
              <label for="idName" class="text-body3-grey">Secret Key</label>
              <InputText
                id="idSecretkey"
                v-model="secretkey"
                placeholder=""
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Api Key"
              rules="required"
              v-slot="{ errors }">
              <label for="idApikey" class="text-body3-grey">Api Key</label>
              <InputText
                id="idApikey"
                v-model="apikey"
                placeholder=""
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Sender Id"
              rules="required"
              v-slot="{ errors }">
              <label for="idSenderid" class="text-body3-grey">Sender Id</label>
              <InputText
                id="idSenderid"
                v-model="senderid"
                placeholder=""
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Notes"
              rules="required"
              v-slot="{ errors }">
              <label for="idAttributes1" class="text-body3-grey">Notes</label>
              <Textarea
                id="idAttributes1"
                v-model="attributes1"
                rows="3"
                class="w-full mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Keterangan"
              rules="required"
              v-slot="{ errors }">
              <label for="idAttributes2" class="text-body3-grey">Keterangan</label>
              <Textarea
                id="idAttributes2"
                v-model="attributes2"
                rows="3"
                class="w-full mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="w-full flex justify-center">
            <Button class="rounded-lg h-12 px-6 justify-center items-center gap-2 w-full" @click="submit()">
              <p class="text-white">Simpan</p>
            </Button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import {
  serviceUseCase, supplierUseCase, agreementUseCase
} from '~/domain/usecase'

export default {
  name: 'FormAgreement',
  components: {
    vSelect
  },
  data() {
    return {
      companyId: this.$route.params.id,
      supplierId: null,
      servicesId: null,
      secretkey: this.secretkey,
      apikey: this.apikey,
      senderid: this.senderid,
      isactive: true,
      attributes1: this.attributes1,
      attributes2: this.attributes2,
      title: '',
      serviceList: [],
      dataService: [],
      supplierList: [],
      selectedService: null,
      selectedSupplier: null
    }
  },
  watch: {
    selectedService(ids) {
      console.log('response watch', this.selectedService)
    },
    selectedSupplier(ids) {
      console.log('response watch', this.selectedSupplier)
    }
  },
  mounted() {
    this.getSupplierList()
    this.getServiceList()
    this.getAgreementDetails()
  },
  methods: {
    getSupplierList() {
      // eslint-disable-next-line no-unused-expressions
      this.isLoading = true
      supplierUseCase.getAll(window.location.search).then((response) => {
        console.log('response agreement supplier', response)
        if (!response.error) {
          this.supplierList = response.result.data
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
    getServiceList() {
      // eslint-disable-next-line no-unused-expressions
      this.isLoading = true
      serviceUseCase.getAll(window.location.search).then((response) => {
        console.log('response agreement service', response)
        if (!response.error) {
          this.dataService = response.result.data
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
    getAgreementDetails() {
      agreementUseCase.getDataForm().then((res) => {
        console.log('response detail', res)
        this.title = res.title
        if (res.data != null) {
          this.description = res.data.result.description
          this.name = res.data.result.name
        } else {
          // this.$router.back()
        }
      })
    },
    ProcessSubmit() {
      const dataForm = {
        companyId: this.companyId,
        supplierId: this.selectedSupplier,
        servicesId: this.selectedService,
        secretkey: this.secretkey,
        apikey: this.apikey,
        senderid: this.senderid,
        attributes1: this.attributes1,
        attributes2: this.attributes2,
        isactive: this.isactive,
      }
      console.log('what respon service dataForm', dataForm)
      const response = agreementUseCase.submitData('', dataForm).then((res) => {
        if (!res.error) {
          this.$toast.add({
            severity: 'success',
            detail: res.result.detail,
            group: 'bc',
            life: 1500
          })
          this.$router.push({
            name: 'cms-company-details-name-id',
            params: {
              id: this.$route.params.id
            }
          })
        } else {
          this.$toast.add({
            group: 'bc',
            severity: 'error',
            // summary: 'Error Message',
            detail: res.message,
            life: 3000
          })
        }
      })
      console.log('what respon service added', response)
    },
    submit() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.ProcessSubmit()
        }
      })
    },
    dataSupplier(val) {
      this.serviceList = []
      console.log('response selected', val)
      this.dataService.forEach((service) => {
        if (service.supplierId === val.id) {
          this.serviceList.push(service)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variable.scss';

.vs__dropdown-toggle{
  background:white;
  border:1px solid #e5e5e5 !important
}
</style>
