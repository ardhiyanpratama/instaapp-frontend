<template>
  <div class="flex">
    <div class="mx-auto p-5 block" style="min-width: 550px; width: 60%;">
      <h5 class="font-semibold mb-3">{{title}}</h5>
      <ValidationObserver ref="form">
        <form @submit.prevent="submit" class="p-fluid">
          <div class="p-field mb-3">
            <ValidationProvider
              name="Nama Supplier"
              rules="required"
              v-slot="{ errors }">
              <p for="idSuplierName" class="text-body3-grey">Nama Supplier</p>
              <InputText
                id="idSuplierName"
                v-model="supplierName"
                placeholder=""
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-3">
            <div class="p-field">
              <ValidationProvider
                name="No Telp"
                rules="required"
                v-slot="{ errors }">
                <label for="phoneId" class="text-body3-grey">No Telp</label>
                <InputText
                id="phoneId"
                  v-model="noTelp"
                  placeholder=""
                  type="tel"
                  class="input-primary rounded-lg mt-1 w-full" />
                <span class="text-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="p-field">
              <ValidationProvider
                name="Email"
                rules="required"
                v-slot="{ errors }">
                <label for="idEmail" class="text-body3-grey">Email</label>
                <InputText
                  id="idEmail"
                  v-model="email"
                  placeholder=""
                  class="input-primary rounded-lg mt-1 w-full" />
                <span class="text-error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Contact Person"
              rules="required"
              v-slot="{ errors }">
              <label for="idContactPerson" class="text-body3-grey">Contact Person</label>
              <InputText
                id="idContactPerson"
                v-model="contactPerson"
                placeholder=""
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Alamat Lengkap"
              rules="required"
              v-slot="{ errors }">
              <label for="idAddress" class="text-body3-grey">Alamat Lengkap</label>
              <Textarea
                id="idAddress"
                v-model="address"
                rows="3"
                class="w-full mt-1 input-primary" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Keterangan"
              rules="required"
              v-slot="{ errors }">
              <label for="idDescription" class="text-body3-grey">Keterangan</label>
              <Textarea
                id="idDescription"
                v-model="description"
                rows="3"
                class="w-full mt-1 input-primary" />
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
                <p class="text-white">Simpan Perubahan</p>
              </Button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import {
  supplierUseCase
} from '~/domain/usecase'

export default {
  name: 'FormSupplier',
  data() {
    return {
      supplierName: null,
      address: null,
      description: null,
      noTelp: null,
      email: null,
      contactPerson: null,
      isActive: true,
      title: ''
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      supplierUseCase.getDataForm(this.$route.params.id).then((res) => {
        console.log('response detail', res)
        this.title = res.title
        if (!res.data.error) {
          this.supplierName = res.data.result.name
          this.address = res.data.result.address
          this.description = res.data.result.notes
          this.noTelp = res.data.result.phone
          this.email = res.data.result.email
          this.contactPerson = res.data.result.contactPerson
          this.isActive = res.data.result.isactive
        } else {
          this.$router.back()
        }
      })
    },
    processSubmit() {
      const dataSend = {
        name: this.supplierName,
        phone: this.noTelp,
        address: this.address,
        email: this.email,
        contactPerson: this.contactPerson,
        notes: this.description,
        isactive: this.isActive,
      }
      supplierUseCase.submitData(this.$route.params.id, dataSend).then((res) => {
        if (!res.error) {
          this.$toast.add({
            severity: 'success',
            detail: res.result.detail,
            group: 'bc',
            life: 1500
          })
          this.$router.push({
            name: 'cms-supplier'
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
