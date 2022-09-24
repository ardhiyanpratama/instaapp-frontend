<template>
  <header class="layout-topbar active">
    <div class="container">
      <div class="flex items-center gap-3">
        <i class="pi pi-search text-lg" />
        <input class="search-input" placeholder="Search...." />
      </div>
      <div class="flex" @click="goToProfile()">
        <Avatar button :label="initial" shape="circle" style="background-color:#2196F3;"  />
      </div>
    </div>
  </header>
</template>

<script>
import { getInitials } from '~/helpers/getInitials'

export default {
  name: 'HeaderPanel',
  data() {
    return {
      initial: null
    }
  },
  mounted() {
    this.Initial()
  },
  methods: {
    Initial() {
      this.initial = getInitials(this.$store.state.appActiveUser.name)
    },
    goToProfile() {
      this.$router.push({
        name: 'cms-profile'
      })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variable.scss';

.p-avatar-text{
  color:white
}

</style>
