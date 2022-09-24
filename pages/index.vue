<template>
  <div>
    <!-- <Tutorial /> -->
    <Toast
      position="bottom-right"
      class="toast-og"
      group="br" />
    <Toast
      position="bottom-center"
      class="toast-og"
      group="bc" />
    <nuxt-child />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  middleware({
    redirect,
    route
  }) {
    if (route.name === 'index') {
      redirect({
        name: 'login'
      })
    }
    // return redirect({
    //   name: 'cms-dashboard'
    // })
  },
  mounted() {
    this.$store.dispatch('setWidth')
    this.$store.dispatch('initResize')
    this.$store.dispatch('initNetworkOn')
    this.$store.dispatch('initNetworkOff')
  },
  onmounted() {
    this.$store.dispatch('destroyResize')
  },
})
</script>
