<template>
  <div class="flex">
    <h5 class="font-semibold mb-3">Account Settings</h5>
    <div class="mx-auto p-5 block mt-10" style="min-width: 550px; width: 60%;">
      <ValidationObserver ref="form">
        <form @submit.prevent="submit" class="p-fluid">
          <div class="p-field mb-3">
            <ValidationProvider
              name="Email"
              rules="required"
              v-slot="{ errors }">
              <p for="idEmail" class="text-body3-grey">Email</p>
              <InputText
                id="idEmail"
                v-model="email"
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
              <p for="idPassword" class="text-body3-grey">Password</p>
              <InputText
                id="idPassword"
                v-model="password"
                type="password"
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-3">
            <ValidationProvider
              name="Ulangi Password"
              rules="required"
              v-slot="{ errors }">
              <p for="idUlangiPassword" class="text-body3-grey">Ulangi Password</p>
              <InputText
                id="idUlangiPassword"
                v-model="newPassword"
                type="password"
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
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
  companyUseCase
} from '~/domain/usecase'

export default {
  name: 'FormAccounts',
  data() {
    return {
      email: null,
      password: null,
      newPassword: null,
    }
  },
  mounted() {

  },
  methods: {
    processSubmit() {
      this.$confirm.require({
        message: 'Are you sure want to change your password? and you will be logout',
        header: 'Change Password',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.changePassword()
        },
        reject: () => {

        }
      })
    },
    async changePassword() {
      const dataSend = {
        email: this.email,
        newPassword: this.password,
        confirmPassword: this.newPassword
      }
      console.log('request codes', dataSend)
      companyUseCase.changePassword(dataSend).then((res) => {
        if (!res.error) {
          this.$toast.add({
            severity: 'success',
            detail: res.result.detail,
            group: 'bc',
            life: 1500
          })
          this.$store.dispatch('logoutAccount')
          this.$router.push({
            name: 'login'
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
