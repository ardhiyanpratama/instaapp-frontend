<template>
  <div class="login-pages">
    <section class="card-login rounded-lg">
      <div class="flex items-center max-w-screen-lg mx-auto justify-center mb-16 mt-4">
        <img src="~/static/logo-monster-otp.png" class="mr-2" style="width: 45px; height: 45px;"/>
        <p class="font-normal text-3xl">Monster&nbsp;</p>
        <p class="font-semibold text-3xl">OTP</p>
      </div>
      <ValidationObserver ref="form">
        <form @submit.prevent="submit" class="p-fluid">
          <div class="p-field mb-5">
            <ValidationProvider
              name="Username"
              rules="required"
              v-slot="{ errors }">
              <label for="idUsername" class="text-body2">Username</label>
              <InputText
                id="idUsername"
                v-model="username"
                placeholder="Username"
                class="input-primary rounded-lg mt-1" />
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="p-field mb-5">
            <ValidationProvider
              name="Password"
              rules="required|min:6"
              v-slot="{ errors }">
              <label for="idPassword" class="text-body2">Password</label>
              <Password
                id="idPassword"
                v-model="password"
                placeholder="Password"
                class="input-primary rounded-lg mt-1"
                toggleMask
                :feedback="false"></Password>
              <span class="text-error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="flex justify-center w-full">
              <Button
                class="rounded-lg h-12 px-6 justify-center items-center gap-2 w-full"
                :disabled="showLoading"
                type="submit">
                <p class="text-white">Masuk</p>
                <ProgressSpinner
                  style="width:25px;height:25px"
                  strokeWidth="5"
                  animationDuration=".5s"
                  v-if="showLoading" />
              </Button>
          </div>
        </form>
      </ValidationObserver>
      <div class="flex items-center max-w-screen-lg mx-auto justify-center mt-28">
        <p class="font-normal text-xs text-gray-400">Ver 1.0.0</p>
      </div>
      <div class="flex items-center max-w-screen-lg mx-auto justify-center">
        <img src="~/static/logo-mg.png" style="width: 107px; height: 37px;"/>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import {
  authUseCase
} from '~/domain/usecase'

export default {
  data() {
    return {
      username: null,
      password: null,
      showLoading: false
    }
  },
  mounted() {
    this.$store.dispatch('setWidth')
    this.$store.dispatch('initResize')
    this.$store.dispatch('initNetworkOn')
    this.$store.dispatch('initNetworkOff')
  },
  methods: {
    processSubmit() {
      this.showLoading = true
      authUseCase.loginProcess(this.username, this.password).then(async (response) => {
        console.log('after login', response.result)
        if (!response.error) {
          await this.$store.dispatch('setToken', {
            tokenType: response.result.token_type,
            accessToken: response.result.access_token
          })
          await this.$store.dispatch('setDataUser', response.result)
          await this.$store.dispatch('setDateAuth', moment().format())
          await this.$store.dispatch('setIsAuthen', true)
          window.location.href = '/cms/dashboard'
          // console.log('what state', this.$store.state)
          // this.$router.push({
          //   name: 'cms-dashboard'
          // })
        } else {
          this.$toast.add({
            group: 'bc',
            severity: 'error',
            // summary: 'Error Message',
            detail: response.message,
            life: 3000
          })
        }
        this.showLoading = false
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

<style lang="scss">
@import '~/assets/styles/scss/variable.scss';

.login-pages {
  min-height: 100vh;
  background-image: url('~/assets/img/19366.jpg');
  display: flex;
  background-size: cover;             
    background-repeat:   no-repeat;

  .card-login {
    min-width: 350px;
    width: 40%;
    padding: 40px;
    background: white;
    margin: auto;
  }
}
</style>
