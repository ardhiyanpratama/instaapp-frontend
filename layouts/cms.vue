<template>
  <div class="layout-wrapper">
    <Toast
      position="bottom-right"
      class="toast-og"
      group="br" />
    <Toast
      position="bottom-center"
      class="toast-og"
      group="bc" />
    <ConfirmDialog></ConfirmDialog>
    <HeaderPanel />
    <LeftPanel />
    <div class="layout-main active" ref="layoutMain">
      <div class="content">
        <Nuxt />
        <Dialog
          header="Opps, tidak ada koneksi internet"
          :dismissableMask="true"
          position="bottom"
          :modal="true"
          :visible.sync="isShowDialog">
          Kamu masih bisa menggunakan aplikasi, namun data transaksi akan disimpan dalam aplikasi.
        </Dialog>
      </div>
    </div>
    <transition
      name="load-transition"
      enter-active-class="animate__animated animate__fast animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut animate__faster">
      <div
        class="w-screen h-screen flex items-center"
        style="background: rgba(0, 0, 0, 0.2); z-index: 1049; position: fixed; top: 0"
        v-if="$store.state.showLoading">
        <ProgressSpinner class="h-16 primary-spinner" />
      </div>
    </transition>
  </div>
</template>

<script>
import HeaderPanel from '~/components/panel/HeaderPanel.vue'
import LeftPanel from '~/components/panel/LeftPanel.vue'

export default {
  middleware: ['cms-authenticated'],
  components: {
    HeaderPanel,
    LeftPanel
  },
  computed: {
    isShowDialog: {
      get() {
        return this.$store.state.network.noInternetModal
      },
      set(val) {
        if (val === false) {
          this.$store.dispatch('setNoInternet', false)
        }
      }
    }
  },
  methods: {
    hideDialog(event) {
      console.log('methods hide dialog', event)
    },
  },
  mounted() {
    this.$store.dispatch('setWidth')
    this.$store.dispatch('initResize')
    this.$store.dispatch('initNetworkOff')
    this.$store.dispatch('initNetworkOn')
  },
  onmounted() {
    this.$store.dispatch('destroyResize')
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/layout.scss';
</style>
