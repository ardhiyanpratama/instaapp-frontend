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
              <label for="idCompanyName" class="text-body3-grey">Nama Company</label>
              <InputText
                id="idCompanyName"
                v-model="companyName"
                placeholder=""
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="flex gap-4 mb-3">
            <div class="p-field">
              <ValidationProvider
                name="No Telp"
                rules="required"
                v-slot="{ errors }">
                <label for="idNoTelp" class="text-body3-grey">No Telp</label>
                <InputText
                  id="idNoTelp"
                  v-model="noTelp"
                  placeholder=""
                  class="input-primary rounded-lg mt-1" />
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
                  class="input-primary rounded-lg mt-1" />
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
              name="Username"
              rules="required"
              v-slot="{ errors }">
              <label for="idUsername" class="text-body3-grey">Username</label>
              <InputText
                id="idUsername"
                v-model="username"
                placeholder=""
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Password"
              rules="required"
              v-slot="{ errors }">
              <label for="idPassword" class="text-body3-grey">Password</label>
              <InputText
                id="idPassword"
                v-model="password"
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
                class="w-full mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Jenis Usaha"
              rules="required"
              v-slot="{ errors }">
              <label for="idJenisUsaha" class="text-body3-grey">Jenis Usaha</label>
              <Textarea
                id="idJenisUsaha"
                v-model="jenisUsaha"
                rows="3"
                class="w-full mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Notes"
              rules="required"
              v-slot="{ errors }">
              <label for="idNotes" class="text-body3-grey">Keterangan</label>
              <Textarea
                id="idNotes"
                v-model="notes"
                rows="3"
                class="w-full mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="w-full flex justify-center">
            <Button class="rounded-lg h-12 px-6 justify-center items-center gap-2 w-full" type="submit">
              <p class="text-white">Simpan</p>
            </Button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import {
  companyUseCase
} from '~/domain/usecase'

export default {
  name: 'FormCompany',
  data() {
    return {
      companyName: this.companyName,
      noTelp: this.noTelp,
      email: this.email,
      username: this.username,
      password: this.password,
      address: this.address,
      jenisUsaha: this.jenisUsaha,
      notes: this.notes,
      title: '',
      contactPerson: this.contactPerson,
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      companyUseCase.getDataForm(this.$route.params.id).then((res) => {
        console.log('response detail', res)
        this.title = res.title
        if (!res.data.error) {
          this.companyName = res.data.result.name
          this.noTelp = res.data.result.phone
          this.email = res.data.result.email
          this.username = res.data.result.username
          this.password = res.data.result.password
          this.address = res.data.result.address
          this.jenisUsaha = res.data.result.jenisUsaha
          this.notes = res.data.result.notes
          this.contactPerson = res.data.result.contactPerson
        } else {
          this.$router.back()
        }
      })
    },
    ProcessSubmit() {
      const dataForm = {
        name: this.companyName,
        phone: this.noTelp,
        address: this.address,
        username: this.username,
        password: this.password,
        email: this.email,
        jenisUsaha: this.jenisUsaha,
        notes: this.notes,
        contactPerson: this.contactPerson,
        isactive: true,
      }
      const response = companyUseCase.submitData(this.$route.params.id, dataForm).then((res) => {
        if (!res.error) {
          this.$toast.add({
            severity: 'success',
            detail: res.result.detail,
            group: 'bc',
            life: 1500
          })
          this.$router.push({
            name: 'cms-company'
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
      console.log('what respon company added', response)
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
