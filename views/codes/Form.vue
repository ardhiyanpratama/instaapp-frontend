<template>
  <div class="flex">
    <div class="mx-auto p-5 block" style="min-width: 550px; width: 60%;">
      <h5 class="font-semibold mb-3">{{title}}</h5>
      <ValidationObserver ref="form">
        <form @submit.prevent="submit" class="p-fluid">
          <div class="p-field mb-3">
            <ValidationProvider
              name="Code Name"
              rules="required"
              v-slot="{ errors }">
              <p for="idCodeName" class="text-body3-grey">Code Name</p>
              <InputText
                id="idCodeName"
                v-model="name"
                placeholder=""
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
              <p for="idIsActive" class="text-body3-grey">Aktif</p>
              <InputSwitch
                    id="idIsActive"
                    class="switch-og mt-1"
                    v-model="isActive" />
          </div>
          <div class="flex justify-center w-full bg-red-300">
              <Button class="rounded-lg flex items-center w-full justify-center" type="submit">
                <p class="text-white">Save</p>
              </Button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import {
  codeUseCase
} from '~/domain/usecase'

export default {
  name: 'FormCodesService',
  data() {
    return {
      name: null,
      isActive: true,
      title: ''
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      codeUseCase.getDataForm().then((res) => {
        console.log('response detail', res)
        this.title = res.title
        if (res.data != null) {
          this.name = res.data.result.name
          this.isActive = res.data.result.isactive
        } else {
          // this.$router.back()
        }
      })
    },
    processSubmit() {
      const dataSend = {
        name: this.name,
        isactive: this.isActive,
      }
      console.log('request codes', dataSend)
      codeUseCase.submitData(null, dataSend).then((res) => {
        if (!res.error) {
          this.$toast.add({
            severity: 'success',
            detail: res.result.detail,
            group: 'bc',
            life: 1500
          })
          this.$router.push({
            name: 'cms-settings'
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
    },
    submit() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.processSubmit()
        }
      })
    }
  }
}
</script>

<style>

</style>
