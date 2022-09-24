<template>
  <div v-if="profile != null">
    <h4 class="font-bold">Profile</h4>
    <div class="header-title mt-3">
      <div class="card-header">
        <div class="flex w-full justify-between items-center mb-2">
          <div class="flex items-start gap-4 ml-5">
            <div>
              <p class="text-white font-bold text-lg">{{profile.name}}</p>
              <p class="text-white font-medium text-base">{{profile.phone}}</p>
              <div class="flex items-center">
                <div class="flex gap-2 text-white items-center mt-4">
                  <i class="pi pi-user text-xs"></i>
                  <p class="text-white justify-start text-xs">{{profile.username}}</p>
                </div>
                <!-- <div class="flex gap-2 ml-8 text-white items-center my-2">
                  <i class="pi pi-lock text-xs"></i>
                  <p class="text-white justify-start text-xs">Test</p>
                  <i class="pi pi-eye text-xs"></i>
                </div> -->
              </div>
            </div>
          </div>
          <div class="flex">
            <button @click="generateApiKey()" class="bg-white rounded">
              <p class="font-bold px-4 py-1 text-xs text-blue-400">Generate Key</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <Card class="no-bs">
        <template #content>
          <div class="grid grid-cols-2 gap-4">
            <div class="ml-40">
              <div class="mb-5">
                <p class="font-semibold">Alamat Lengkap</p>
                <p class="color-grey text-sm mt-1">{{`${profile.address}`}}</p>
              </div>
              <div class="mb-5">
                <p class="font-semibold">Email</p>
                <p class="color-grey text-sm mt-1">{{`${profile.email}`}}</p>
              </div>
              <div class="mb-5">
                <p class="font-semibold">Jenis Usaha</p>
                <p class="color-grey text-sm mt-1">{{`${profile.jenisUsaha}`}}</p>
              </div>
              <div class="mb-5">
                <p class="font-semibold">Keterangan</p>
                <p class="color-grey text-sm mt-1" v-if="profile.notes != ''">{{`${profile.notes}`}}</p>
                <p class="color-grey text-sm mt-1" v-if="profile.notes == ''"> - </p>
              </div>
            </div>
            <div>
              <button v-if="QrCode == ''" @click="generateQrCode()" class="bg-blue-400 rounded">
                <p class="font-bold px-4 py-1 text-xl text-white">Show QrCode</p>
              </button>
              <QrcodeVue v-if="QrCode != ''" :value="QrCode" :size="size"></QrcodeVue>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <Dialog header="Information" :visible.sync="displayModal" :containerStyle="{width: '50vw'}" :modal="true">
        <p class="m-0">Please save and copy this apiKey before close the information box</p>
        <h5>{{`${apiKey}`}}</h5>
        <template #footer>
            <Button label="Close" icon="pi pi-check" @click="closeModal" autofocus />
        </template>
    </Dialog>

  </div>
</template>

<script>
import Dialog from 'primevue/dialog'
import QrcodeVue from 'qrcode.vue'
import {
  companyUseCase, authUseCase
} from '~/domain/usecase'

export default {
  name: 'ProfilePage',
  components: {
    Dialog,
    QrcodeVue
  },
  data() {
    return {
      profile: null,
      displayModal: false,
      apiKey: null,
      QrCode: '',
      size: 300
    }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    async getDetails() {
      this.isLoading = true
      companyUseCase.getDataForm(this.$store.state.appActiveUser.id).then((res) => {
        console.log('response details', res.data)
        if (res.data != null) {
          this.profile = res.data.result
          console.log('response details profile', this.profile)
        } else {
          this.$router.back()
        }
        this.isLoading = false
      })
    },
    generateApiKey() {
      authUseCase.generateKey().then((res) => {
        console.log('response generate key', res.result.apiKey)
        if (res.result != null) {
          this.apiKey = res.result.apiKey
          this.displayModal = true
        } else {
          this.$toast.add({
            severity: 'error',
            detail: res.message,
            group: 'bc',
            life: 1500
          })
        }
      })
    },
    async generateQrCode() {
      companyUseCase.generaeQrCode(this.$store.state.appActiveUser.id).then((res) => {
        this.isLoading = true
        console.log('response generate qr code', res.result.data)
        if (res.result.data != null) {
          this.QrCode = res.result.data.qrcode
          console.log('response details profile', this.QrCode)
        } else {
          // this.$router.back()
        }
        this.isLoading = false
      })
    },
    closeModal() {
      this.displayModal = false
    },
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variable.scss';

.header-title {
  .card-header {
    // background-color: yellow;
    background-image: url('~/assets/img/bg-company-blue.svg');
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    // background-size: auto;
    // background-size: 300px 100px;
    padding: 1rem;
    background-position: center center fixed;
    border-radius: $border-radius;
    background-color: rgba(104, 174, 255, 1);
    // background: linear-gradient(rgba(218,116,144) 100%,rgba(201,53,53) 100%);
  }
}
</style>