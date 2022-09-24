<template>
  <div class="flex">
    <div class="mx-auto p-5" style="min-width: 550px; width: 60%;">
      <h5 class="font-semibold mb-3">{{title}}</h5>
      <ValidationObserver ref="form">
        <form @submit.prevent="submit" class="p-fluid">
          <div class="p-field mb-3">
            <ValidationProvider
              name="Nama Company"
              rules="required"
              v-slot="{ errors }">
              <label for="idCompanyName" class="text-body3-grey">Kode Layanan</label>
              <vSelect :options="codes" label="name" v-model="selectedCodes" :reduce="country => country.id">
              </vSelect>
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Name"
              rules="required"
              v-slot="{ errors }">
              <label for="idName" class="text-body3-grey">Nama Service</label>
              <InputText
                id="idName"
                v-model="name"
                placeholder=""
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Deskripsi"
              rules="required"
              v-slot="{ errors }">
              <label for="idDescription" class="text-body3-grey">Deskripsi</label>
              <Textarea
                id="idDescription"
                v-model="description"
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
  serviceUseCase, codeUseCase
} from '~/domain/usecase'

export default {
  name: 'FormService',
  components: {
    vSelect
  },
  data() {
    return {
      codeId: null,
      supplierId: this.$route.params.id,
      description: this.description,
      name: this.name,
      isactive: true,
      title: '',
      codes: [],
      selectedCodes: null,
    }
  },
  watch: {
    selectedCodes(ids) {
      console.log('response watch', this.selectedCodes)
    }
  },
  mounted() {
    this.getCodes()
    this.getDetail()
  },
  methods: {
    getCodes() {
      // eslint-disable-next-line no-unused-expressions
      this.isLoading = true
      codeUseCase.getAll(window.location.search).then((response) => {
        console.log('response code service', response)
        if (!response.error) {
          this.codes = response.result.data
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
    getDetail() {
      serviceUseCase.getDataForm().then((res) => {
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
        codeId: this.selectedCodes,
        supplierId: this.supplierId,
        name: this.name,
        isactive: this.isactive,
        description: this.description,
      }
      console.log('what respon service dataForm', dataForm)
      const response = serviceUseCase.submitData('', dataForm).then((res) => {
        if (!res.error) {
          this.$toast.add({
            severity: 'success',
            detail: res.result.detail,
            group: 'bc',
            life: 1500
          })
          this.$router.push({
            name: 'cms-supplier-detail-name-id',
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
    }
  }
}
</script>

<style>

</style>
